import {EnumMetrics, ICssValidation, IThemeItem, IThemeItemContent} from "../Interfaces";
import {useDispatch, useSelector} from "react-redux";
import {editMetrics, RootState} from "../store/store";
import {stylesService} from "../utils/utils";
import {ChangeEvent, useRef, useState} from "react";

export function useStyleGenerator(content: IThemeItemContent, ids:  {id: string, parentId: string}): [string, (e: ChangeEvent<HTMLInputElement>)=>void, {css: string, inputText: string} ]{
    const themeState = useSelector((state: RootState)=>state.theme);
    const stylesObject = stylesService(content, themeState);
    const texts = stylesObject.getStringForStyles(false);
    const [inputValue, setInputValue] = useState(texts.inputText);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const dispatch = useDispatch();

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(()=>{
            const parsedCssString: ICssValidation = stylesObject.getCssValuesFromString(e.target.value);
            // todo return then dispatch an action
            const metricUnit: EnumMetrics | null = stylesObject.getFirstMetricUnit(e.target.value);
            if(metricUnit){
                const metrics = metricUnit as EnumMetrics;// avoids ts error
                dispatch( editMetrics({id: ids.id, parentId:  ids.parentId, metrics }) );
                console.log('styleProperty.content.metrics', content.metrics, metricUnit, metrics)

            }
            if(!parsedCssString.error){
                //todo call extractMetricsAndPrepareForStateUpdate and dispatch
            }else{
                //todo dispatch an error
            }
            console.log('parsedCssString', parsedCssString, metricUnit)
        },300)
    }

    return [inputValue, changeInputValue, texts];
}
