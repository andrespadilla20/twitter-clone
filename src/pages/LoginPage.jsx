import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";



export const LoginPage = () => {
    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate('/');
    }

    const handleClickRegister = () => {
        navigate('/register')
    }


    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState()
    const { signin, loginWithGoogle } = useAuth()

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {

            await signin(user.email, user.password);
            navigate("/home", { replace: true });


        } catch (error) {

            setError(error.message);
        }

    }

    const handleGoogle = async () => {
        await loginWithGoogle();
        navigate('/home');
    }
    return (
        <>

            <div className="md:flex md:flex-wrap md:items-center md:justify-center md:mx-auto md:fixed md:inset-0">
                <div className="flex -ml-5 md:h-[600px] md:w-[600px] md:rounded-lg md:border ">
                    <button onClick={handleClickBack} className="text-white font-bold w-[50px] h-[50px] rounded-full bg-black hover:bg-slate-950 flex justify-center items-center"><img src="src/assets/x-icon.png" alt="" /></button>
                    <img className="w-[40px] h-[40px] mx-auto mt-10" src="src/assets/twitter-logo.png" alt="" />
                </div>
                <div className="md:fixed md:mx-auto md:mt-5">
                    <h1 className="text-[35px] text-gray-400 font-bold mb-10 mt-7">Inicia sesión en X</h1>
                    <div className="flex justify-center items-center mb-4">

                        <button onClick={handleGoogle} className="h-[40px] w-[300px] rounded-full bg-white hover:bg-gray-200 text-black font-bold flex justify-center items-center mb-3"><img className="w-[17px] h-[17px] -ml-4 mt-1 mr-1" src="src/assets/google-logo.png" alt="" />Entrar con Google</button>
                    </div>
                    

                    <p className="text-white flex justify-center items-center mb-5">o</p>
                    <form onSubmit={handleSubmit} id="login-form" className="flex flex-col justify-center items-center">
                        <input onChange={handleChange} id="login-email" name="email" className="bg-black border rounded h-[56px] w-[300px]  text-white mb-6" placeholder="Email" type="email" required />
                        <input onChange={handleChange} id="login-password" name="password" className="bg-black border rounded h-[56px] w-[300px] text-white mb-6" placeholder="Contraseña" type="password" required />
                        <div className="flex justify-center items-center mb-3">
                            <button type="submit" className="h-[40px] w-[300px] rounded-full bg-white hover:bg-gray-200 text-black font-bold flex justify-center items-center mb-3">Iniciar Sesión</button>

                        </div>
                    </form>


                    <p className="text-gray-400 flex justify-center items-center">No tienes una cuenta?<button onClick={handleClickRegister} className="text-blue-500">Registrate.</button></p>

                </div>
            </div>
        </>
    )
}