import React, { useEffect, useState } from 'react';
import './Topbar.scss';
import logo from '../../../assets/logo.png';
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSearch,
} from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa'
import userIcon from '../../../assets/user.png';
import { useNavigate } from 'react-router-dom';
import ProfilePopUp from '../profilepopup/ProfilePopUp';
import SearchUser from '../SearchUser/SearchUser';
import { getAllUsers } from '../../../api/FireStoreAPIs';

import { useLocation } from 'react-router-dom';

const Topbar = ({ currentUser }) => {

  const location = useLocation();
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const displayPopup = () => {
    setPopupVisible(prevPopupVisible => !prevPopupVisible);
  };

  const goToRoute = route => {
    navigate(route);
  };


  const handleSearch = () => {
    if (searchInput !== "") {
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });

      setFilteredUsers(searched);
    } else {
      setFilteredUsers(users);
    }
  };


  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);


  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };


  useEffect(() => {
    getAllUsers(setUsers);
  })

  return (
    <div className="topbar-main">
      {popupVisible && (
        <div className="popup-position">
          <ProfilePopUp />
        </div>
      )}
      <img className="linkedinLogo" src={logo} alt="" />
      {
        isSearch ?
          <SearchUser
            setIsSearch={setIsSearch}
            setSearchInput={setSearchInput}
          />
          :
          <div className="react-icons">
            <AiOutlineSearch
              size={30}
              className="react-icon"
              onClick={() => setIsSearch(true)} />
            <AiOutlineHome
              size={30}
              className='react-icon'
              onClick={() => goToRoute('/')}
            />
            <AiOutlineUser
              size={30}
              className='react-icon'
              onClick={() => goToRoute('/profile')}
            />
            <FaUserFriends
              size={30}
              className='react-icon'
              onClick={() => goToRoute('/followers')}
            />
          </div>
      }
      <img className="user-icon" src={currentUser ? currentUser.imageLink : userIcon} onClick={displayPopup} alt="" />
      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {filteredUsers.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)}>
                <img src={user.imageLink} />
                <p className="name">{user.name}</p>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
};

export default Topbar;
