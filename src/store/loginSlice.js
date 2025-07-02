import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchLogin = createAsyncThunk(
  'login/fetchLogin',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        userData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error de autenticación');
    }
  }
);

export const fetchSession = createAsyncThunk(
  "login/fetchSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/session", {
        withCredentials: true, // enviar cookies
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "No autorizado");
    }
  }
);


const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
    },
    updatePrivacy: (state, action) => {
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
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        alert('Inicio de sesión exitoso');
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error al iniciar sesión';
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.status = "succeeded";
    })
    .addCase(fetchSession.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      state.status = "idle";
    });
  },
});

export const { logout, updatePrivacy } = loginSlice.actions;
export default loginSlice.reducer;
