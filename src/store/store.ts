import {configureStore, createSlice, combineReducers, PayloadAction} from "@reduxjs/toolkit";
import {initialThemeState} from "./initialData";
import {EnumMetrics, IThemeItemValue, IThemeState} from "../Interfaces";

const teamReducerSlice = createSlice({
    name: 'teamReducerSlice',
    initialState: initialThemeState,
    reducers: {
        addThemeState(state: IThemeState, action: PayloadAction<{newTheme: IThemeState}>){
            const {newTheme} = action.payload;
            state = newTheme
        },
        editValue(state: IThemeState, action: PayloadAction<{id: string, parentId: keyof IThemeState, values: IThemeItemValue[]}>){
            const {id, parentId, values} = action.payload;
            state[parentId].items[id].content.values = values;
        },
        editMetrics(state: IThemeState, action: PayloadAction<{id: string, parentId: string, metrics: EnumMetrics | null }>){
            const {id, parentId, metrics} = action.payload;
            console.log('editMetrics', action.payload)
            state[parentId].items[id].content.metrics = metrics
        }
    },})

const rootReducer = combineReducers({
    theme: teamReducerSlice.reducer
})
export type RootState = ReturnType<typeof rootReducer>

export const {
    actions: {
        editMetrics,
    }
} = teamReducerSlice

const store = configureStore({reducer: rootReducer})
export default  store
