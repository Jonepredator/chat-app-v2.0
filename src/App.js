import React, { useEffect, useState } from 'react';
import {
   BrowserRouter as Router,
   Switch,
   Route,
} from "react-router-dom";
import './App.css';
import styled from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import LoadingScreen from './components/LoadingScreen';

import { auth } from './firebase';
import { onAuthStateChanged } from '@firebase/auth';

function App() {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(false);

   onAuthStateChanged(auth, (loggedUser) => {
      if (loggedUser) {
         // signIn if session is initialized
         setUser(loggedUser);
      } else {
         //in case no session has been initialized
         setUser(null);
      }
   });

   //test: loading function
   useEffect(() => {
      setLoading(true);
      const timing = setTimeout(() => {
         setLoading(false);
      }, 3000);
      return () => clearTimeout(timing);
   }, []);



   return (
      <div className="app">
         <Router>
            {!user ? (
               <Login />
            ) : (
               <>
                  {loading && <LoadingScreen />}
                  <Header />
                  <AppBody>
                     <Sidebar />
                     <Switch>
                        <Route path="/" exact>
                           <Chat />
                        </Route>
                     </Switch>
                  </AppBody>
               </>
            )}
         </Router>
      </div>
   );
}

export default App;

const AppBody = styled.div`
   display: flex;
   height: 100vh;
`;