import React, {useState} from "react";
import FieldRowComponent from "./FieldRowComponent";
import {Button, Card, Collapse} from "reactstrap";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";
import {IThemeItem, IThemeStateElement} from "./Interfaces";

const FieldComponent: React.FC<IThemeStateElement> = ({name, items, id})=>{
    const [isOpen, setIsOpen] = useState(false);
    const toggle = ()=>setIsOpen(!isOpen);
    const itemsArray = Object.values(items);
    return (<div className='field'>
        <div className='field__header'>
            <Button
                onClick={toggle}
                outline
                color="secondary"
                className='field__toggle_button'
            >
                <div className={!isOpen ? 'field__toggle_icon' : 'field__toggle_icon-open'} />
            </Button>
            <div className='field__title'>{name}</div>
        </div>
        <Collapse isOpen={isOpen}>
            <Card className='field__content'>
                {itemsArray.map(({id : itemId}: IThemeItem, index: number)=>(
                    <FieldRowComponent
                        key={index}
                        stylePropId={itemId}
                        parentId={id}
                    />)
                )}
            </Card>
        </Collapse>
    </div>)
}

export default FieldComponent
