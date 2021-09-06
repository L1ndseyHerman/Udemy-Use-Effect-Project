//  This is not a component, so that's why it's lowercase.
//  Can have 1+ context files for useContext().
import React from 'react';

//  If you have a string-based useState() passed as a prop, this could be its default.
//React.createContext('my state!');

//  AuthContext is an object that contains components somehow?
const AuthContext = React.createContext({
    isLoggedIn: false
});

//  You can import this to get the props or something.
export default AuthContext;