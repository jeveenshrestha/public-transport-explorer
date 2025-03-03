import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './pages/home/Home';
import Nav from './components/nav/Nav';

const App: React.FC = () => {
  return (
    <Router>
      <Nav />
      <Container className="mt-4">
        {/* <h3 className="text-center mb-4">HSL Public Transport Explorer</h3> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
