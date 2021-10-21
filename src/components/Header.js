import React from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { auth } from '../firebase';
import { signOut } from '@firebase/auth';

function Header() {

   const loggedUser = auth.currentUser;

   return (
      <HeaderContainer>
         <HeaderLeft>
            <HeaderAvatar
               src={loggedUser.photoURL}
            // TODO: add onClick
            // src={user?.photUrl}
            />
            <AccessTimeIcon />
         </HeaderLeft>

         <HeaderSearch>
            <SearchIcon />
            <input
               placeholder='Search...'
               type="text" />
         </HeaderSearch>

         <HeaderRight>
            <PowerSettingsNewIcon onClick={() => signOut(auth)} />
         </HeaderRight>
      </HeaderContainer>
   );
}

export default Header;

const HeaderContainer = styled.div`
   display: flex;
   position: fixed;
   width: 100%;
   align-items: center;
   justify-content: space-between;
   padding: 10px 0;
   background-color: var(--slack-color);
   color: white;
   border-bottom: 1px solid #49274b;
`;

// Left
const HeaderLeft = styled.div`
   flex: 0.3;
   display: flex;
   align-items: center;
   margin-left: 20px;

   >  .MuiSvgIcon-root {
      margin-left: auto;
      margin-right: 30px;
   }
`;

const HeaderAvatar = styled(Avatar)`
   cursor: pointer;

   :hover {
      opacity: 0.8;
   }
`;

// Search
const HeaderSearch = styled.div`
   display: flex;
   padding: 0 50px;
   flex: 0.4;
   opacity: 1;
   border-radius: 6px;
   background-color: #421f44;
   text-align: center;
   color: gray;
   border: 1px gray solid;

   > input {
      background-color: transparent;
      border: none;
      text-align: center;
      min-width: 30vw;
      outline: none;
      color: white;
   }
`;

// Right
const HeaderRight = styled.div`
   flex: 0.3;
   display: flex;
   justify-content: flex-end;

   >  .MuiSvgIcon-root {
      margin-left: auto;
      margin-right: 20px;
      padding: 2px;
      border: 2px solid white;
      border-radius: 50px;
      cursor: pointer;

      :hover {
         transform: scale(105%)
      }
   }
`;