
import styled from 'styled-components';
import { Button } from '@mui/material';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { useState } from 'react';

function ChatInput({ channelName, channelId, bottomRef }) {
   const [message, setMessage] = useState('');

   const sendMessage = async (e) => {
      e.preventDefault();

      const loggedUser = auth.currentUser;

      if (!channelId) {
         return false;
      }
      const messageToSend = message;
      setMessage('');

      await addDoc(collection(db, 'rooms', channelId, 'messages'), {
         message: messageToSend,
         timestamp: serverTimestamp(),
         user: loggedUser.displayName,
         userImage: loggedUser.photoURL,
      });
      bottomRef.current.scrollIntoView({
         behavior: 'smooth'
      });
   };



   return (
      <ChatInputContainer>
         <form>
            <input
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder={`Message #${channelName}`}
            />
            <Button
               hidden
               type='submit'
               onClick={sendMessage}
            >
               SEND
            </Button>
         </form>
      </ChatInputContainer>
   );
}

export default ChatInput;

const ChatInputContainer = styled.div`
   border-radius: 20px;

   >  form {
      position: relative;
      display: flex;
      justify-content: center;
   }
   >  form > input {
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid gray;
      border-radius: 3px;
      padding: 20px;
      outline: none;
   }
   >  form > button {
      display: none !important;
   }
`;