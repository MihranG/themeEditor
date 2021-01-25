import {
  EnumMetrics,
  ICssValidation,
  IThemeItem,
  IThemeItemContent,
} from "../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { editMetrics, setError, editValue, RootState } from "../store/store";
import {
  stylesService as uglyRawStyleService,
  extractMetricsAndPrepareForStateUpdate,
} from "../utils/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export function useStyleGenerator(
  content: IThemeItemContent,
  ids: { id: string; parentId: string }
): [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  { css: string; inputText: string }
] {
  const themeState = useSelector((state: RootState) => state.theme);
  const stylesObject = uglyRawStyleService(content, themeState);
  const texts = stylesObject.getStringForStyles(false);
  const [inputValue, setInputValue] = useState(texts.inputText);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const dispatch = useDispatch();
  useEffect(() => {
    if (texts.inputText !== inputValue) {
      setInputValue(texts.inputText);
    }
  }, [texts.inputText]);

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const parsedCssString: ICssValidation = stylesObject.getCssValuesFromString(
        e.target.value
      );
      const metricUnit: EnumMetrics | null = stylesObject.getFirstMetricUnit(
        e.target.value
      );
      if (metricUnit) {
        const metrics = metricUnit as EnumMetrics; // avoids ts error
        dispatch(
          editMetrics({
            id: ids.id,
            parentId: ids.parentId,
            metrics,
            error: false,
          })
        );
      }
      if (!parsedCssString.error && parsedCssString.valuesArray) {
        const valuesArray = extractMetricsAndPrepareForStateUpdate(
          parsedCssString.valuesArray
        );
        dispatch(
          editValue({
            id: ids.id,
            parentId: ids.parentId,
            values: valuesArray,
            error: false,
          })
        );
      } else {
        dispatch(setError({ id: ids.id, parentId: ids.parentId, error: true }));
      }
    }, 300);
  };

  return [inputValue, changeInputValue, texts];
}
