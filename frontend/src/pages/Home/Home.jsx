import React from 'react'
import { useDispatch } from "react-redux";
import { login } from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom';
import './Home.css'
import { useState } from 'react';

const Home = () => {

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[error,setError]=useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailChange=(e)=>{
      setError('')
      setEmail(e.target.value)
  }
  const passwordChange=(e)=>{
      setError('')
      setPassword(e.target.value)
  }

  const submitHandler = async (e) => {
        e.preventDefault();

    try {
        if (!email || !password) {
            setError('Please enter all credentials');
            return;
        }

        const data = { email, password };
        const result = await dispatch(login(data));
        // console.log('Result in Home.jsx', result);

        if (login.fulfilled.match(result)) {
        navigate('/admin');
        } 
        else if (login.rejected.match(result)) {
        const message = result.payload || result.error?.message || 'Login failed';
        setError(message);
        }
        } catch (err) {
            console.error('Unexpected error:', err);
            setError('Something went wrong. Please try again.');
        }
    };


  return (
    <div className='home_wrapper'>
      <div className='login_box'>
        <h2 className='login_title'>Login</h2>
        <form>
            <div className='input_section'>
                <label><h4>Email</h4></label>
                <input type='text' name='email' onChange={emailChange} />
            </div>
            <div className='input_section'>
                <label><h4>Password</h4></label>
                <input type='text' name='password' onChange={passwordChange} />
            </div>
            <div>
                <button className='submit_btn' onClick={submitHandler}>Submit</button>
                {error && <p className='error_section'>{error}</p> }
            </div>
        </form>
    </div>
    </div>
  )
}

export default Home