import {configureStore, createSlice, combineReducers, PayloadAction} from "@reduxjs/toolkit";
import {initialThemeState} from "./initialData";
import {EnumMetrics, IThemeActionPayloadMain, IThemeItemValue, IThemeState} from "../Interfaces";

export const teamReducerSlice = createSlice({
    name: 'teamReducerSlice',
    initialState: initialThemeState,
    reducers: {
        addThemeState(state: IThemeState, action: PayloadAction<{newTheme: IThemeState}>){
            const {newTheme} = action.payload;
            return {...state, ...newTheme}
        },
        resetToInitialState(state: IThemeState){
            state = initialThemeState;
            return state
        },
        editValue(state: IThemeState, action: PayloadAction<IThemeActionPayloadMain & {values: IThemeItemValue[], error?: boolean}>){
            const {id, parentId, values, error} = action.payload;
            if(typeof error !== "undefined"){
                state[parentId].items[id].content.error = error;
            }
            const newValues = values.map((v: IThemeItemValue, index: number)=>
                ({
                    ...v,
                    isMetric: state[parentId].items[id].content.values[index]?.isMetric
                }))
            state[parentId].items[id].content.values = newValues;
        },
        editMetrics(state: IThemeState, action: PayloadAction<IThemeActionPayloadMain & {metrics: EnumMetrics | null , error?:boolean}>){
            const {id, parentId, metrics, error} = action.payload;
            if(state[parentId]?.items[id]?.content){
                if(typeof error !== "undefined"){
                    state[parentId].items[id].content.error = error;
                }
                state[parentId].items[id].content.metrics = metrics;
            }
        },
        setError(state: IThemeState, action: PayloadAction<IThemeActionPayloadMain & {error: boolean }>){
            const {id, parentId, error} = action.payload;
            state[parentId].items[id].content.error = error

        }
},})

const rootReducer = combineReducers({
    theme: teamReducerSlice.reducer
})
export type RootState = ReturnType<typeof rootReducer>

export const {
    actions: {
        editMetrics,
        setError,
        editValue,
        addThemeState,
        resetToInitialState
    }
} = teamReducerSlice

const store = configureStore({reducer: rootReducer})
export default  store
