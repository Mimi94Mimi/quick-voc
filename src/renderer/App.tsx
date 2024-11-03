import {
  Routes,
  Route,
  Link,
  HashRouter,
} from 'react-router-dom';
import './App.css';
import Entry from './Entry';
import WordList from './WordList';

export default function App() {
  return (
    <HashRouter>
      <nav>
        <Link className="nav-link" to="/">
          Add Words
        </Link>
        <Link className="nav-link" to="/list">
          Review Words
        </Link>
      </nav>

      <Routes>
        <Route index element={<Entry />} />
        <Route path="list" element={<WordList />} />
      </Routes>
    </HashRouter>
  );
}
