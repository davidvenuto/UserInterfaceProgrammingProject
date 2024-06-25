import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar.js';
import LoginForm from './components/pages/LoginForm.js';
import RegisterForm from './components/pages/RegisterForm.js';
import About from './components/pages/About.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<About />} />
            <Route path="registration" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
