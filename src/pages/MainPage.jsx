import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";



export const MainPage = () => {

    const navigate = useNavigate();
    const { loginWithGoogle } = useAuth()
    const handleClickLogin = () => {
        navigate('/login');
    }

    const handleClickRegister = () => {
        navigate('/register');
    }

    const handleGoogle = async () => {
        await loginWithGoogle();
        navigate('/home');
    }
    return (
        <>
            <div className="2xl:flex xl:flex lg:flex md:flex -ml-[80px] ">
                <div className="2xl:w-[336px] 2xl:h-[303px] xl:h-[300px] xl:w-[300px] lg:w-[240px] lg:h-[240px] md:w-[240px] md:h-[200px] h-[100px] w-[100px] 2xl:mt-40 xl:mt-40  2xl:ml-7 xl:ml-7 lg:ml-7 ml-32 md:mt-52">
                    <img className="lg:mt-16" src="src/assets/twitter-logo.png" alt="" />
                </div>
                <div className="bg-black min-h-screen text-gray-400 ml-32">
                    <p className="text-[60px] font-bold text-left mb-16">Lo que está<br /> pasando ahora</p>
                    <p className="text-[30px] font-bold text-left mb-10">Únete Hoy</p>
                    <div className="">

                        <button onClick={handleGoogle} className="h-[40px] w-[300px] rounded-full bg-white hover:bg-gray-200 text-black font-bold flex justify-center items-center mb-3"><img className="w-[17px] h-[17px] -ml-4 mt-1 mr-1" src="src/assets/google-logo.png" alt="" />Entrar con Google</button>
                    </div>
                    <div>
                        <button className="h-[40px] w-[300px] rounded-full bg-white hover:bg-gray-200 text-black font-bold flex justify-center items-center"><img className="w-[17px] h-[17px] -ml-4 mt-1 mr-1" src="src/assets/apple-logo.png" alt="" />Entrar con Apple</button>
                    </div>
                    <p className="flex justify-center w-[315px]">o</p>
                    <div>
                        <button onClick={handleClickRegister} className="h-[40px] w-[300px] rounded-full bg-sky-400 hover:bg-sky-600 text-white font-bold flex justify-center items-center">Crear Cuenta</button>
                    </div>

                    <p className="text-[12px] text-left text-gray-400 pt-3">Al registrarte, aceptas los <a className="text-sky-400" href="https://x.com/es/tos">Términos de servicio</a> y la <a className="text-sky-400" href="https://x.com/es/privacy">Política<br /> de privacidad</a>, incluida la política de <a className="text-sky-400" href="https://help.x.com/es/rules-and-policies/x-cookies">Uso de Cookies</a>.</p>

                    <p className="text-[20px] font-bold text-left mt-10">¿Ya tienes una cuenta?</p>
                    <div className="mt-5">
                        <button onClick={handleClickLogin} className="h-[40px] w-[300px] rounded-full border bg-black hover:bg-slate-900 text-sky-400 font-bold flex justify-center items-center">Iniciar sesión</button>
                    </div>
                </div>

            </div>
        </>
    )
}