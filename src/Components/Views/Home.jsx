import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSession, logout } from '../../store/loginSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, user } = useSelector((state) => state.login);
console.log(user);

useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);
  useEffect(() => {
    if (!user ) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };



  return (
    <div>
      <h1>Home</h1>
      <h2>{user?.name}</h2>
      <button onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Home
