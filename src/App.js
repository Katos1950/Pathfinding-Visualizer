import './App.css';
import { Grid } from './components/grid';
import { GridProvider } from './components/grid/GridContext';
import {Header} from './components';
import { Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <GridProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<Grid/>}></Route>
          </Routes>
      </GridProvider>
    </div>
  );
}

export default App;
