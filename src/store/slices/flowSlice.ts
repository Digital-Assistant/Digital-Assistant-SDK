import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    loadFromStorage,
    saveToStorage,
} from '../../util/storage/storageHelper';

// Define the state interface for flow data
export interface FlowState {
    searchKeyword: string;
    searchResults: any[];
    page: number;
    hasMorePages: boolean;
    reFetchSearch: string;
    showSearch: boolean;
    recordSequenceDetailsVisibility: boolean;
}

// Default state
const defaultState: FlowState = {
    searchKeyword: '',
    searchResults: [],
    page: 0,
    hasMorePages: true,
    reFetchSearch: 'off',
    showSearch: true,
    recordSequenceDetailsVisibility: false,
};

// Function to load state from storage (works in service workers and web)
const loadStateFromStorage = (): FlowState => {
    return loadFromStorage('flowState', defaultState);
};

// Function to save state to storage (works in service workers and web)
const saveStateToStorage = (state: FlowState) => {
    saveToStorage('flowState', state);
};

// Initialize state from localStorage
const initialState: FlowState = loadStateFromStorage();

export const flowSlice = createSlice({
    name: 'flow',
    initialState,
    reducers: {
        setSearchKeyword: (state: FlowState, action: PayloadAction<string>) => {
            state.searchKeyword = action.payload;
            saveStateToStorage(state);
        },
        setSearchResults: (state: FlowState, action: PayloadAction<any[]>) => {
            state.searchResults = action.payload;
            saveStateToStorage(state);
        },
        appendSearchResults: (
            state: FlowState,
            action: PayloadAction<any[]>,
        ) => {
            state.searchResults = [...state.searchResults, ...action.payload];
            saveStateToStorage(state);
        },
        setPage: (state: FlowState, action: PayloadAction<number>) => {
            state.page = action.payload;
            saveStateToStorage(state);
        },
        incrementPage: (state: FlowState) => {
            state.page += 1;
            saveStateToStorage(state);
        },
        setHasMorePages: (state: FlowState, action: PayloadAction<boolean>) => {
            state.hasMorePages = action.payload;
            saveStateToStorage(state);
        },
        setReFetchSearch: (state: FlowState, action: PayloadAction<string>) => {
            state.reFetchSearch = action.payload;
            saveStateToStorage(state);
        },
        setShowSearch: (state: FlowState, action: PayloadAction<boolean>) => {
            state.showSearch = action.payload;
            saveStateToStorage(state);
        },
        setRecordSequenceDetailsVisibility: (
            state: FlowState,
            action: PayloadAction<boolean>,
        ) => {
            state.recordSequenceDetailsVisibility = action.payload;
            saveStateToStorage(state);
        },
        resetFlowState: (state: FlowState) => {
            const resetState = {
                searchKeyword: '',
                searchResults: [],
                page: 0,
                hasMorePages: true,
                reFetchSearch: 'off',
                showSearch: true,
                recordSequenceDetailsVisibility: false,
            };
            saveStateToStorage(resetState);
            return resetState;
        },
    },
});

export const {
    setSearchKeyword,
    setSearchResults,
    appendSearchResults,
    setPage,
    incrementPage,
    setHasMorePages,
    setReFetchSearch,
    setShowSearch,
    setRecordSequenceDetailsVisibility,
    resetFlowState,
} = flowSlice.actions;

export default flowSlice.reducer;
