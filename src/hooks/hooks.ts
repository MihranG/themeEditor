import {IThemeItem, IThemeItemContent} from "../Interfaces";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {stylesService} from "../utils/utils";
import {ChangeEvent, useRef, useState} from "react";

export function useStyleGenerator(content: IThemeItemContent): [string, (e: ChangeEvent<HTMLInputElement>)=>void, {css: string, inputText: string} ]{
    const themeState = useSelector((state: RootState)=>state.theme);
    const stylesObject = stylesService(content, themeState);
    const texts = stylesObject.getStringForStyles(false);
    const [inputValue, setInputValue] = useState(texts.inputText);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(()=>{
            stylesObject.getCssValuesFromString(e.target.value);
            // todo return then dispatch an action
        },300)
    }

    return [inputValue, changeInputValue, texts];
}
