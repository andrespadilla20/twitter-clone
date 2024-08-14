import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; 

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { MainPage } from './pages/MainPage';
import { TweetPage } from './pages/TweetPage';
import { HomePage } from './pages/HomePage';
import { AuthProvider } from './context/authContext'; 
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserPage } from './pages/UserPage';
import { TweetProvider } from './context/TweetContext';

function App() {
  return (
    <AuthProvider>
      <TweetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route path="/tweet" element={<TweetPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Router>
      </TweetProvider>
    </AuthProvider>
  );
}

export default App;
