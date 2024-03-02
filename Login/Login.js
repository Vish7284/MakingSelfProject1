import React, { useState,useContext , useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth_constext';
import Input from '../UI/Input/Input';

const emailReducer =(state ,action) => {
  if(action.type === 'USER_INPUT'){
    return {value:action.val,isValid:action.val.includes('@')}
  }
  if(action.type === 'INPUT_BLUR'){
     return{ value:state.value ,isValid:state.value.includes('@')}
  }
  return { value:'', isValid: false};
}


const passwordReducer =(state,action) => {
   if(action.type === 'USER_INPUT'){
    return { value:action.val , isValid: action.val.trim().length > 6 }
   }
   if(action.type === 'INPUT_BLUR'){
    return{ value: state.value, isValid: state.value.trim().length> 6}
   }
  return { value:'', isValid: false}
}
const collegeReducer =(state,action) => {
  if(action.type === 'USER_INPUT'){
   return { value:action.val , isValid: action.val.trim().length > 2 }
  }
  if(action.type === 'INPUT_BLUR'){
   return{ value: state.value, isValid: state.value.trim().length> 2}
  }
 return { value:'', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege,setEnteredCollege] = useState('');
  // const [collegeIsValid , setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail] = useReducer(emailReducer,
    {value:'',
    isValid:null});

  const [passwordState , dispatchPassword] = useReducer(passwordReducer ,
    {
      value:'',
      isValid:null

    })  

    const [collegeState, dispatchCollege] = useReducer(collegeReducer , 
      {
        value:'',
        isValid:null
      });

      const authCtx  = useContext(AuthContext)
    
  // useEffect(() => {
  //    const identifier =  setTimeout(() => {
  //    console.log("timer1");
  //    setFormIsValid(
  //     enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 4
  //   );
  //   },1000)
    
  //   return () => {
  //     console.log('cleanup');
  //     clearTimeout(identifier)
  //   }
  // },[enteredEmail,enteredPassword,enteredCollege])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:'USER_INPUT',val:event.target.value});

    setFormIsValid(
     event.target.value.includes('@') && passwordState.isValid && collegeState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_INPUT', val: event.target.value});
    setFormIsValid(
    emailState.isValid && event.target.value.trim().length > 6 && collegeState.isValid
      );

  };
   
  const collegeChangeHandler = (event) => {
    // setEnteredCollege(event.target.value);
    dispatchCollege({type:'USER_INPUT', val: event.target.value});
    setFormIsValid(
     emailState.isValid  && passwordState.isValid && event.target.value.trim().length > 4
    );
  }

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'INPUT_BLUR'})
  };

  const validateCollegeChangeHandler =() => {
    // setCollegeIsValid(enteredCollege.trim().length > 4)
    dispatchCollege({type:'INPUT_BLUR'})
  }
  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value ,collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
           id="email" 
           label="E-Mail"
           type="email"
           isValid={emailState.isValid}
           value ={emailState.value}
           onChange={emailChangeHandler}
           onBlur={validateEmailHandler}/>
        <Input 
           id="password" 
           label="Password"
           type="password"
           isValid={passwordState.isValid}
           value ={passwordState.value}
           onChange={passwordChangeHandler}
           onBlur={validatePasswordHandler}/>
        <Input 
           id="college" 
           label="College Name"
           type="text"
           isValid={collegeState.isValid}
           value ={collegeState.value}
           onChange={collegeChangeHandler}
           onBlur={validateCollegeChangeHandler}/>
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
