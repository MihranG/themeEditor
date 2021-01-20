import React, {ChangeEvent, useState} from "react";
import {Input, Col, Collapse, Row, FormGroup, Label, Button} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {RootState, editMetrics} from "./store";
import {EnumMetrics, IThemeItem} from "./Interfaces";
import {useStyleGenerator} from "./hooks"


const FieldRowComponent: React.FC<{ stylePropId: string, parentId: string }> = ({stylePropId, parentId}) =>{
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const styleProperty: IThemeItem = useSelector((state: RootState)=>state.theme[parentId].items[stylePropId]);
    const [inputValue, setInputValue, stylesStrings] = useStyleGenerator(styleProperty.content);

    const toggle = () => setIsEditing(!isEditing);
    const onCheckBoxChoose = (e: ChangeEvent<HTMLInputElement>) => {
        const metrics = e.target.value as EnumMetrics;
        dispatch( editMetrics({id: stylePropId, parentId:  parentId, metrics }) );
    }

    return (
        <FormGroup className={isEditing ? 'row__container row__container-open' : 'row__container'}>
            <Row className='field__row' >
                <Col md={7} >
                    <Label className='field__description' onClick={toggle}>
                        <div className='field__name'>
                            {styleProperty.name}:
                        </div>
                        <div className='field__brief'>
                            {stylesStrings.css}
                        </div>
                    </Label>
                </Col>
                <Col md={4}>
                    <div className='field__reference'>
                        {`${parentId}.${stylePropId}`}
                    </div>
                </Col>
                {isEditing &&
                    <Col md={1}>
                        <Button close aria-label="Close" onClick={toggle}/>
                    </Col>
                }
            </Row>
            <Collapse isOpen={isEditing}>
                <FormGroup row className='field__row'>
                    <Label md={2} >
                        <Label>
                            Input:
                        </Label>
                    </Label>
                    <Col md={10} >
                        <Input
                            value={inputValue}
                            onChange={setInputValue}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row className='field__row'>
                    <Label md={2} className='d-flex' >
                        <Label>
                            Metric type:
                        </Label>
                    </Label>
                    <Col md={8} className='d-flex'>
                        {Object.values(EnumMetrics).map((singleMetric, index)=>(
                            <FormGroup check inline key={index}>
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        checked={singleMetric === styleProperty.content.metrics}
                                        disabled={!styleProperty.content.metrics}
                                        onChange={onCheckBoxChoose}
                                        value={singleMetric}
                                    />
                                    {singleMetric}
                                </Label>
                            </FormGroup>
                        ))}
                    </Col>
                    <Col md={2}>
                        <Button  aria-label="ok" onClick={toggle}>
                            OK
                        </Button>
                    </Col>
                </FormGroup>
            </Collapse>
        </FormGroup>

    )

}


export default FieldRowComponent
