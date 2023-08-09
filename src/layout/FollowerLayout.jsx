import React, { useMemo, useState } from 'react';
import Followers from '../pages/Followers';
import Topbar from '../components/common/topbar/Topbar';
import { getCurrentUser } from '../api/FireStoreAPIs';


function FollowerLayout() {

  const [currentUser, setCurrentUser ] = useState({});
  useMemo(()=>{
    getCurrentUser(setCurrentUser);
  },[])

  return (
    <div>
        <Topbar currentUser={currentUser}/>
        <Followers currentUser={currentUser}/>
    </div>
  );
}

export default FollowerLayout;
