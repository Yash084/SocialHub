import React, { useState, useMemo, useEffect } from 'react';
import './NewPost.scss';
import ModalComponent from '../modal/Modal';
import { postStatus, getStatus, updatePost } from '../../../api/FireStoreAPIs';
import PostCard from '../postcard/PostCard';
import moment from 'moment/moment';
import { v4 as uuid } from 'uuid';
import { uploadPostImage } from '../../../api/ImageUpload';




export const getUniqueID = () => {
  let id = uuid();

  return id;
};




const getCurrentTimeStamp = (timeFormat) => {
  return moment().format(timeFormat);
}



const NewPost = ({ currentUser }) => {


  let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [allStatuses, setAllStatuses] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");

  const sendStatus = async () => {

    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp('LLL'),
      userEmail: userEmail,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.userId,
      postImage: postImage
    }
    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false)
    await setStatus("");
  }

  const getEditData = (posts) => {

    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };



  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };



  useMemo(() => {
    getStatus(setAllStatuses);
  }, [])


  return (
    <div className='post-status-main'>
      <div className='user-deatils'>
        <img
          src={currentUser ? currentUser.imageLink : userIcon}
          alt="profile-image"
          />
        <h3>{currentUser.name}</h3>
        <p>{currentUser.headline}</p>
      </div>
      <div className='post-status'>
        <button className='open-post-modal' onClick={() => {
          setIsEdit(false)
          setModalOpen(true)
        }}>Start a Post</button>
      </div>
      <ModalComponent
        status={status}
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        sendStatus={sendStatus}
        isEdit={isEdit}
        updateStatus={updateStatus}
        uploadPostImage={uploadPostImage}
        postImage={postImage}
        setPostImage={setPostImage}
        currentPost={currentPost}

      />

      <div>
        {allStatuses.map((posts) => {
          return (
            <PostCard key={posts.postID} posts={posts} getEditData={getEditData} />
          )
        })}
      </div>
    </div>
  );
}

export default NewPost;
