import React, { useState } from 'react';
import "./ProfileEdit.scss";
import { editProfile } from '../../../api/FireStoreAPIs';


const ProfileEdit = ({ onEdit, currentUser }) => {

  const [editInputs, setEditInputs] = useState({});

  const getInput = (event) => {
    let { name, value } = event.target;

    let input = { [name]: value };
    setEditInputs({ ...editInputs, ...input });
  }



  const updateProfileData = async () => {
    await editProfile(currentUser?.userId, editInputs);
    await onEdit();
  }


  console.log(editInputs);
  return (
    <div className='profile-card'>
      <div className='edit-btn'>
        <button onClick={onEdit}>Go back</button>
      </div>
      <div className='profile-edit-input'>
        <input
          onChange={getInput}
          className='edit-input'
          type="text"
          placeholder='About'
          name='headline' />
        <input
          onChange={getInput}
          className='edit-input'
          id='location'
          type="text"
          placeholder='Location'
          name='location'
        />

        {/* <input 
        onChange={getInput} 
        className='edit-input' 
        type="text" 
        placeholder='Location'
        name='location' /> */}

        {/* <input 
        onChange={getInput} 
        className='edit-input' 
        type="text" 
        placeholder='Company'
        name='company' /> */}

        {/* <input 
        onChange={getInput} 
        className='edit-input' 
        type="text" 
        placeholder='College'
        name='college' /> */}

      </div>


      <div className='save'>
        <button className='save-btn' onClick={updateProfileData}>Save</button>
      </div>
    </div>
  );
}

export default ProfileEdit;
