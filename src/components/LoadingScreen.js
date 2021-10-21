import logo from '../assets/chatUp_logo_2.png';
import Spinner from 'react-spinkit';
import styled from 'styled-components';

const LoadingScreen = () => {
   return (
      <AppLoading>
         <AppLoadingContent>
            <img
               src={logo}
               alt='logo'
            />

            <Spinner
               name='ball-spin-fade-loader'
               color='#8B0D32'
               fadeIn='none'
            />
         </AppLoadingContent>
      </AppLoading>
   );
};

export default LoadingScreen;

const AppLoading = styled.div`
   display: grid;
   place-items: center;
   height: 100vh;
   width: 100%;
`;
const AppLoadingContent = styled.div`
   text-align: center;
   padding-bottom: 100px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   >  img {
      height: 100px;
      padding: 20px;
      margin-bottom: 40px;
   }
`;


