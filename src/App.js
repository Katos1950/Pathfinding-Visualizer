import './App.css';
import { Grid } from './components/grid';
import { GridProvider } from './components/grid/GridContext';
import {Header} from './components';
import { Routes,Route } from 'react-router-dom';
import { ElementInfo } from './components/ElementInfo';
import { AppProvider } from './components/AppContext';


function App() {
  return (
    <div className="App">
      <AppProvider>
        <GridProvider>
            <Header/>
            <ElementInfo/>
            <Routes>
              <Route path="/" element={<Grid/>}></Route>
            </Routes>
        </GridProvider>
      </AppProvider>
    </div>
  );
}

export default App;
