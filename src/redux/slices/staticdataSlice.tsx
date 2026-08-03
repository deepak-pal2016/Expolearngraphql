/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  priorityOptions: [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ],
  taskCategories: [
    { label: 'Work', value: 'work' },
    { label: 'Personal', value: 'personal' },
    { label: 'Gym', value: 'gym' },
    { label: 'Study', value: 'study' },
  ],
  taskstatus:[
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in-progress' },
  ]
};

const staticDataSlice = createSlice({
    name:'staticdata',
    initialState,
    reducers:{
        setPriorityOptions:(state,action) => {
            state.priorityOptions = action.payload
        },
        setTaskCategories:(state,action) => {
            state.taskCategories = action.payload
        },
        setTaskStatus:(state,action) => {
            state.taskstatus = action.payload
        }
    }
})

export const {setPriorityOptions,setTaskCategories,setTaskStatus} = staticDataSlice.actions
export const StaticDataReducers = staticDataSlice.reducer