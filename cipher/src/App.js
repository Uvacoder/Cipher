import './App.css';
import MainLayout from './components/Layout/Layout'
import Login from './components/Login/Login'

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