import React, { useEffect, useState } from 'react';
import "../sass/FollowersComponent.scss";
import { getAllUsers, addConnection, getConnections } from '../api/FireStoreAPIs';
import FollowingUsers from "../components/common/FollowingUsers/FollowingUsers.jsx"



const FollowersComponent = ({ currentUser }) => {

  const [users, setUsers] = useState([])


  const getCurrentUser = (id) => {
    console.log(id);
    addConnection(currentUser.userId, id)
    console.log(currentUser);
  }
  useEffect(() => {
    getAllUsers(setUsers)
  })

  return (
    <div
      className='connections-main'
    >
      {
        users.map((user) => {
          return user.id === currentUser.userId ?
            null
            :
            <FollowingUsers
              key={user.id}
              user={user}
              getCurrentUser={getCurrentUser}
              currentUser={currentUser}
            />;
        })}
    </div>
  );

}

export default FollowersComponent;


