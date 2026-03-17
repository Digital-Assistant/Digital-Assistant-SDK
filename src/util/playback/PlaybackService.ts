import { CONFIG } from "../../config";
import { StorageUtil } from "../storage";
import { on, off, trigger } from "../node/events";
import { getCurrentPlayItem } from "./getCurrentPlayItem";
import { matchNode, updateRecordToStore } from "./invokeNode";
import { addNotification } from "../notification";
import { translate } from "../translate";
import { store } from "../../store";
import { setIsPlaying, setSelectedRecordingDetails } from "../../store/slices/recordingSlice";

/**
 * PlaybackService orchestrates the automatic playback of recording sequences.
 * It manages the loop of finding the next item, matching it on the page,
 * and advancing the sequence based on events.
 */
export class PlaybackService {
    private isInitialized = false;

    constructor() {
        this.autoPlay = this.autoPlay.bind(this);
        this.handlePausePlay = this.handlePausePlay.bind(this);
    }

    /**
     * Initializes the playback service by attaching event listeners
     * and checking if playback should resume from storage.
     */
    public init() {
        if (this.isInitialized) return;

        // Attach listeners for playback progression
        on("UDAPlayNext", this.autoPlay);
        on("ContinuePlay", this.autoPlay);
        on("PausePlay", this.handlePausePlay);

        // Check if we should resume playback on page load
        const playStatus = StorageUtil.getFromStore(CONFIG.RECORDING_IS_PLAYING, true);
        if (playStatus === "on") {
            console.log("PlaybackService: Resuming playback from storage state.");
            // Short delay to ensure DOM is ready and stabilization has occurred
            setTimeout(() => this.autoPlay(), 1000);
        }

        this.isInitialized = true;
    }

    /**
     * Cleans up event listeners.
     */
    public destroy() {
        off("UDAPlayNext", this.autoPlay);
        off("ContinuePlay", this.autoPlay);
        off("PausePlay", this.handlePausePlay);
        this.isInitialized = false;
    }

    /**
     * Orchestrates the playback of the next available item in the sequence.
     */
    private async autoPlay() {
        console.log("PlaybackService: autoPlay triggered.");
        const playStatus = StorageUtil.getFromStore(CONFIG.RECORDING_IS_PLAYING, true);
        if (playStatus !== "on") {
            return;
        }

        const state: any = store.getState();
        const editingWorkflow = state.editableStepForm?.editingWorkflow;
        let playItem: any = getCurrentPlayItem();
        const selectedRecording: any = StorageUtil.getFromStore(CONFIG.SELECTED_RECORDING, false);

        // Draft changes logic: If we are editing a step, use the draft changes for matching
        if (editingWorkflow?.isEditing && editingWorkflow?.draftChanges) {
            const currentIndex = state.editableStepForm.currentEditingIndex;
            if (playItem.index === currentIndex) {
                playItem = {
                    ...playItem,
                    node: {
                        ...playItem.node,
                        ...JSON.parse(JSON.stringify(playItem.node)), // Ensure we don't mutate original
                        ...editingWorkflow.draftChanges
                    }
                };
            }
        }

        if (playItem && playItem.node) {
            console.log(`PlaybackService: Playing item at index ${playItem.index}`);

            // Attempt to match and invoke the node
            const matched = await matchNode(playItem);

            if (matched) {
                // Update status in storage and state
                await updateRecordToStore(playItem.index);

                // Update UI state via Redux if necessary
                if (selectedRecording) {
                    selectedRecording.userclicknodesSet[playItem.index].status = "completed";
                    store.dispatch(setSelectedRecordingDetails(selectedRecording));
                }
            } else {
                console.error("PlaybackService: Playback error - node not found.");
                this.pause(selectedRecording?.id);
                trigger("openPanel", { action: 'openPanel' });
            }
        } else {
            // Sequence completed
            console.log("PlaybackService: Playback completed.");
            this.pause(selectedRecording?.id);

            const currentWorkflow = state.editableStepForm?.editingWorkflow;

            if (currentWorkflow?.isEditing && currentWorkflow?.validationRequired) {
                // Import markGlobalValidationCompleted dynamically to avoid circular dependency if any
                import('../../store/slices/validationSlice').then(({ markGlobalValidationCompleted }) => {
                    store.dispatch(markGlobalValidationCompleted());
                });
                // Also mark validation as completed in the step form slice to enable Save button
                import('../../store/slices/editableStepFormSlice').then(({ markValidationCompleted }) => {
                    store.dispatch(markValidationCompleted());
                });
            }

            addNotification(
                translate('autoplayCompletedTitle'),
                translate('autoplayCompleted'),
                'success'
            );

            // Notify UI to show completion state
            if (selectedRecording) {
                console.log("PlaybackService: Pushing final completed state to Redux");
                // Fetch the absolute latest from storage to ensure all statuses are captured
                const finalRecording = StorageUtil.getFromStore(CONFIG.SELECTED_RECORDING, false);
                if (finalRecording) {
                    store.dispatch(setSelectedRecordingDetails(finalRecording));
                }
            }
            trigger("UDAPlaybackCompleted", { recordingId: selectedRecording?.id });
            trigger("openPanel", { action: 'openPanel' });
        }
    }

    /**
     * Handles PausePlay event — writes "off" to storage to stop any pending playback.
     */
    private handlePausePlay() {
        StorageUtil.setToStore("off", CONFIG.RECORDING_IS_PLAYING, true);
        store.dispatch(setIsPlaying("off"));
    }

    /**
     * Pauses playback and updates state.
     */
    private pause(recordingId?: string) {
        StorageUtil.setToStore("off", CONFIG.RECORDING_IS_PLAYING, true);
        store.dispatch(setIsPlaying("off"));
        trigger("PausePlay", { recordingId });
    }
}

// Export a singleton instance
export const playbackService = new PlaybackService();
