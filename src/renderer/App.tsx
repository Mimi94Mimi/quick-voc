import { MemoryRouter as Router, Routes, Route, useSubmit, BrowserRouter } from 'react-router-dom';
import './App.css';
import Entry from './Entry';
import WordList from './WordList';
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <div style={{height: 100, background: 'black', position: 'fixed'}}>
            mijijiji
        </div>
    )
}
export default function App() {
  return (
    <BrowserRouter>
        <nav>
            <NavLink className="nav-link" to="/">Add Words</NavLink>
            <NavLink className="nav-link" to="/list">Review Words</NavLink>
        </nav>

        <Routes>
            <Route index element={<Entry />}/>
            <Route path="list" element={<WordList />}/>
        </Routes>
    </BrowserRouter>
  );
}
