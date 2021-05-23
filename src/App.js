import './App.css';
import MainLayout from './Components/Layout/Layout'
import Login from './Components/Login/Login'

/**
 * Top level component
 * @component
 * @returns Main app components - Login && Layout
 */
function App() {
  return (
    <>
      <div className="App">
        <MainLayout />
      </div>
      <Login />
    </>
  );
}

export default App;