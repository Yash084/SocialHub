import React, { useEffect, useState } from 'react';
import FollowersComponent from '../components/FollowersComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

const Followers = ( {currentUser} ) => {

    
  const [ loading, setLoading ] = useState(true);
    const navigate = useNavigate();
    useEffect(()=>{
        onAuthStateChanged(auth, res =>{
            if(!res?.accessToken)
            {
                navigate('/login');
            }
            else
            {
                setLoading(false);
            }
        })
    },[])
  return (
    loading ? <Loader/> :  <FollowersComponent currentUser={currentUser}/>
  );
}

export default Followers;
