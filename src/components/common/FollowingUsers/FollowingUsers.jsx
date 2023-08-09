import React,{ useState , useEffect} from 'react';
import { getConnections } from '../../../api/FireStoreAPIs';

const FollowingUsers = ({user, getCurrentUser, currentUser}) => {

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getConnections( currentUser.userId , user.id, setIsConnected);
  }, [ currentUser.userId , user.id]);


  const truncateHeadline = (headline, maxLength) => {
    if (!headline) return ''; 
    if (headline.length <= maxLength) return headline;
    return headline.slice(0, maxLength) + '...';
  };


  return isConnected ?  <></> : (
    <div className='grid-child'>
         <img src={user.imageLink} alt="" />
        <p className='name'>{user.name}</p>
        <p className='headline'>{truncateHeadline(user.headline, 30)}</p>
        <button onClick={()=> getCurrentUser(user.id)}>Follow</button>
    </div>
  );
}

export default FollowingUsers;
