import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FirebaseProvider } from '../context/firebaseContext';
import { ForgotPassword } from './Auth/ForgotPassword';
import { Login } from './Auth/Login';
import { Header } from './Header';
import { CreateLink } from './Link/CreateLink';
import { LinkDetail } from './Link/LinkDetail';
import { LinkList } from './Link/LinkList';
import { SearchLinks } from './Link/SearchLinks';


function App() {

  return (
    <Router>
      <FirebaseProvider>
        <div className="app-container">
          <Header />
          <div className="route-container">
            <Routes>
              <Route path="/"><Navigate to="/new/1" /></Route>
              <Route path="/create"><CreateLink /></Route>
              <Route path="/search"><SearchLinks /></Route>
              <Route path="/login"><Login /></Route>
              <Route path="/forgot"><ForgotPassword /></Route>
              <Route path="/top"><LinkList /></Route>
              <Route path="/new/:page"><LinkList /></Route>
              <Route path="/link/:linkId"><LinkDetail /></Route>
            </Routes>
          </div>
        </div>
      </FirebaseProvider>
    </Router>
  );
}

export default App;
