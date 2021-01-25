export interface IThemeState {
  [key: string]: IThemeStateElement;
}

export interface IThemeStateElement {
  id: string;
  name: string;
  items: { [key: string]: IThemeItem };
}

export interface IThemeItem {
  id: string;
  name: string;
  parentId: string;
  content: IThemeItemContent;
}

export interface IThemeItemContent {
  metrics: EnumMetrics | null;
  values: IThemeItemValue[];
  error?: boolean;
}

export interface IThemeItemValue {
  reference: null | IThemeItemValueReference;
  isMetric: boolean;
  value: string;
}

export interface IThemeItemValueReference {
  referenceParentId: string;
  referenceChildrenId: string;
}

export enum EnumMetrics {
  EM = "em",
  REM = "rem",
  PX = "px",
}

export interface ICssValidation {
  error: boolean;
  valuesArray: string[] | null;

  cssString?: string;
}

export interface IThemeActionPayloadMain {
  id: string;
  parentId: string;
}
