//  This is not a component, so that's why it's lowercase.
//  Can have 1+ context files for useContext().
import React, {useState, useEffect} from 'react';

//  If you have a string-based useState() passed as a prop, this could be its default.
//React.createContext('my state!');

//  AuthContext is an object that contains components somehow?

//  Don't need the onLogout here as long as it's in the .Provider, but the IDE will
//  give a squiggly if u don't put it here as a warning.
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

//  The error was you didn't have this export!
export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
        if (storedUserLoggedInInformation === '1') {
          setIsLoggedIn(true);
        }
      }, []);

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return(
        <AuthContext.Provider 
            value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>
            {props.children}
        </AuthContext.Provider>
    );
};

//  You can import this to get the props or something.
export default AuthContext;