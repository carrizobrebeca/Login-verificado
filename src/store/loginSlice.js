
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3001/login`, userData);

      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error de autenticación');
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
      cookie: localStorage.getItem('cookie') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },updatePrivacy: (state, action) => {
  if (state.user) {
    state.user.isPrivate = action.payload;
    localStorage.setItem('user', JSON.stringify(state.user));
  }
}
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        alert('Inicio de sesión exitoso');
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error al iniciar sesión';
      
      });
  },
});

export const { logout, updatePrivacy  } = loginSlice.actions;
export default loginSlice.reducer;

