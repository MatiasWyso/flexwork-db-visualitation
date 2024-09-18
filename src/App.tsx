// src/App.tsx
import React, { useState } from 'react';
import GridPage from './components/GridPage';
import Login from './components/Login';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  
  React.useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div className="App">
      
      {user ? <GridPage /> : <Login />}
    </div>
  );
}

export default App;
