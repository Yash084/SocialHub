import React from 'react';
import NewPost from './common/addpost/NewPost';
import "../sass/HomeComponent.scss";
const HomeComponent = ({ currentUser }) => {
  return (
    <div>
      <NewPost currentUser={ currentUser }/>
    </div>
  );
}

export default HomeComponent;
