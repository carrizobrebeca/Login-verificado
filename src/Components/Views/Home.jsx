import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/loginSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
   const navigate = useNavigate();
    const { status, token, cookie, user } = useSelector((state) => state.login);
useEffect(() => {
  if (!user || !token) {
    navigate('/');
  }
}, [user, token, navigate]);
    
      const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };


  return (
    <div>
      <h1>Home</h1>
      <h2>{ user?.name }</h2>
      <button onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Home
