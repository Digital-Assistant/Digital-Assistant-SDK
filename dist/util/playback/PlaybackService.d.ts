/**
 * PlaybackService orchestrates the automatic playback of recording sequences.
 * It manages the loop of finding the next item, matching it on the page,
 * and advancing the sequence based on events.
 */
export declare class PlaybackService {
    private isInitialized;
    constructor();
    /**
     * Initializes the playback service by attaching event listeners
     * and checking if playback should resume from storage.
     */
    init(): void;
    /**
     * Cleans up event listeners.
     */
    destroy(): void;
    /**
     * Orchestrates the playback of the next available item in the sequence.
     */
    private autoPlay;
    /**
     * Handles PausePlay event — writes "off" to storage to stop any pending playback.
     */
    private handlePausePlay;
    /**
     * Pauses playback and updates state.
     */
    private pause;
}
export declare const playbackService: PlaybackService;
//# sourceMappingURL=PlaybackService.d.ts.map