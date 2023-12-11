import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendPortURL from '../constants';

const Login = () => {
  var [form, setForm] = useState({});  
  const navigate = useNavigate();
  var [message, setMessage] = useState("");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setForm({
        ...form,
        [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {data} = await axios.post(backendPortURL + 'auth/login', form);
    if(data.error){
      setMessage(data.error);
    } else {
      setForm({});
      setMessage("Login successful");
      navigate(`/hero?token=${data.token}`);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <input type='email' placeholder='email' name='email' onChange={handleChange} required/>            
            <input type='password' placeholder='password' name='password' onChange={handleChange} required/>    
            <button type='submit' className='bg-white text-black'>SUBMIT</button>  
            <p>{message}</p>      
        </form>
    </div>
  )
}

export default Login
