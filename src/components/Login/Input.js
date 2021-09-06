import React from 'react';

//  Should I make a seperate CSS class for this Input? Probobly, but let's see if he does.
import classes from './Login.module.css';

//  Need inputState, inputChangeHandler, and validateInputHandler as props.
//  The "input" could either be the email or the password, or something else in the future.
//  Also, the "email" string and the E-Mail label text.
const Input = (props) => {
    return (
        <div
        className={`${classes.control} ${
          props.inputState.isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={props.input}>{props.inputText}</label>
        <input
          type={props.input}
          id={props.input}
          value={props.inputState.value}
          onChange={props.inputChangeHandler}
          onBlur={props.validateInputHandler}
        />
      </div>
    );
};

export default Input;