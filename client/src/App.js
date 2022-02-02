import './App.css';
import Register from "./components/Register";
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Edit from './components/Edit';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/dashboard' element={<Dashboard />} />
          <Route exact path='/edit/:id' element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
