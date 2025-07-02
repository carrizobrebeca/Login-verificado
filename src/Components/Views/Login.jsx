import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state.login);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [e, setE] = useState(false);
  const [state, setState] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    userName: "userName no puede estar vacío",
    password: "Password no puede estar vacía",
  });

  useEffect(() => {
    if (status === "failed") {
      setE(true);
    }
  }, [status]);
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
  const validate = (state, name) => {
    setErrors((prev) => ({
    ...prev,
    [name]: state[name] === "" ? `${name === "userName" ? "Nombre de usuario" : "Password"} no puede estar vacío` : "",
  }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
    validate({ ...state, [name]: value }, name);
  };
  const disable = () => {
    if (formSubmitted) return true;
    return Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(false);

    if (!disable()) {
      dispatch(fetchLogin(state))
        .unwrap()
        .then((response) => {
          localStorage.setItem('id', response.user.id);
        })

        .catch((err) => {
          console.error(err);
        });
    }
  };




  return (
    <div className="fixed top-0 left-0 flex justify-center items-center bg-gray-800 h-screen w-full ">
      <div className="flex items-center">
        <div className="w-[20rem] h-[30rem] flex flex-col items-center bg-red-400 rounded-xl">
          <form
            className="w-full h-full mb-4 flex items-center shadow-md bg-white font-momo rounded-xl"
            onSubmit={handleSubmit}
          >
            <div className="p-14">
              <div>
                <h2 className="pt-4 pb-4 font-bold text-red-400">Bienvenido</h2>
              </div>
              <div className="pb-4">
                <input
                  className="text-text text-lg w-full pl-4 pr-2 pt-2 pb-2 border-2 b-gray-200 rounded-xl"
                  type="text" placeholder="Usuario" onChange={handleChange}
                  name="userName"
                  id="userName"
                  required
                />
              </div>

              <div className="pb-4 relative">
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
              <div className="pt-4 pb-4 flex justify-center">
                <button type="submit" className="bg-red-400 rounded-xl text-white p-2">
                  Iniciar sesión
                </button>
              </div>
              {e && (
                <div className="flex justify-center">
                  <h2 className="text-red-400 white p-2 font-bold">
                    Error al iniciar sesión
                  </h2>
                </div>
              )}
            </div>
          </form>


          <div className="mt-2 pb-4">
            <button onClick={() => navigate("/register")} className="bg-red-400 rounded-xl text-white p-2 border-2 border-white">
              Registrarse
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Login;