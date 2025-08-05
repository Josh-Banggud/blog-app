import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Blog from '../pages/Blog';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/profile" element={<Profile />} />
      <Route path="/auth/login" element={<Auth />} />
      <Route path="/auth/signup" element={<Auth />} />
    </Routes>
  );
}
