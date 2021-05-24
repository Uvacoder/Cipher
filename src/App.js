import './App.css';
import MainLayout from './Components/Layout/Layout'
import Login from './Components/Login/Login'

/**
 * Top level component
 * @component
 * @returns Main app components - Login && Layout
 */
const App = () => {
  return (
    <>
      <div className="app">
        <MainLayout />
      </div>
      <Login />
    </>
  );
}

export default App;