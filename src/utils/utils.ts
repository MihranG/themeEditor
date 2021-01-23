import {
    EnumMetrics,
    ICssValidation,
    IThemeItemContent,
    IThemeItemValue,
    IThemeItemValueReference,
    IThemeState
} from "../Interfaces";
import {checkBracesToBeClosed} from "./stringUtils";
const ERROR_STRING = '#ERROR#';

export const stylesService = (content: IThemeItemContent, obj: IThemeState) =>{
    const { values: valuesArray , metrics: rootMetrics} = content;
    const getValuesFromReferences = (referenceData: IThemeItemValueReference, isInitiallyMetric: boolean)=>{
        const {referenceParentId: parentId, referenceChildrenId: childrenId} = referenceData;
        const thisValue = obj[parentId].items[childrenId];
        const { values } = thisValue.content;
        return values.reduce((acc: string, el: IThemeItemValue) => {
            const {reference, isMetric} = el;
            let concatable = '';
            const metricPostfix = isInitiallyMetric ? rootMetrics + ' ' : '';
            if (reference) {
                const referencedStyles = getValuesFromReferences(reference, isInitiallyMetric );
                concatable = acc.concat(` ${referencedStyles}`);
            } else {
                concatable = acc.concat(` ${el.value}`);
            }

            if(!metricPostfix){
                concatable += ' ';
            }
            acc = concatable + metricPostfix;
            return acc
        }, '');
    };

    const getStringForStyles = (isNotMetric: boolean, valuesArrayForFunc: IThemeItemValue[] = valuesArray)=>{
        const { cssArray, inputArray} = valuesArrayForFunc.reduce(
            (
                acc: {cssArray: Array<string | null>, inputArray: string[]},
                singleValue: IThemeItemValue,
                index: number
            ) => {
            const { reference , isMetric: isInitiallyMetric} = singleValue;
            const metricPostFix = !isNotMetric && singleValue.isMetric ? rootMetrics : '';
            if(!reference){
                const pushable = singleValue.value + metricPostFix;
                acc.cssArray.push(pushable);
                acc.inputArray.push(pushable);
            }else{
                const {referenceChildrenId, referenceParentId} = reference;
                acc.cssArray.push( getValuesFromReferences(reference, isInitiallyMetric));
                acc.inputArray.push(` { ${referenceParentId}.${referenceChildrenId} }${metricPostFix} `);
            }
            return acc
        }, {
            cssArray: [],
            inputArray: []
        });

        return {css: cssArray.join(' '), inputText: inputArray.join('') }
    };


    const getMetricUnitsAndReplace = (str: string, unit: EnumMetrics) : string =>{
        // const regexpForMetricUnits = /(em |px |rem )/g;
        const regexpForMetricUnits = /(em|px|rem)/g;
        return str.replace(regexpForMetricUnits, unit);
    }

    const getFirstMetricUnit = (str: string) : EnumMetrics | null => {
        const regexpForMetricUnits = /(em|px|rem)/g;
        const match = str.match(regexpForMetricUnits);
        if(match){
            return match[0] as EnumMetrics
        }
        return null
    }

    const getCssValuesFromString = (str: string): ICssValidation=>{
        const areAllBracesClosed = checkBracesToBeClosed(str);
        const regexpForBraces1 = /\{ ?(.*?)\}/g;
        const regexpForMultipleSpaces = /[ ]{2,}?/g;
        const regexpForSingleLetters = /( +[a-zA-z_@^&=] +)/g
        const regexpForIsThereBraces = /({})/g

        const regexpForBraces2 = /\{\s*(.+?)\s*\}\w*/g;
        const regexpForCheckingReference =/\w+\.\w+/g
        const regexpForCheckingIsThereInvalidCharacter = /[^a-zA-z.0-9$_?/>,<;:'"()+\\`\-~ ]/g
        const regexpForSpaceBeforeMetricUnits = /(( |\D)(px|%|([r?]em)))/g;
        const match = str.match(regexpForSpaceBeforeMetricUnits)

        if(!areAllBracesClosed
            || regexpForSingleLetters.test(str)
            || regexpForMultipleSpaces.test(str)
            || regexpForSpaceBeforeMetricUnits.test(str)
        ){
            return {error: true , valuesArray: null}
        }else if(!regexpForBraces1.test(str)){
            const arrayOfValues = str.split(' ')
            return { error: false, valuesArray : arrayOfValues, cssString: str}
        }

        const referencedVariableValues = str.replace(regexpForBraces2, (match, key)=>{
            const stringWithIDs = match.replace(/({ ?)|( ?}\w*)/g, "");
            if(regexpForCheckingIsThereInvalidCharacter.test(stringWithIDs)){
                return ERROR_STRING
            }
            const referencesTuple = stringWithIDs.split('.');
            if(referencesTuple.length !== 2 ){
                return ERROR_STRING
            }
            const [parentId, ownId] = referencesTuple;
            const values = obj[parentId]?.items[ownId]?.content.values;
            if(values){
                console.log('getStringForStyles(true , values)', getStringForStyles(false , values))
                return getStringForStyles(false , values).css
            }else{
                return  ERROR_STRING
            }
        })
        // const regexpForBraces = /{.*?}/g;
        // const regexpForBraces2 = /\{\s*(.+?)\s*\}/g;
        // const insideBracesArray =
        //     str.match(regexpForBraces)?.map(x => x.replace(/[{ *}]/g, ""));
        // const insideBraces2 = str.match(regexpForBraces11);
        // const betweenText = insideBraces2?.map(s=>s.replace(/[{ \+\w \+}]/g, ""))
        // const arrayOfReferencedItems = referencedVariableValues.split(' ').filter(Boolean);
        if(referencedVariableValues.length){
            const arrayWithoutSpaces = referencedVariableValues.split(' ').filter((el)=>(
                !!el &&  !el.includes('{') && !el.includes('}')
            ));
            if(!referencedVariableValues.includes(ERROR_STRING)){
                return {error: false , valuesArray: arrayWithoutSpaces , cssString: referencedVariableValues}
            }
        }else{
            const arrayOfValues = str.split(' ')
            return { error: false, valuesArray : arrayOfValues, cssString: str}
        }
        return {error: true , valuesArray: null }
    };
    return{
        getStringForStyles,
        getCssValuesFromString,
        getMetricUnitsAndReplace,
        getFirstMetricUnit
    }
}

//
// const extractMetricsAndPrepareForStateUpdate = (values: string[]): IThemeItemValue[] => {
//     return values.reduce(()=>{}, [])
// }
