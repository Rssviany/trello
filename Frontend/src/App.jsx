import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import React, { useEffect } from 'react'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import InboxEditPanel from './components/InboxEditPanel'
import DashBoard from './components/DashBoard'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/UserSlice'
import Settings from './pages/Settings'
import ProtectedRoute from './route/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    } else {
      dispatch(setUser(null)); 
    }
  }, []);


  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
