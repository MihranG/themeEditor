import {EnumMetrics, IThemeItemContent, IThemeItemValue, IThemeItemValueReference, IThemeState} from "./Interfaces";

export const initialThemeState : IThemeState= {
    colors: {
        id: 'colors',
        name: 'General colors',
        items: {
            primary : {
                id: 'primary',
                name: 'Primary font color',
                parentId: 'colors',
                content: {
                    metrics: null,
                    values: [{
                        reference: null,
                        isMetric: false,
                        value: '#000000'
                    }]
                }
            },
            primaryBackground:{
                id: 'primaryBackground',
                name: 'Primary background color',
                parentId: 'colors',
                content: {
                    metrics: null,
                    values: [{
                        reference: null,
                        isMetric: false,
                        value: '#ffffff'
                    }]
                }
            },
            secondary: {
                id: 'secondary',
                name: 'Secondary font color',
                parentId: 'colors',
                content: {
                    metrics: null,
                    values: [{
                        reference: null,
                        isMetric: false,
                        value: '#ffffff'
                    }]
                }
            },
            secondaryBackground: {
                id: 'secondaryBackground',
                name: 'Secondary background color',
                parentId: 'colors',
                content: {
                    metrics: null,
                    values: [{
                        reference: null,
                        isMetric: false,
                        value: '#4a86e8'
                    }]
                }
            },
            highlight1:{
                id: 'highlight1',
                name: 'Highlight on primary background',
                parentId: 'colors',
                content: {
                    metrics: null,
                    values: [{
                        reference: null,
                        isMetric: false,
                        value: '#4a86e8'
                    }]
                }
            },
            highlight2:{
                id: 'highlight2',
                name: 'Highlight on secondary background',
                parentId: 'colors',
                content: {
                    metrics: null,
                    values: [{
                        reference: null,
                        isMetric: false,
                        value: '#ffab40'
                    }]
                }
            }
        }
    },
    sizes: {
        id: 'sizes',
        name: 'Global sizes',
        items: {
            text:{
                id: 'text',
                name: 'Default text size',
                parentId: 'sizes',
                content: {
                    metrics: EnumMetrics.EM,
                    values: [{
                        reference: null,
                        isMetric: true,
                        value: '1.1'
                    }]
                }
            },
            h1: {
                id: 'h1',
                name: 'Header1 text size',
                parentId: 'sizes',
                content: {
                    metrics: EnumMetrics.EM,
                    values: [{
                        reference: null,
                        isMetric: true,
                        value: '1.4'
                    }]
                }
            },
            h2: {
                id: 'h2',
                name: 'Header2 text size',
                parentId: 'sizes',
                content: {
                    metrics: EnumMetrics.EM,
                    values: [{
                        reference: null,
                        isMetric: true,
                        value: '1.2'
                    }]
                }
            },
            borderWidth: {
                id: 'borderWidth',
                name: 'Default border width',
                parentId: 'sizes',
                content: {
                    metrics: EnumMetrics.PX,
                    values: [{
                        reference: null,
                        isMetric: true,
                        value: '1'
                    }]
                }
            }
        }
    },
    textField: {
        id: 'textField',
        name: 'Text field',
        items: {
            text: {
                id: 'text',
                name: 'Default text size',
                parentId: 'textField',
                content: {
                    metrics: EnumMetrics.EM,
                    values: [{
                        reference : null,
                        isMetric: true,
                        value: '1.1'
                    }]
                }
            },
            color: {
                id: 'color',
                name: 'Font color',
                parentId: 'textField',
                content: {
                    metrics: null,
                    values: [{
                        reference: null,
                        isMetric: false,
                        value: '#000000'
                    }]
                }
            },
            border: {
                id: 'border',
                name: 'Border',
                parentId: 'textField',
                content: {
                    metrics: EnumMetrics.PX,
                    values: [
                        {
                            reference: {
                                referenceParentId: 'sizes',
                                referenceChildrenId: 'borderWidth'
                            },
                            isMetric: true,
                            value: '1'
                        },
                        {
                            reference: null,
                            isMetric: false,
                            value: 'solid'
                        },
                        {
                            reference: {
                                referenceParentId: 'colors',
                                referenceChildrenId: 'primary',
                            },
                            isMetric: false,
                            value: '#000000'
                        },
                    ]
                }
            },
            background: {
                id: 'background',
                name: 'Background',
                parentId: 'textField',
                content: {
                    metrics: null,
                    values: [{
                        reference: {
                            referenceParentId: 'colors',
                            referenceChildrenId: 'primaryBackground',
                        },
                        isMetric: false,
                        value: '#000000'
                    }]
                }
            },
        }
    },
    buttons: {
        id: 'buttons',
        name: 'Buttons',
        items: {
            fontSize: {
                id: 'fontSize',
                name: 'Font size',
                parentId: 'buttons',
                content: {
                    metrics: EnumMetrics.REM,
                    values: [
                        {
                            reference : null,
                            isMetric: false,
                            value: 'calc('
                        },
                        {
                            reference : {
                                referenceParentId: 'sizes',
                                referenceChildrenId: 'text'
                            },
                            isMetric: true,
                            value: ''
                        },
                        {
                            reference : null,
                            isMetric: false,
                            value: '*'
                        },
                        {
                            reference : {
                                referenceParentId: 'sizes',
                                referenceChildrenId: 'h2'
                            },
                            isMetric: false,
                            value: ''
                        },
                        {
                            reference : null,
                            isMetric: false,
                            value: ')'
                        }
                    ]
                }
            },
            color: {
                id: 'color',
                name: 'Font color',
                parentId: 'buttons',
                content: {
                    metrics: null,
                    values: [
                        {
                            reference : {
                                referenceParentId: 'colors',
                                referenceChildrenId: 'primary'
                            },
                            isMetric: false,
                            value: ''
                        },
                    ]
                }
            },
            background: {
                id: 'background',
                name: 'Background',
                parentId: 'buttons',
                content: {
                    metrics: null,
                    values: [
                        {
                            reference : {
                                referenceParentId: 'colors',
                                referenceChildrenId: 'highlight1'
                            },
                            isMetric: false,
                            value: ''
                        },
                    ]
                }
            },
        }
    }
}


// (referenceData: IThemeItemValueReference  ,
//     obj: IThemeState,
//     rootMetrics: EnumMetrics | null,
//     isInitiallyMetric: boolean)

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

    const getStringForStyles = ()=>{
        const { cssArray, inputArray} = valuesArray.reduce(
            (
                acc: {cssArray: Array<string | null>, inputArray: string[]},
                singleValue: IThemeItemValue,
                index: number
            ) => {
            const { reference , isMetric: isInitiallyMetric} = singleValue;
            const metricPostFix = singleValue.isMetric ? rootMetrics : '';
            if(!reference){
                const pushable = singleValue.value + metricPostFix;
                acc.cssArray.push(pushable);
                acc.inputArray.push(pushable);
            }else{
                const {referenceChildrenId, referenceParentId} = reference;
                acc.cssArray.push( getValuesFromReferences(reference, isInitiallyMetric));
                acc.inputArray.push(` { ${referenceChildrenId}.${referenceParentId} }${metricPostFix} `);
            }
            return acc
        }, {
            cssArray: [],
            inputArray: []
        });


        return {css: cssArray.join(' '), inputText: inputArray.join('') }
    }

    return{
        getStringForStyles,
    }

}

const gettingValueWithReference =
    (referenceData: IThemeItemValueReference ,
     obj: IThemeState,
     rootMetrics: EnumMetrics | null,
     isInitiallyMetric: boolean,
     name: string = '')=>{
        const {referenceParentId: parentId, referenceChildrenId: childrenId} = referenceData
        const thisValue = obj[parentId].items[childrenId];
        const { values } = thisValue.content;
        const ret = values.reduce((acc: string, el: IThemeItemValue) => {
            const {reference} = el;
            let concatable = '';
            const metricPostfix = isInitiallyMetric ? rootMetrics + ' ' : '';
            if (reference) {
                const referencedStyles = gettingValueWithReference(reference, obj, rootMetrics, isInitiallyMetric);
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
        return ret
}

export const gettingValueForInput =
    (referenceData: IThemeItemValueReference ,
     obj: IThemeState,
     rootMetrics: EnumMetrics | null,
     isInitiallyMetric: boolean,
     name: string = '')=>{
        const {referenceParentId: parentId, referenceChildrenId: childrenId} = referenceData
        const thisValue = obj[parentId].items[childrenId];
        const { values } = thisValue.content;
        const ret = values.reduce((acc: string, el: IThemeItemValue) => {
            const {reference} = el;
            let concatable = '';
            const metricPostfix = isInitiallyMetric ? rootMetrics + ' ' : '';
            if (reference) {
                const referencedStyles = gettingValueWithReference(reference, obj, rootMetrics, isInitiallyMetric);
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
        return ret
    }

