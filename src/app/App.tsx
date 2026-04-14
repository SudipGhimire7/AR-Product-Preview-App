import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Toaster } from './components/ui/sonner';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import ARCamera from './components/ARCamera';
import Wishlist from './components/Wishlist';
import Profile from './components/Profile';
import RoomSnapshot from './components/RoomSnapshot';

export default function App() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  return (
    <BrowserRouter>
      <div className="size-full bg-background">
        <Routes>
          <Route
            path="/"
            element={
              hasSeenOnboarding ?
              <Navigate to="/home" replace /> :
              <Onboarding onComplete={() => setHasSeenOnboarding(true)} />
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/ar/:id" element={<ARCamera />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/snapshot/:id" element={<RoomSnapshot />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}
