export interface IThemeState {
    [key: string]: IThemeStateElement
}

export interface IThemeStateElement {
    id: string,
    name: string,
    items: {[key: string]: IThemeItem}
}

export interface IThemeItem{
    id: string,
    name: string,
    parentId: string,
    content: IThemeItemContent
}

export interface IThemeItemContent{
    metrics: EnumMetrics | null,
    values: Array<{
        reference: null | {
            referenceParentId: string,
            referenceChildrenId: string
        },
        isMetric: boolean,
        value: string
    }>
}

export enum EnumMetrics{
    EM='em',
    REM='rem',
    PX='px'
}



