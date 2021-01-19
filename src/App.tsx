import React from 'react';

import {Card, CardTitle, Container} from 'reactstrap';
import FieldComponent from "./FieldComponent";



function App() {

  return (
    <div className="App">
      <Container>
          <Card className='editor'>
              <CardTitle className='editor__title'>
                  simple text editor
              </CardTitle>
              <FieldComponent />
          </Card>
      </Container>
    </div>
  );
}



export default App;
