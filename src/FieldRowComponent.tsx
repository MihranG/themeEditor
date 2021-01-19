import React, {useState} from "react";
import {Card, Col, Row} from "reactstrap";

interface IFieldRowComponentProps {
    name: string,
    id: string,
    parentId: string,
    content: {
        metrics: string,
        values: Array<{
            value: null | string,
            isMetricValue: boolean
        }>
    }
}
const FieldRowComponent: React.FC<IFieldRowComponentProps> = ({name, id, parentId, content}) =>{
    const [isEditing, setIsEditing] = useState(false);
    return (
            <Row  className='field__row'>
                <Col md={9} >
                    <div className='field__description'>
                        <div className='field__name'>
                            Primary font color:
                        </div>
                        <div className='field__brief'>
                            1px solid black
                        </div>
                    </div>
                </Col>
                <Col md={3}>
                    <div className='field__reference'>
                        {`${parentId}.${id}`}
                    </div>
                </Col>
            </Row>

    )

}


export default FieldRowComponent
