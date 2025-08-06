import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Blog from '../pages/Blog';
import Post from '../pages/Post';
import Drafts from '../pages/Drafts';
import Profile from '../pages/Profile';
import Auth from '../pages/Auth';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/create" element={<Post />} />
      <Route path="/post/create/list" element={<Drafts />} />
      <Route path="/post/:id" element={<Blog />} />
      <Route path="/auth/profile" element={<Profile />} />
      <Route path="/auth/login" element={<Auth />} />
      <Route path="/auth/signup" element={<Auth />} />
    </Routes>
  );
}
