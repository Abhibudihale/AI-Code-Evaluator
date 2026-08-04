import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';
import './styles/app.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light-subtle">
      <Navbar />
      <main className="flex-grow-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
