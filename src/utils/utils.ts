import { IThemeItemContent, IThemeItemValue, IThemeItemValueReference, IThemeState} from "../Interfaces";
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
        console.log('getStringForStyles', valuesArrayForFunc, valuesArrayForFunc === valuesArray)
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

    const getCssValuesFromString = (str: string): {error: boolean, values: string[] | null}=>{
        const areAllBracesClosed = checkBracesToBeClosed(str);
        if(!areAllBracesClosed){
            return {error: true , values: null}
        }
        const regexpForBraces = /{.*?}/g;
        const regexpForBraces1 = /\{ ?(.*?)\}/g;
        const regexpForBraces11 = /\{\s*(.+?)\s*\}/g;
        const regexpForBraces2 = /\{ ?(\w+?)\ ?}/g;
        const regexpForBraces3 = /\{\s?(.*?)\s?\}/g;
        const regexpForBraces4 = /(?<=\{ ?)(\w*?)(?=\} ?)/g;
        const regexpForBraces5 = /(?<=\{ *)(\w.*)(?= *\})/g;
        const regexpForBracesGettingRightStringBetweenBraces = /(?<=\{ ?)(\w+[.]\w+)(?= ?\})/g;
        // { ?.*? ?}

        const insideBracesArray =
            str.match(regexpForBraces)?.map(x => x.replace(/[{ *}]/g, ""));

        const referencedVariableValues = str.replace(regexpForBraces1, (match, key)=>{
            const stringWithIDs = match.replace(/[{ *}]/g, "");
            const [parentId, ownId] = stringWithIDs.split('.')
            const values = obj[parentId]?.items[ownId]?.content.values;
            if(values){
                console.log('vaaaa', parentId, ownId, getStringForStyles(true , values).css)
                // todo in this case dispatch
                return  getStringForStyles(true , values).css
            }else{
                return  ERROR_STRING
            }
        } )
        const insideBraces2 = str.match(regexpForBraces11);
        const betweenText = insideBraces2?.map(s=>s.replace(/[{ \+* \+}]/g, ""))
        console.log('insideBraces2', insideBraces2, referencedVariableValues, betweenText)


        const arrayWithoutSpaces = str.split(' ').filter((el)=>(
            !!el &&  !el.includes('{') && !el.includes('}')
        ));
        const arrayOfReferencedItems = referencedVariableValues.split(' ').filter(Boolean);
        // todo this one should be handled

        console.log('arrayWithoutSpaces' ,  referencedVariableValues, arrayOfReferencedItems, arrayWithoutSpaces);
        if(!referencedVariableValues.includes(ERROR_STRING)){
            console.log('ok', arrayWithoutSpaces, arrayOfReferencedItems, referencedVariableValues)
            return {error: false , values: referencedVariableValues }
        }else{
            console.log('vori', arrayWithoutSpaces)
        }
        return {error: true , values: null }

    };

    return{
        getStringForStyles,
        getCssValuesFromString,
    }

}

