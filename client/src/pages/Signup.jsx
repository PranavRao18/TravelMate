import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendPortURL from '../constants';

const Signup =  () => {

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
    console.log(form);
    try{
      const {data} = await axios.post(backendPortURL + 'auth/register', form)
      if(data.error){
        console.log(data.error);
        setMessage(data.error);
      } else {
        setForm({});
        console.log('Login Successful');
        navigate(`/hero?token=${data.token}`);
      }
    }
    catch(err){
      setMessage(err);
      console.log(err);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-tl'>
      <div className='bg-white px-8 py-12 rounded-[15px]'>
        <h3 className='text-black text-center text-3xl font-medium pb-4'>SIGNUP</h3>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <input type='email' placeholder='Email' name='email' onChange={handleChange} required className='m-2 p-2 bg-[#88ddff] placeholder:text-black rounded-[5px] text-black'/>
          <input type='password' placeholder='Password' name='password' onChange={handleChange} required className='m-2 p-2 bg-[#88ddff] placeholder:text-black rounded-[5px] text-black'/>
          <button type='submit' className='bg-[#f2f9ff] text-black m-2 p-2 rounded-[5px] font-medium border-2 border-[#88ddff] hover:scale-110' >SUBMIT</button>
          <p className='text-[#ff0000]'>{message}</p>
        </form>
      </div>
    </div>
  )
}

export default Signup;
