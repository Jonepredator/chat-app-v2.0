import { signInWithRedirect } from '@firebase/auth';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { auth, googleProvider } from '../firebase';
import logo from '../assets/chatUp_logo_2.png';



function Login() {

   return (
      <LoginContainer>
         <LoginInnerContainer>

            <h1>
               Welcome to
            </h1>
            <img
               src={logo} alt=""
            />
            <Button
               type='submit'
               onClick={() => signInWithRedirect(auth, googleProvider)}
            >
               Sign in with Google
            </Button>
         </LoginInnerContainer>
      </LoginContainer>
   );
}

export default Login;

const LoginContainer = styled.div`
   background-color: #f1f1f1;
   height: 100vh;
   display: grid;
   place-items: center
`;
const LoginInnerContainer = styled.div`
   display: flex;
   flex-direction: column;
   padding: 60px 100px;
   text-align: center;
   background-color: white;
   border-radius: 10px;
   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
   
   >  h1 {
      margin-bottom: 40px;
   }
   >  img {
      object-fit: contain;
      height: 200px;
   }
   >  button {
      margin-top: 40px;
      text-transform: inherit !important;
      background-color: #0a8d48 !important;
      color: white;
   }

   @media (max-width: 768px) {
    padding: 20px 40px;
  }
`;