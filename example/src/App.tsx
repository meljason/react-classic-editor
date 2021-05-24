import React from 'react';
import { Editor } from 'react-classic-editor';

function App() {
  return (
    <div style={{ width: 800, margin: '0 auto', marginTop: 150, fontFamily: 'Arial' }}>
      <Editor toolbar={false} border={false} />
    </div>
  );
}

export default App;
