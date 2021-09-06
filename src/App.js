import React, {useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {

  //  AuthContext.Provider is a component somehow!
  //  All components (and their children) btw the <AuthContext.Provider> and the </AuthContext.Provider>
  //  will have access to its props!

  //  Something abt don't need the .Provider if u have a default value,
  //  but that's not what u should use it for, should use it for changable props.

  //  "value" is a pre-coded prop, so have to call it that.
  //  Here is how to pass the isLoggedIn to the AuthContext instead of as a prop.

  //  And here is how to pass a pointer to a logout function:

  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
