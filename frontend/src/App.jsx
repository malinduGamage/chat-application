import './App.css';
import { Login } from './pages/login/Login';
import { SignUp } from './pages/signup/SignUp';
import { Home } from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <div className='p-4 h-screen flex items-center justify-center bg-gray-500'>
        <Home />
      </div>
    </div>
  );
}

export default App;
