import './App.css'
import Tasks from "./Tasks"
import Auth from "./Auth"
import { useAuth } from './AuthContext'

function App() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>📝 React Task Evaluator</h1>
        <div className="user-info">
          <span>{user.email}</span>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      </div>
      <Tasks />
    </div>
  );
}


export default App
