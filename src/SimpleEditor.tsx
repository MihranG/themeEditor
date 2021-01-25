import { Button, Card, CardTitle, Col, Row } from "reactstrap";
import FieldComponent from "./FieldComponent";
import React, { useEffect } from "react";
import { IThemeState, IThemeStateElement } from "./Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { addThemeState, RootState, resetToInitialState } from "./store/store";
import {
  setThemeToLocalStorage,
  removeThemeFromLocalStorage,
  getThemeFromLocalStorage,
} from "./helpers/localStorage";

const SimpleEditor = () => {
  const theme: IThemeState = useSelector((state: RootState) => state.theme);
  const fields: IThemeStateElement[] = useSelector((state: RootState) =>
    Object.values(state.theme)
  );
  const isThereError: boolean = useSelector((state: RootState) =>
    Object.values(state.theme).some((value) =>
      Object.values(value.items).some((item) => item.content.error)
    )
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = getThemeFromLocalStorage();
    if (savedTheme) {
      dispatch(addThemeState({ newTheme: savedTheme }));
    }
  }, [dispatch]);

  const onSave = () => {
    setThemeToLocalStorage(theme);
  };

  const onReset = () => {
    dispatch(resetToInitialState());
    removeThemeFromLocalStorage();
  };

  return (
    <Card className="editor" data-testid="editor_wrapper">
      <CardTitle className="editor__title" data-testid="editor_title">
        simple text editor
      </CardTitle>
      {fields.map((singleField: IThemeStateElement, index: number) => (
        <FieldComponent key={index} {...singleField} />
      ))}
      <Row className="m-1">
        <Col md={4}>
          <Button
            onClick={onReset}
            data-testid="reset_button"
            color="secondary"
          >
            Reset to initial
          </Button>
        </Col>
        <Col md={4} />
        <Col md={4}>
          <Button
            color="primary"
            data-testid="save_button"
            onClick={onSave}
            disabled={isThereError}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default SimpleEditor;
