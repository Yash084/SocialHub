import React from 'react';
import './SearchUser.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
const SearchUser = ({setIsSearch, setSearchInput}) => {
  return (
   <div className='search-users'>
     <input 
     type="text" 
     placeholder='Search users...'
     onChange={(event)=>setSearchInput(event.target.value)} />
     <AiOutlineCloseCircle 
     className='close-icon'
      size={20}
     onClick={()=>{
      setIsSearch(false)
      setSearchInput("")
     }}/>
   </div>
  );
}

export default SearchUser;
