import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { JobOpp, Label, Survey } from '../firebase/Types';

export interface hasId {
    id: string 
}
interface dataState {
    surveys: (Survey & hasId)[];
    surveyResponses: any[];
    jobOpps: (JobOpp & hasId)[];
    labels: (Label & hasId)[];
    //add more here when we know what types they are
}

const initialState = {
    surveys: [],
    surveyResponses: [],
    jobOpps: [],
    labels: [],
    //then add the defaults here
} as dataState;

/** The slice of the state that deals with navigating to parts of the application */
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSurveys(state, { payload }: PayloadAction<(Survey & hasId)[]>) {
            state.surveys = payload;
        },
        setLabels(state, { payload }: PayloadAction<(Label & hasId)[]>) {
            state.labels = payload;
        },
        setJobOpps(state, { payload }: PayloadAction<(JobOpp & hasId)[]>) {
            state.jobOpps = payload;
        },
        //add other methods here for when we know the types of jobOpps, etc
    }
})




export const { setSurveys, setLabels, setJobOpps } = dataSlice.actions
export default dataSlice.reducer