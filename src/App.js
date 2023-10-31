// src/App.js
import React from 'react';
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import AccountPage from './AccountPage';
import { AuthProvider} from './AuthContext';
import AdminPanel from './panel';
import Content6 from './content6';
import SearchResult from './SearchResult';
import ProductPage from './ProductPage';
import Info from './info';
import Layout from './Layout';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout> <Content6 /></Layout>} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/accountPage" element={<AccountPage />} />
          <Route path="/panel" element={<AdminPanel />} />
          <Route path="/search-result" element={<Layout><SearchResult /></Layout>} />
          <Route path="/info" element={<Layout><Info /></Layout>} />
          <Route path="/product/:objectId" element={<Layout><ProductPage /></Layout>} />
       </Routes>
     </Router>
    </AuthProvider>
  );
}

export default App;