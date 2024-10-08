
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import twitter from "@assets/twitter-logo.png";
import back from "@assets/x-icon.png";







export const RegisterPage = () => {
    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate('/');
    }

    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState()
    const { signup } = useAuth()

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signup(user.email, user.password);
            navigate("/login");
        } catch (error) {
            
            
            setError(error.message);

        }}

        return (
            <>

                {error && <p>{error}</p>}
                <div className="md:flex md:flex-wrap md:items-center md:justify-center md:mx-auto md:fixed md:inset-0">
                    <div className="flex -ml-5 md:h-[600px] md:w-[600px] md:rounded-lg md:border ">
                        <button onClick={handleClickBack} className="text-white font-bold w-[50px] h-[50px] rounded-full bg-black hover:bg-slate-950 flex justify-center items-center"><img src={back} alt="" /></button>
                        <img className="w-[40px] h-[40px] mx-auto mt-10" src={twitter} alt="" />
                    </div>
                    <div className="md:fixed md:mx-auto md:mt-5">
                        <h1 className="text-[35px] text-gray-400 font-bold mb-10 mt-7">Crea tu Cuenta</h1>

                        <form onSubmit={handleSubmit} id="register-form" className="flex flex-col justify-center items-center">
                            <input id="register-email" name="email" onChange={handleChange} className="  bg-black border rounded h-[56px] w-[300px] text-white mb-6" placeholder="Correo Electrónico" type="email" required />
                            <input id="register-password" name="password" onChange={handleChange} className="  bg-black border rounded h-[56px] w-[300px] text-white mb-6" placeholder="Contraseña" type="password" required />

                            <div className="flex justify-center items-center mb-3">

                                <button type="submit" className="h-[40px] w-[300px] rounded-full bg-white hover:bg-gray-200 text-black font-bold flex justify-center items-center mb-3">Registrarse</button>
                            </div>
                        </form>










                    </div>
                </div>
            </>
        )
    }