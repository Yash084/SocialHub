import React, { useMemo, useState } from 'react';
import './LikeButton.scss';
import { AiOutlineLike, AiOutlineHeart, AiFillHeart, AiOutlineComment, } from "react-icons/ai";
import { BiCommentDetail } from 'react-icons/bi';
import { likePost, getLikesByUser, getComments, postComment } from '../../../api/FireStoreAPIs';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment/moment';


const LikeButton = ({ userId, postId, currentUser }) => {

    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [showCommentBox, setShowCommentBox] = useState(false);


    const getCurrentTimeStamp = (timeFormat) => {
        return moment().format(timeFormat);
    }

    const handleLike = () => {
        likePost(userId, postId, liked);
    };

    const getComment = (event) => {
        setComment(event.target.value);
    };

    const addComment = () => {
        if (comment.trim() === "") {
            return;
        }
        postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
        setComment("");
    };

    // console.log(likesCount);

    useMemo(() => {
        getLikesByUser(userId, postId, setLiked, setLikesCount);
        getComments(postId, setComments);
    }, [userId, postId])


    return (
        <div className='like-container' >
            <p>{likesCount} liked this</p>
            <div className='hr-line'>
                <hr />
            </div>
            <div className='like-comment'>
                <div className='likes-comment-inner' onClick={handleLike}>
                    {!liked ? (
                        <AiOutlineHeart size={30} color="black" />
                    ) : (
                        <AiFillHeart size={30} color='#0a66c2' />
                    )}
                    <p className={liked ? 'blue' : 'black'}>like</p>
                </div>

                <div className="likes-comment-inner">
                    <div className={showCommentBox ? 'blue' : 'black'} style={{ display: "flex", alignItems: "center" }} onClick={() => setShowCommentBox(!showCommentBox)}>
                        <BiCommentDetail size={30}
                        />
                        <p className={showCommentBox ? 'blue' : 'black'}>Comments</p></div>
                </div>
            </div>
            {
                showCommentBox ?
                    <>
                        <div className='hr-line'>     <hr /></div>
                        <input
                            onChange={getComment}
                            type="text"
                            className='comment-input'
                            placeholder='Add a comment'
                            name='comment'
                            value={comment} />
                        <button onClick={addComment} className='add-comment-btn'>Add comment</button>

                        {comments.length > 0 ? (
                            comments.map((comment) => {
                                return (
                                    <div className="all-comments">
                                        <p className="name">{comment.name}</p>
                                        <p className="comment">{comment.comment}</p>
                                        <p className="timestamp">{comment.timeStamp}</p>
                                    </div>
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </>
                    :
                    <></>
            }
        </div>
    );
}

export default LikeButton;
