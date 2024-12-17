import './App.css';
import { Grid } from './Grid';
import { GridProvider } from './GridContext';
import {Header} from './Header';
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
