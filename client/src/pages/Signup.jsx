import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendPortURL from '../constants';

const Signup =  () => {

  var [form, setForm] = useState({});  
  const navigate = useNavigate();

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
    console.log(form);
    try{
      const {data} = await axios.post(backendPortURL + 'auth/register', form)
      if(data.error){
        alert(data.error)
      } else {
        setForm({});
        alert('Login Successful');
        navigate('/hero');
      }
    }
    catch(err){
      alert(err);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col'>
            <input type='email' placeholder='email' name='email' onChange={handleChange}/>            
            <input type='password' placeholder='password' name='password' onChange={handleChange}/>    
            <button type='submit' className='bg-white text-black'>SUBMIT</button>        
        </form>
    </div>
  )
}

export default Signup;
