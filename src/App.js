import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    //  He's using '1' to mean 'true' here, since can only store string data.
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  //  AuthContext.Provider is a component somehow!
  //  All components (and their children) btw the <AuthContext.Provider> and the </AuthContext.Provider>
  //  will have access to its props!

  //  Something abt don't need the .Provider if u have a default value,
  //  but that's not what u should use it for, should use it for changable props.

  //  "value" is a pre-coded prop, so have to call it that.
  //  Here is how to pass the isLoggedIn to the AuthContext instead of as a prop.
  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn
    }}>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
