import { MemoryRouter as Router, Routes, Route, useSubmit, BrowserRouter } from 'react-router-dom';
import './App.css';
import Entry from './Entry';
import WordList from './WordList';
import { NavLink, Link } from 'react-router-dom';
import { HashRouter } from "react-router-dom";

function Navigation() {
    return (
        <div style={{height: 100, background: 'black', position: 'fixed'}}>
            mijijiji
        </div>
    )
}
export default function App() {
  return (
    <HashRouter>
        <nav>
            <Link className="nav-link" to="/">Add Words</Link>
            <Link className="nav-link" to="/list">Review Words</Link>
        </nav>

        <Routes>
            <Route index element={<Entry />}/>
            <Route path="list" element={<WordList />}/>
        </Routes>
    </HashRouter>
  );
}
