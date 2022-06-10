import logo from './logo.svg';
import './App.css';
import NotesList from './components/NotesList';
import ArchiveNotes from './components/ArchiveNotes';
import 'bootstrap/dist/css/bootstrap.min.css'
//import 'font-awesome/css/font-awesome.min.css'
import {Routes,Route} from 'react-router-dom'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<NotesList></NotesList>}/>
      <Route path='archive' element={<ArchiveNotes></ArchiveNotes>}/>

    </Routes>

    </>
    
      
 
  );
}

export default App;
