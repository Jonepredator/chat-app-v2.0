import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import Message from './Message';
import { collection, doc, onSnapshot, orderBy, query } from '@firebase/firestore';
import { db } from '../firebase';

function Chat() {
   const bottomRef = useRef(null);
   const roomId = useSelector(selectRoomId);
   const [roomMessages, setRoomMessages] = useState([]);
   const [roomDetails, setRoomDetails] = useState('');

   useEffect(() => {
      if (roomId) {
         onSnapshot(
            doc(db, 'rooms', roomId),
            (snapshot) => setRoomDetails(snapshot.data().name),
         );
         onSnapshot(
            query(collection(db, 'rooms', roomId, 'messages'),
               orderBy('timestamp', 'asc')),
            (snapshot) => setRoomMessages(snapshot.docs)
         );
      }
   }, [roomId]);

   useEffect(() => {
      bottomRef.current?.scrollIntoView({
         behavior: 'smooth',
      });
   }, [roomMessages]);

   return (
      <ChatContainer>
         {roomDetails && roomMessages && (
            <>
               <Header>
                  <HeaderLeft>
                     <h4>
                        <strong>#{roomDetails}</strong>
                     </h4>
                     <StarBorderOutlinedIcon />
                  </HeaderLeft>
                  <HeaderRight>
                     <p>
                        <InfoOutlinedIcon /> Details
                     </p>
                  </HeaderRight>
               </Header>

               <ChatMessages>
                  {roomMessages.map((doc) => {
                     const { message, timestamp, user, userImage } = doc.data();

                     return (
                        <Message
                           key={doc.id}
                           message={message}
                           timestamp={timestamp}
                           user={user}
                           userImage={userImage}
                        />
                     );
                  })}
                  <ChatBottom ref={bottomRef} />
               </ChatMessages>


               <ChatInput
                  bottomRef={bottomRef}
                  channelName={roomDetails}
                  channelId={roomId}
               />
            </>
         )}
      </ChatContainer>
   );
}

export default Chat;

const ChatContainer = styled.div`
   flex: 0,7;
   flex-grow: 1;
   overflow-y: scroll;
   margin-top: 60px;
`;

const Header = styled.div`
   /* position: fixed; */
   display: flex;
   justify-content: space-between;
   padding: 20px;
   border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
   display: flex;
   align-items: center;

   >  h4 {
      display: flex;
      text-transform: lowercase;
      margin-right: 10px;
   }
   >  .MuiSvgIcon-root {
      margin-left: 10px;
      font-size: 18px;
   }
`;

const HeaderRight = styled.div`
   >  p {
      display: flex;
      align-items: center;
      font-size: 14px;
   }
   >  p > .MuiSvgIcon-root {
      margin-right: 5px !important;
      font-size: 16px;
   }
`;

const ChatMessages = styled.div`
   
`;
const ChatBottom = styled.div`
   padding-bottom: 100px;
`;