import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//registrar un nuevo usuario
export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Verificar si el nombre de usuario ya existe
      const response = await axios.get("http://localhost:3001/users");
      const existente = response.data.find(
        (user) => user.userName === userData.userName
      );

      if (existente) {
        return rejectWithValue("El nombre de usuario ya está registrado, intente con otro");
      }

      // Crear el usuario
      const postResponse = await axios.post("http://localhost:3001/users", userData);
      return postResponse.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Error al registrar el usuario"
      );
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: null,
    status: "idle", // puede ser 'idle', 'loading', 'succeeded', o 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        alert("Usuario creado con éxito");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // alert("");
      })
      
    
  },
});

export default registerSlice.reducer;