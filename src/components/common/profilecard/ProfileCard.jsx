// import React, { useState, useMemo, useEffect } from 'react';
// import './ProfileCard.scss';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../../../firebaseConfig';
// import { useNavigate } from 'react-router-dom';
// import PostCard from '../postcard/PostCard';
// import { getStatus } from '../../../api/FireStoreAPIs';
// import { HiOutlinePencil } from 'react-icons/hi';
// import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
// import FileUploadModal from '../FileUploadModal/FileUploadModal';
// import userIcon from '../../../assets/user-icon.png';


// const ProfileCard = ({ currentUser, onEdit }) => {

//   const [allStatuses, setAllStatuses] = useState([]);
//   const [currentProfile, setCurrentProfile] = useState({});
//   const [currentImage, setCurrentImage] = useState({});
//   const [modalOpen, setModalOpen] = useState(false);
//   const [progress, setProgress] = useState(0);


//   const getImage = (event) => {
//     setCurrentImage(event.target.files[0]);
//   }

//   const uploadImage = () => {
//     uploadImageAPI(
//       currentImage, currentUser?.userId, setModalOpen, setProgress, setCurrentImage
//     );
//     setCurrentImage({});
//   };


//   const navigate = useNavigate();
//   useEffect(() => {
//     onAuthStateChanged(auth, res => {
//       if (!res?.accessToken) {
//         navigate('/login');
//       }
//     })
//   }, [])


//   useMemo(() => {
//     if (location?.state?.id) {
//       getSingleStatus(setAllStatus, location?.state?.id);
//     }

//     if (location?.state?.email) {
//       getSingleUser(setCurrentProfile, location?.state?.email);
//     }
//   }, []);

//   useMemo(() => {
//     getStatus(setAllStatuses);
//   }, [])

//   return (
//     <>
//       <FileUploadModal
//         getImage={getImage}
//         uploadImage={uploadImage}
//         modalOpen={modalOpen}
//         setModalOpen={setModalOpen}
//         currentImage={currentImage}
//         progress={progress}
//       />
//       <div className='profile-card'>
//         <div className='edit-btn'>
//           <HiOutlinePencil style={{ cursor: 'pointer' }} onClick={onEdit}>Edit</HiOutlinePencil>
//         </div>
//         <div className='profile-info'>
//           <div>
//             <img
//               className='profile-image'
//               // src={currentUser ? currentUser.imageLink : userIcon}
//               src={
//                 Object.values(currentProfile).length === 0
//                   ? currentUser.imageLink
//                   : currentProfile?.imageLink
//               }
//               alt="profile-image"
//               onClick={() => setModalOpen(true)} />
//             <h3 className='username'>
//               {/* {currentUser.name} */}
//               {Object.values(currentProfile).length === 0
//                 ? currentUser.name
//                 : currentProfile?.name}
//             </h3>
//             <p className='userheadline'>
//               {/* {currentUser.headline} */}
//               {Object.values(currentProfile).length === 0
//                 ? currentUser.headline
//                 : currentProfile?.headline}
//             </p>
//             <p style={{ color: "gray", fontSize: "15px", marginTop: "10px" }} className='userheadline'>{currentUser.location}</p>
//           </div>
//         </div>
//       </div>

//       <div className='post-status-main'>
//         {allStatuses.filter((item) => {
//           return item.userEmail === localStorage.getItem("userEmail")
//         }).map((posts) => {
//           return (
//             <PostCard key={posts.id} posts={posts} />
//           )
//         })}
//       </div>

//     </>
//   );
// }

// export default ProfileCard;




















import React, { useState, useMemo} from 'react';
import './ProfileCard.scss';
import PostCard from '../postcard/PostCard';
import { uploadImage as uploadImageAPI } from "../../../api/ImageUpload";
import FileUploadModal from '../FileUploadModal/FileUploadModal';
import { getSingleStatus, getSingleUser } from '../../../api/FireStoreAPIs';
import { HiOutlinePencil } from "react-icons/hi";
import { useLocation } from "react-router-dom";

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };


  const uploadImage = () => {
    uploadImageAPI(
      currentImage, currentUser?.userId, setModalOpen, setProgress, setCurrentImage
    );
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  console.log(currentUser)


  return (
    <>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
        {currentUser.id === location?.state?.id ? (
          <div className="edit-btn">
            <HiOutlinePencil className="edit-icon" onClick={onEdit} />
          </div>
        ) : (
          <></>
        )}
        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt="profile-image"
            />
            <h3 className="userName">
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <p className="heading">
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            {(currentUser.location ) &&
            (currentProfile?.location) ? (
              <p className="location">
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.location}`
                  : `${currentProfile?.location}`}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>

      </div>
      <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
               <PostCard key={posts.id} posts={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
}













