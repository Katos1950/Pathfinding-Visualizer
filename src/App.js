import './App.css';
import { Grid } from './components/grid';
import { GridProvider } from './components/grid/GridContext';
import {Header} from './components';
import { ElementInfo } from './components/ElementInfo';
import { AppProvider } from './components/AppContext';


function App() {
  return (
    <div className="App">
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
