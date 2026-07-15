import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <div className='header_wrapper'>
        <div>Logo</div>
        <nav className='nav_items'>
            <ul>
                {/* <li><Link to='/'>Home</Link></li> */}
                <li><Link to='/admin'>Admin</Link></li>
                <li><Link to='/manager'>Manager</Link></li>
                <li><Link to='/user'>User</Link></li>
            </ul>
            <div className='logout_btn'>Logout</div>
        </nav>
    </div>
  )
}

export default Header