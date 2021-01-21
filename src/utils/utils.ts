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

    const getCssValuesFromString = (str: string): {error: boolean, valuesArray: string[] | null, cssString?: string}=>{
        const areAllBracesClosed = checkBracesToBeClosed(str);
        const regexpForBraces1 = /\{ ?(.*?)\}/g;
        const regexpForMultipleSpaces = /[ ]{2,}?/g;
        const regexpForSingleLetters = /( +[a-zA-z_@^&=] +)/g

        const regexpForBraces2 = /\{\s*(.+?)\s*\}\w*/g;
        const regexpForCheckingReference =/\w+\.\w+/g
        const regexpForCheckingIsThereInvalidCharacter = /[^a-zA-z.0-9$_?/>,<;:'"()+\\`\-~ ]/g

        console.log(323,str.match(regexpForMultipleSpaces),
            str.match(regexpForSingleLetters))
        if(!areAllBracesClosed
            || regexpForSingleLetters.test(str)
            || regexpForMultipleSpaces.test(str)){
            return {error: true , valuesArray: null}
        }


        const referencedVariableValues = str.replace(regexpForBraces2, (match, key)=>{
            // const stringWithIDs = match.replace(/[{ *}]/g, "");
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
            console.log('values, re', referencesTuple, values)
            if(values){

                return  getStringForStyles(true , values).css
            }else{
                return  ERROR_STRING
            }
        } )
        // const regexpForBraces = /{.*?}/g;
        // const regexpForBraces2 = /\{\s*(.+?)\s*\}/g;
        // const insideBracesArray =
        //     str.match(regexpForBraces)?.map(x => x.replace(/[{ *}]/g, ""));
        // const insideBraces2 = str.match(regexpForBraces11);
        // const betweenText = insideBraces2?.map(s=>s.replace(/[{ \+\w \+}]/g, ""))
        // const arrayOfReferencedItems = referencedVariableValues.split(' ').filter(Boolean);


        const arrayWithoutSpaces = referencedVariableValues.split(' ').filter((el)=>(
            !!el &&  !el.includes('{') && !el.includes('}')
        ));

        console.log({
            arrayWithoutSpaces,

        })
        if(!referencedVariableValues.includes(ERROR_STRING)){

            return {error: false , valuesArray: arrayWithoutSpaces , cssString: referencedVariableValues}
        }

        return {error: true , valuesArray: null }

    };

    return{
        getStringForStyles,
        getCssValuesFromString,
    }

}

