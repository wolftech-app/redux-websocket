import * as React from 'react';

import Controls from './Controls';
import DevTools from './DevTools';
import MessageLog from './MessageLog';

const App = () => (
  <div className="app-container">
    <Controls />
    <MessageLog />
    <DevTools/>
  </div>
);

export default App;
