
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/registerSlice";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.register)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [e, setE] = useState(false);
  const img = [
    {
      name: "image1",
      image: "https://i.pinimg.com/736x/7e/bd/57/7ebd57e7b9969dabe2144c40c1c4fba4.jpg",
    },
    {
      name: "image2",
      image: "https://i.pinimg.com/736x/f1/10/15/f11015d1bd559e91bad0a1dfece1fb3d.jpg",
    },
    {
      name: "image3",
      image: "https://i.pinimg.com/736x/df/70/c2/df70c2fe33203bf85077a26f28b28b4b.jpg",
    },
    {
      name: "image4",
      image: "https://i.pinimg.com/736x/a9/59/4e/a9594e83613fd5afd8be3d8bb7d6f609.jpg",
    },
    {
      name: "image5",
      image: "https://i.pinimg.com/736x/aa/d5/ea/aad5eadd596b819f7891d1e9e8a88c7b.jpg",
    },
    {
      name: "image6",
      image: "https://i.pinimg.com/736x/43/f9/e7/43f9e7dd67d893a8d8f537f38b01d86c.jpg",
    },
    {
      name: "image7",
      image: "https://i.pinimg.com/736x/db/e1/a4/dbe1a49a67735a3a79a73ac77e9ac870.jpg",
    },
    {
      name: "image8",
      image: "https://i.pinimg.com/736x/69/9a/6d/699a6d5d4acbd2d9dd93a775f491eeb8.jpg",
    },
  ]

  const [state, setState] = useState({
    name: "",
    userName: "",
    email: "",
    city: "",
    password: "",
    image: img[Math.floor(Math.random() * img.length)].image,

  });

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/login");
    }
  }, [status, navigate]);

  useEffect(() => {
    if (status === "failed" && error) {
      setE(true)
    }
  }, [status, error, e]);


  const [errors, setErrors] = useState({
    name: "*",
    userName: "*",
    email: "*",
    city: "*",
    password: "*",
    image: "*",
  });

  const validate = (state, name) => {
    if (name === "name") {
      if (state.nombre === "")
        setErrors({ ...errors, name: "Nombre no puede estar vacío" });
      else {
        setErrors({ ...errors, nombre: "" });
        return;
      }
    }

    if (name === "userName") {
      if (state.apellido === "")
        setErrors({ ...errors, userName: "Nombre de usuario no puede estar vacío" });

      else {
        setErrors({ ...errors, userName: "" });
        return;
      }
    }

    if (name === "email") {
      if (state.email === "")
        setErrors({ ...errors, email: "Email Formato de nombre inválido" });

      else {
        setErrors({ ...errors, email: "" });
        return;
      }
    }

    if (name === "password") {
      if (state.password === "")
        setErrors({ ...errors, password: "Contraseña no puede estar vacia" });

      else {
        setErrors({ ...errors, password: "" });
        return;
      }
    }
    if (name === "image") {
      if (state.image === "")
        setErrors((prev) => ({ ...prev, image: "Imagen requerida" }));
      else setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const random = img[Math.floor(Math.random() * img.length)].image;

    setState((prev) => ({
      ...prev,
      [name]:
        name === "image" && value.trim() === ""
          ? img[Math.floor(Math.random() * img.length)].image
          : value,
    }));

    validate(
      {
        ...state,
        [name]: name === "image" && value.trim() === "" ? random : value,
      },
      name
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const noImage = !state.image || state.image.trim() === "";

    const finalState = {
      ...state,
      image: noImage
        ? img[Math.floor(Math.random() * img.length)].image
        : state.image,
    };

    dispatch(registerUser(finalState))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  const disable = () => {
    if (formSubmitted) return true;
    return Object.values(errors).some((error) => error !== "");
  };
  const hasErrors = Object.values(errors).some((error) => error === "*");
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center bg-gray-800 h-screen w-full ">
      <div className="flex items-center">
        <div className="w-[20rem]  flex flex-col items-center bg-red-400 rounded-xl">
          <form
            className="w-full mb-4 flex items-center shadow-md bg-white font-momo rounded-xl"
            onSubmit={handleSubmit}
          >
            <div className="p-14">
              <div>
                <h2 className="pt-4 pb-4 font-bold text-red-400">Crear nueva cuenta</h2>
              </div><div className="pb-4">
                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type="text"
                  placeholder="Nombre y apellido"
                  required
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
              </div>
              <div className="pb-4">

                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="pb-4">

                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type="text"
                  placeholder="Nombre de usuario"
                  required
                  name="userName"
                  id="userName"
                  onChange={handleChange}
                />
              </div>
              <div className="pb-4 relative"> {/* <- AGREGÁ ESTO */}
                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  required
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 "
                >
                  <img
                    src={showPassword
                      ? "https://img.icons8.com/ios-filled/50/000000/visible.png"
                      : "https://img.icons8.com/ios-filled/50/000000/invisible.png"}
                    alt={showPassword ? "Show" : "Hide"}
                    className="w-5 h-5"
                  />
                </button>
              </div>
              <div className="pb-4">
                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type="text"
                  placeholder="Ciudad, Provincia, Pais"
                  required

                  name="city"
                  id="city"
                  onChange={handleChange}
                  pattern="^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+,\s[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+,\s[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$"
                  title="Debe seguir el formato: Ciudad, Provincia, País. Solo letras y espacios, separados por comas."
                />
              </div>
              <div className="bg-gray-100 rounded-xl">
               
                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type="text"
                  placeholder="Ingrese url de su foto"


                  name="image"
                  id="image"
                  onChange={handleChange}
                />
              </div>
              <img src={
                state.image?.trim() === ""
                  ? img[Math.floor(Math.random() * img.length)].image
                  : state.image
              } className='object-cover aspect-square rounded-full' alt="" />

              <div className="pt-4 pb-4 flex justify-center">
                <button type="submit" className="bg-red-400 rounded-xl text-white p-2">
                  Registrarse
                </button>
              </div>
 {e && (
 <div className="pt-4 pb-4 flex justify-center">
                <h2 className="text-red-400 white p-2 font-bold">
                  Error al crear usuario
                </h2>
              </div>
 )}
             
            </div>
          </form>

          {}
          <div className="mt-2 pb-4">
            <button onClick={() => navigate("/login")} className="bg-red-400 rounded-xl text-white p-2 border-2 border-white">
              Iniciar Sesion
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Register