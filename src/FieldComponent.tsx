import React, {useState} from "react";
import FieldRowComponent from "./FieldRowComponent";
import {Button, Card, Collapse} from "reactstrap";

const FieldComponent = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = ()=>setIsOpen(!isOpen);
    return (<div className='field'>
        <div className='field__header'>
            <Button
                onClick={toggle}
                color='link'
                className='field__toggle_button'
            >
                <div className={!isOpen ? 'field__toggle_icon' : 'field__toggle_icon-open'} />
            </Button>
            <div className='field__title'>General colors</div>
        </div>
        <Collapse isOpen={isOpen}>
            <Card className='field__content'>
                {/*<FieldRowComponent />*/}
            </Card>
        </Collapse>
    </div>)
}

export default FieldComponent
