import './App.css';
import Navbar from './components/Navbar.js';
import LoginForm from './components/LoginForm.js';
import RegisterForm from './components/RegisterForm.js';

function App() {
  console.log("App is rendering")
  return (
    <div className="App">
      <Navbar />
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default App;
