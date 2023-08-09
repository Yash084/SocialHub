import React from 'react';
import { onLogOut } from '../../../api/AuthAPI';
import './ProfilePopUp.scss';

const ProfilePopUp = () => {
  return (
    <div className='popup-card'>
        <ul className='popup-options'>
            <li style={{ listStyle: "none"}} className='popup-option' onClick={onLogOut}>Logout</li>
        </ul>
    </div>
  );
}

export default ProfilePopUp;
