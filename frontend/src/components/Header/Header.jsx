import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logOut} from '../../slices/authSlice'

const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handlelogOut = async ()=>{
    await dispatch( logOut() )
    navigate('/')
  }

  return (
    <div className='header_wrapper'>
        <div>Logo</div>
        <nav className='nav_items'>
            <ul>
                <li><Link to='/admin'>Admin</Link></li>
                <li><Link to='/manager'>Manager</Link></li>
                <li><Link to='/user'>User</Link></li>
            </ul>
            <div><button className='logout_btn' onClick={handlelogOut}>Logout</button></div>
        </nav>
    </div>
  )
}

export default Header