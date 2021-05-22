import './App.css';
import MainLayout from './Components/Layout/Layout'
import Login from './Components/Login/Login'

function App() {
  return (
    <>
      <Login />
      <div className="App">
        <MainLayout />
      </div>
    </>
  );
}

export default App;