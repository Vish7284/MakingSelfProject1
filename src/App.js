import React , { useState } from 'react';
import UserForm from './UserForm/UserForm';
import UserList from './UserForm/UserList';


function App() {
  const [userList , setUserList] = useState([]);

  const addUserHandler = (uName ,uAge) => {
     setUserList((prevList) => {
      return [...prevList , {name:uName , age: uAge}]
     })
  }
  return (
    <div>
       <UserForm onAddUser ={addUserHandler}/>
       <UserList users ={ userList}/>
    </div>
  );
}

export default App;
