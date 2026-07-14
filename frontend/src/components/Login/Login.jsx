import React, { useState } from 'react'
import './Login.css'

const Login = () => {

    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')

    const emailChange=(e)=>{
        setEmail(e.target.value)
    }
    const passwordChange=(e)=>{
        setPassword(e.target.value)
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        alert(`The Creds are ${email}, ${password}`)
    }

  return (
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
            </div>
        </form>
    </div>
  )
}

export default Login