// import FieldComponent from "./FieldComponent";
import FieldComponent from "./FieldRowComponent";
import React from 'react';
import {Provider} from "react-redux";
import store from "./store/store";
import renderer, { ReactTestRendererJSON} from 'react-test-renderer';



describe('<FieldComponent />', () => {
    // test with react-test-renderer
    let treeWithJSON: ReactTestRendererJSON | ReactTestRendererJSON[] | null;

    beforeEach(()=>{
        treeWithJSON = renderer.create(
            <Provider store={store}>
                <FieldComponent parentId='sizes' stylePropId='h1'/>
            </Provider>).toJSON();
    })

    it('matches the snapshot', () => {
        expect(treeWithJSON).toMatchSnapshot();
    });
})
