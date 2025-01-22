import './App.css';
import { Grid } from './components/grid';
import { GridProvider } from './components/grid/GridContext';
import {Header} from './components';
import { ElementInfo } from './components/ElementInfo';
import { AppProvider } from './components/AppContext';
import { Tutorial } from './components/Tutorial';
import { useState } from 'react';

function App() {
  const [tutorial,setTutorial] = useState(true);
  return (
    <div className="App">
      {tutorial && <Tutorial openTutorial = {setTutorial}/>}
      <AppProvider>
        <GridProvider>
            <Header/>
            <ElementInfo/>
            <Grid/>
        </GridProvider>
      </AppProvider>
    </div>
  );
}

export default App;
