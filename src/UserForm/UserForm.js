import React , { useState } from "react";
import Card from "../UI/Card";
import classes from'./UserForm.module.css'
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const UserForm = (props) => {

    const [enteredInput , setEnteredInput] = useState('');
    const [enteredAge , setEnteredAge] = useState('');
    const [error ,setError] = useState();
     const submitHandler =(event) =>{
        event.preventDefault();
        if(enteredInput.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title:"Invalid Input",
                message:"Plese Enter a valid name and age(non - empty values)"
            })
            return;
        }
        if(+enteredAge < 1){
            setError({
                title:"Invalid Age",
                message:"Plese enter a valid age(age > 0)"
            })
            return;
        }
        props.onAddUser(enteredInput,enteredAge);
        setEnteredInput('');
        setEnteredAge('');
     }

  const userNameChangeHandler =(event)=>{
        setEnteredInput(event.target.value);
  }
  const ageChangeHandler =(event)=>{
    setEnteredAge(event.target.value);
}
   
  const errorHandler =()=>{
    setError(null);
  }

    return(
        <>
        { error && < ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
        <Card className ={classes.input}>
            <form onSubmit={submitHandler} >
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={enteredInput} onChange ={userNameChangeHandler}/>
                <br/>
                <label htmlFor="age">Age (Years)</label>
                <input type="number" id="age" value ={enteredAge} onChange={ageChangeHandler} />
                <br/>
                <Button type="submit">Add User</Button>
            </form>
        </Card>
        </>
    )
}

export default UserForm;