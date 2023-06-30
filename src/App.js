import './App.css';
import { Header } from './components/Header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';

import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (

    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<NotesListPage />} />
        <Route path="note/:id" element={<NotePage />} />
      </Routes>
    </div>

  );
}

export default App;
