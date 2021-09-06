import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

//  Can be outside of the component function bec don't need any data from the component.
const emailReducer = (state, action) => {
  //  In this example, the action is an object, but it doesn't have to be.
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')};
  }
  if (action.type === 'INPUT_BLUR') {
    //  The state will always be the last state, no danger of it maybe not if thread didn't run yet.
    return {value: state.value, isValid: state.value.includes('@')};
  }
  return {value: '', isValid: false};
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6};
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6};
  }
  return {value: '', isValid: false};
};

const Login = (props) => {
  //  Could put all 5 states into one useReducer(), but just doing groups of 2 here.
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //  Could do an anonymous function like this, or make a named function like above:
  //const [emailState, dispatchEmail] = useReducer(() => {});
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '', 
    isValid: false
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '', 
    isValid: false
  });

  useEffect(() => {
    console.log('EFFECT RUNNING');
    return () => {
      //  Runs on logout or something.
      console.log('EFFECT CLEANUP');
    };
  });

  /*useEffect(() => {
    //  This is a timer that runs 500ms after a user stops typing!
    //  identifier = handler.
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6
      );
    }, 500);

    //  Can only return a function from a useEffect()!
    //  This one is an anonymous arrow function, but could do a named function as well.
    //  Called a "cleanup" function. Runs BEFORE the other code in the useEffect, except for 
    //  the first time. Also when the component is removed from the DOM or something?
    return () => {
      console.log('CLEANUP');
      //  This clears the timer as long as the user keeps typing (doesn't stop for 500ms).
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);*/

  const emailChangeHandler = (event) => {
    //  It's convention to do a string of all caps for this.
    //  It triggers the emailReducer() function to execute.
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    setFormIsValid(
      //  This is the state in the useReducer():
      emailState.value.includes('@') && passwordState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});
    setFormIsValid(
      //  From useReducer():
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    //  Once again, coming from the useReducer().
    //  Make sure the object property names here are the same as everywhere else.
    //  The string is 'INPUT_BLUR' bec this happens when the input looses focus (user clicks out of it).
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
