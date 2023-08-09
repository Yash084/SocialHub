import React, { useMemo, useState } from 'react';
import { getCurrentUser } from '../api/FireStoreAPIs';
import Topbar from '../components/common/topbar/Topbar';
import Profile from '../pages/Profile';

const ProfileLayout = () => {

    const [ currentUser, setCurrentUser ] = useState({});

    useMemo(()=>{
        getCurrentUser(setCurrentUser);
    },[])
  return (
    <div>
      <Topbar currentUser={currentUser}/>
      <Profile currentUser={currentUser}/>
    </div>
  );
}

export default ProfileLayout;
