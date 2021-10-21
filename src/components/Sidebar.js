import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import CreateIcon from '@mui/icons-material/Create';
// import InsertCommentIcon from '@mui/icons-material/InsertComment';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import AppsIcon from '@mui/icons-material/Apps';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarOption from './SidebarOption';
import { auth, db } from '../firebase';
import { collection, onSnapshot } from '@firebase/firestore';


function Sidebar() {
   const [channels, setChannels] = useState([]);
   const loggedUser = auth.currentUser;

   // console.log(channels);

   useEffect(
      () =>
         onSnapshot(collection(db, 'rooms'), (snapshot) =>
            setChannels(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
         ),
      []
   );

   return (
      <SidebarContainer>
         <SidebarHeader>
            <SidebarInfo>
               <h2>User</h2>
               <h3>
                  <FiberManualRecordIcon />
                  {loggedUser.displayName}
               </h3>
            </SidebarInfo>
            {/* <CreateIcon /> */}
         </SidebarHeader>

         {/* <SidebarOption Icon={InsertCommentIcon} title='Threads' />
         <SidebarOption Icon={InboxIcon} title='Mentions & reactions' />
         <SidebarOption Icon={DraftsIcon} title='Saved items' />
         <SidebarOption Icon={BookmarkBorderIcon} title='Channel browser' />
         <SidebarOption Icon={PeopleAltIcon} title='People & user groups' />
         <SidebarOption Icon={AppsIcon} title='Apps' />
         <SidebarOption Icon={FileCopyIcon} title='File browser' />
         <SidebarOption Icon={ExpandLessIcon} title='Show less' />
         <hr /> */}
         <SidebarOption Icon={ExpandMoreIcon} title='Channels' />
         <hr />
         <SidebarOption Icon={AddIcon} addChannelOption title='Add Channel' />

         {channels?.map((channel) => (
            <SidebarOption
               key={channel.id}
               id={channel.id}
               title={channel.name}
            />
         ))}

      </SidebarContainer>
   );
}

export default Sidebar;

const SidebarContainer = styled.div`
   color: white;
   background-color: var(--slack-color);
   flex: 0.3;
   border-top: 1p solid #49274b;
   max-width: 260px;
   margin-top: 60px;

   >  hr {
      margin-top: 6px;
      margin-bottom: 10px;
      border: 1px solid #49274b;
   }
`;

const SidebarHeader = styled.div`
   display: flex;
   border-bottom: 1px solid #49274b;
   padding: 14px;

   >  .MuiSvgIcon-root {
      padding: 8px;
      color: #49274b;
      font-size: 18px;
      background-color: white;
      border-radius: 999px;
   }
`;

const SidebarInfo = styled.div`
   flex: 1;

   >  h2 {
      font-size: 15px;
      font-weight: 900;
      margin-bottom: 5px;
      margin-left: 2px;
   }
   >  h3 {
      display: flex;
      font-size: 13px;
      font-weight: 400;
      align-items: center;
      text-transform: capitalize;
   }
   >  h3 > .MuiSvgIcon-root {
      font-size: 14px;
      margin-top: 1px;
      margin-right: 2px;
      color: green;
   }
`;