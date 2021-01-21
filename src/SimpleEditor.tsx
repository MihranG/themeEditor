import {Card, CardTitle} from "reactstrap";
import FieldComponent from "./FieldComponent";
import React from "react";
import {IThemeStateElement} from "./Interfaces";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";
import FieldRowComponent from "./FieldRowComponent";

const SimpleEditor = ()=> {
    const fields: IThemeStateElement[] = useSelector((state: RootState)=> Object.values(state.theme));


    return (
        <Card className='editor'>
            <CardTitle className='editor__title'>
                simple text editor
            </CardTitle>
            {fields.map((singleField: IThemeStateElement, index: number)=>(
                <FieldComponent
                    key={index}
                    {...singleField}
                />)
            )}
        </Card>
)}

export default SimpleEditor
