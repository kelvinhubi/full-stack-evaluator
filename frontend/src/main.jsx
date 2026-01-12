import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const user = true; // Change to an object like {} to simulate a logged-in user
function Son(myobj) {
  return (
    <div style={{ background: 'lightgreen' }}>
      <h2>Son {myobj.model}</h2>
      <div>{myobj.children}</div>
    </div>
  );
}

function Daughter(props) {
  return (
    <div style={{ background: 'lightblue' }}>
      <h2>Daughter {props.model}</h2>
      <div>{props.children}</div>
    </div>
  );
}

function Parent(props) {
  return (
    <div>
      <h1>My two Children</h1>
      <Son model={props.model}>
        <p>
          This was written in the Parent component,
          but displayed as a part of the Son component
        </p>
      </Son>
      <Daughter model={props.model}>
        <p>
          This was written in the Parent component,
          but displayed as a part of the Daughter component
        </p>

      </Daughter>
    </div>
  );
}
if (user) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
      <h1>Welcome back!</h1>
      {/* Parent Component Uses props children */}
      <Parent model="Tesla" />
    </StrictMode>);
}

