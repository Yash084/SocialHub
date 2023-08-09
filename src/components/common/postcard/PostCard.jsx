import React, { useMemo, useState, useEffect } from 'react';
import "./PostCard.scss";
import { useNavigate } from 'react-router-dom';
import LikeButton from '../likebutton/LikeButton';
import { getCurrentUser, getAllUsers, deletePost, getConnections } from '../../../api/FireStoreAPIs';
import { BsPencil, BsTrash } from 'react-icons/bs';

const PostCard = ({ posts, getEditData }) => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [isConnected, setIsConnected] = useState(false);

    useMemo(() => {
        getCurrentUser(setCurrentUser);
        getAllUsers(setAllUsers);
    }, [])

    useEffect(() => {
        getConnections(currentUser.userId, posts.userID, setIsConnected);
    }, [currentUser.userId, posts.userId])

    const getUserImage = (userId) => {
        const user = allUsers.find(user => user.id === userId);
        return user?.imageLink || "";
    };


    const isPostVisible = isConnected || currentUser.userId === posts.userID;

    return isPostVisible ? (
        <div className='post-card' key={posts.id}>
            <div className="post-image-wrapper">
                {currentUser.userId === posts.userID ? (
                    <div className='action-container'>
                        <BsPencil size={20} className='action-icon' onClick={() => getEditData(posts)} />
                        <BsTrash size={20} className='action-icon' onClick={() => deletePost(posts.id)} />
                    </div>
                ) : null}
                <img className='post-image' src={getUserImage(posts.userID)} alt="profile-image" />
                <div>
                    <p
                        className='name'
                        onClick={() => navigate("/profile")}>
                        {posts.userName}
                    </p>
                    <p className='timestamp'>{posts.timeStamp}</p>
                </div>
            </div>
            {posts.postImage ? <img src={posts.postImage} alt="post-image" /> : <></>}
            <p className='status'>{posts.status}</p>
            <LikeButton currentUser={currentUser} userId={currentUser?.userId} postId={posts.id} />
        </div>
    ) : null;
}
export default PostCard;