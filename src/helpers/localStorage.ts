import {IThemeStateElement} from "../Interfaces";

const SIMPLE_THEME = 'simple_theme';
const setItemToLocalStorage = (name: string, value: string) => {
    localStorage.setItem(name, value);
}

const getItemFromLocalStorage = (name: string): string | null => {
    return localStorage.getItem(name);
}

const removeItemFromLocalStorage = (name: string): void =>{
    localStorage.removeItem(name)
}

export const setThemeToLocalStorage = (theme: IThemeStateElement): void => {
    const themeStringified = JSON.stringify(theme);
    setItemToLocalStorage(SIMPLE_THEME, themeStringified);
}

const removeThemeFromLocalStorage = () : void =>{
    removeItemFromLocalStorage(SIMPLE_THEME);
}

export const getThemeFromLocalStorage = () : IThemeStateElement | null => {
    const gottenJSON = getItemFromLocalStorage(SIMPLE_THEME);
    if(gottenJSON){
        return JSON.parse(gottenJSON);
    }
    return null
}

