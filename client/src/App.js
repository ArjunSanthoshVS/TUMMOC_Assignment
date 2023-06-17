import './App.css';
import { Navigate, Route, Routes, } from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Cities from './Pages/Cities';

function App() {
  const user = JSON.parse(localStorage.getItem("userToken"));
  return (
    <div className="App">
      <Routes>
        {user && <Route path='/' exact element={<Home />} />}
        {user && <Route path="/signup" exact element={<Navigate replace to='/' />} />}
        {user && <Route path="/login" exact element={<Navigate replace to='/' />} />}
        {user && <Route path="/cities" exact element={<Cities />} />}
        <Route path='/' exact element={<Login />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/cities' exact element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
