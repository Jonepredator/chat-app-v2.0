import styled from 'styled-components';
import { collection, addDoc } from "@firebase/firestore";
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';

function SidebarOption({ Icon, title, addChannelOption, id }) {
   const dispatch = useDispatch();

   const addChannel = async () => {
      const channelName = prompt('Please enter the channel name');
      if (channelName) {
         await addDoc(collection(db, 'rooms'), {
            name: channelName,
         });
      }
   };

   // const addChannel = async () => {
   //    const channelName = prompt('Please enter the channel name');
   //    const collectionRef = collection(db, 'rooms');
   //    const payload = { name: channelName };
   //    await addDoc(collectionRef, payload);
   // };

   const selectChannel = () => {
      if (id) {
         dispatch(
            enterRoom({
               roomId: id,
            })
         );
      }
   };

   return (
      <SidebarOptionContainer
         onClick={addChannelOption ? addChannel : selectChannel}
      >
         {Icon && <Icon fontSize='small' style={{ padding: 10 }} />}
         {Icon ? (
            <h3>{title}</h3>
         ) : (
            <SidebarOptionChannel>
               <span>#</span> {title}
            </SidebarOptionChannel>
         )}
      </SidebarOptionContainer>
   );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
   display: flex;
   font-size: 12px;
   align-items: center;
   padding-left: 2px;
   cursor: pointer;

   :hover {
      opacity: 0.9;
      /* background-color: #340e36; */
      background-color: #4f2330;
   }
   >  h3 {
      font-weight: 500;
   }
   >  h3 > span {
      padding: 15px;
   }
`;
const SidebarOptionChannel = styled.h3`
   padding: 10px 0;
   font-weight: 300;
`;