import { db } from '../firebaseConfig';
import {
    addDoc,
    collection,
    onSnapshot,
    doc,
    updateDoc,
    setDoc,
    deleteDoc,
    query,
    where
} from 'firebase/firestore';
import { toast } from 'react-toastify';


let postsRef = collection(db, "posts");
let userRef = collection(db, "users");
let likeRef = collection(db, "likes")
let commentsRef = collection(db, "comments");
let connectionRef = collection(db, "connections");



export const postStatus = (object) => {
    // console.log(object);
    addDoc(postsRef, object)
        .then(() => {
            toast.success("New post has been added successfully");
        })
        .catch(error => {
            console.log(error);
        })
}


export const getStatus = (setAllStatuses) => {
    onSnapshot(postsRef, (response) => {
        setAllStatuses(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        )
    })
}

export const getAllUsers = (setAllUsers) => {
    onSnapshot(userRef, (response) => {
        setAllUsers(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    });
};


//   ********************************************


export const getSingleStatus = (setAllStatus, id) => {
    
    const singlePostQuery = query(postsRef, where("userID", "==", id));
    onSnapshot(singlePostQuery, (response) => {
      setAllStatus(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
      );
    });
  };
  
  export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
      setCurrentUser(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id };
        })[0]
      );
    });
  };
  

//   ********************************************

export const postUserData = (object) => {
    addDoc(userRef, object)
        .then(() => { })
        .catch((err) => {
            console.log(err);
        })
}



export const getCurrentUser = (setCurrentUser) => {

    let currEmail = localStorage.getItem('userEmail')
    onSnapshot(userRef, (response) => {
        setCurrentUser(
            response.docs.map((docs) => {
                return { ...docs.data(), userId: docs.id };
            })
                .filter((Item) => {
                    return Item.email === currEmail
                })[0]
        )
    })
}





export const editProfile = (userId, payload) => {
    let userToEdit = doc(userRef, userId)
    updateDoc(userToEdit, payload)
        .then(() => {
            toast.success("Profile has been updated successfully");
        })
        .catch(error => {
            console.log(error);
        })
}

export const likePost = (userId, postId, liked) => {
    try {
        let docToLike = doc(likeRef, `${userId}_${postId}`);
        if (liked) {
            deleteDoc(docToLike);
        } else {
            setDoc(docToLike, { userId, postId });
        }
    } catch (err) {
        console.log(err);
    }
};


export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
    try {
        let likeQuery = query(likeRef, where("postId", "==", postId));
        onSnapshot(likeQuery, (response) => {
            let likes = response.docs.map((doc) => doc.data())
            // console.log(likes);
            let likesCount = likes.length;

            const isLiked = likes.some((like) => like.userId === userId)

            setLikesCount(likesCount);
            setLiked(isLiked);
        })
    }
    catch (err) {
        console.log(err);
    }
}






export const postComment = (postId, comment, timeStamp, name) => {
    try {
        addDoc(commentsRef, {
            postId,
            comment,
            timeStamp,
            name,
        });
    } catch (err) {
        console.log(err);
    }
};


export const getComments = (postId, setComments) => {
    try {
        let singlePostQuery = query(commentsRef, where("postId", "==", postId));

        onSnapshot(singlePostQuery, (response) => {
            const comments = response.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                };
            });

            setComments(comments);
        });
    } catch (err) {
        console.log(err);
    }
};



export const updatePost = (id, status, postImage) => {
    let docToUpdate = doc(postsRef, id);
    try {
        updateDoc(docToUpdate, { status, postImage });
        toast.success("Post has been updated!");
    } catch (err) {
        console.log(err);
    }
}


export const deletePost = (id) => {
    let docToDelete = doc(postsRef, id);
    try {
        deleteDoc(docToDelete);
        toast.success("Post has been Deleted!");
    } catch (err) {
        console.log(err);
    }
};




export const addConnection = (userId, targetId) => {
    try {
        let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);

        setDoc(connectionToAdd, { userId, targetId });

        toast.success("Connection Added!");
    } catch (err) {
        console.log(err);
    }
};



export const getConnections = (userId, targetId, setIsConnected) => {
    try {
        let connectionsQuery = query(
            connectionRef,
            where("targetId", "==", targetId)
        );

        onSnapshot(connectionsQuery, (response) => {
            let connections = response.docs.map((doc) => doc.data());
            const isConnected = connections.some(
                (connection) => connection.userId === userId
            );
            setIsConnected(isConnected);
        });
    } catch (err) {
        console.log(err);
    }
};
