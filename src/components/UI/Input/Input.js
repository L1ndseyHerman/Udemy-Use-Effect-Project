import React, {useRef, useImperativeHandle} from 'react';

//  Should I make a seperate CSS class for this Input? Probobly, but let's see if he does.
import classes from './Input.module.css';

//  Need inputState, inputChangeHandler, and validateInputHandler as props.
//  The "input" could either be the email or the password, or something else in the future.
//  Also, the "email" string and the E-Mail label text.
const Input = React.forwardRef((props, ref) => {

  const inputRef = useRef();

  const activate = () => {
    //  This puts the cursor in that input!
    inputRef.current.focus();
  };

  //  This lets activate() be called outside of just this component.
  useImperativeHandle(ref, () => {
    return {
      focus: activate
    };
  });

    return (
        <div
        className={`${classes.control} ${
          props.isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        <input
          ref={inputRef}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    );
});

export default Input;