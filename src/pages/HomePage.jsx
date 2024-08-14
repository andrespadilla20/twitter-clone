import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../data/firebase";

export const HomePage = () => {
    const { user, signout } = useAuth();
    const navigate = useNavigate();
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            fetchTweets();
        }
    }, [user, navigate]);

    const fetchTweets = async () => {
        try {
            const tweetCollection = collection(db, 'Tweets');
            const q = query(tweetCollection, where("userId", "==", user.uid)); 
            const tweetSnapshot = await getDocs(q);
            const tweetList = tweetSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetList);
        } catch (error) {
            console.error("Error fetching tweets:", error);
        }
    };

    const handleDeleteTweet = async (tweetId) => {
        try {
            const tweetRef = doc(db, 'Tweets', tweetId);
            await deleteDoc(tweetRef);
            setTweets(tweets.filter(tweet => tweet.id !== tweetId)); 
        } catch (error) {
            console.error("Error deleting tweet:", error);
        }
    };

    const handleSignout = async () => {
        try {
            await signout();
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleTweet = () => {
        navigate('/tweet');
    };

    const handleUser = () => {
        navigate('/user');
    };

    return (
        <>
            {/* Botones */}
            <div className="fixed flex md:flex-col md:justify-center md:-top-[10px] md:h-screen md:-ml-0 md:w-auto justify-evenly items-center h-[60px] w-screen bottom-1 -ml-8 lg:left-10">
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] hidden md:flex rounded-full justify-center items-center hover:bg-[#1B1B1B]">
                    <button className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] rounded-full">
                        <img src="src/assets/twitter-logo.png" alt="Twitter logo" />
                    </button>
                </div>
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full flex justify-center items-center hover:bg-[#1B1B1B]">
                    <button className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] rounded-full">
                        <img src="src/assets/home-icon.png" alt="Home icon" />
                    </button>
                </div>
                {/* Otros botones */}
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full flex justify-center items-center hover:bg-[#1B1B1B]">
                    <button onClick={handleUser} className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] rounded-full">
                        <img src="src/assets/profile-unselected-icon.png" alt="Profile icon" />
                    </button>
                </div>
                <div className="md:w-[60px] md:h-[60px] md:rounded-full flex justify-center items-center w-[40px] h-[40px] md:flex md:justify-center md:items-center md:hover:bg-[#1B1B1B]">
                    <button onClick={handleSignout} className="w-[20px] h-[20px] rounded-full md:w-[30px] md:h-[30px] md:rounded-full">
                        <img src="src/assets/signout-icon.png" alt="Sign out icon" />
                    </button>
                </div>
                <div className="md:w-[65px] md:h-[65px] md:rounded-full hidden md:flex md:justify-center md:items-center md:mt-12 md:hover:bg-[#1A8CD8] bg-cyan-500">
                    <button onClick={handleTweet} className="md:w-[30px] md:h-[30px] md:rounded-full">
                        <img src="src/assets/post-icon.png" alt="Post icon" />
                    </button>
                </div>
            </div>

            {/* Logo de X */}
            <div className="fixed md:hidden top-4 w-[30px] h-[30px] -ml-4 left-1/2">
                <img src="src/assets/twitter-logo.png" alt="Twitter logo" />
            </div>

            {/* Para ti y Siguiendo */}
            <h1>Bienvenido, {user.email}</h1>
            <div className="fixed md:flex">
                <div className="fixed h-[53px] flex justify-around md:justify-center md:left-[160px] md:-top-12 md:w-10/12 w-screen mt-12 -ml-8 md:border md:border-[#2F3336] md:pl-0">
                    <div className="hover:bg-[#1B1B1B] flex justify-center w-screen md:w-3/6">
                        <button className="text-white font-bold">Para ti</button>
                    </div>
                    <div className="hover:bg-[#1B1B1B] flex justify-center w-screen md:w-3/6">
                        <button className="text-white font-bold">Siguiendo</button>
                    </div>
                </div>
            </div>

            {/* Botón Post */}
            <div className="fixed md:left-8 md:top-[600px] md:hidden flex justify-center items-center rounded-full w-[65px] h-[65px] bottom-[100px] right-[40px] hover:bg-[#1A8CD8] bg-cyan-500">
                <button onClick={handleTweet} className="w-[30px] h-[30px] rounded-full">
                    <img src="src/assets/post-icon.png" alt="Post icon" />
                </button>
            </div>

            {/* Caja de Tweets */}
            <div className="flex flex-col left-28 mx-auto -top-24 py-10 pl-10 border border-[#2F3336] w-6/6 px-20 md:flex md:flex-col md:left-[70px] md:ml-24 md:mt-[200px] md:py-10 md:pl-10 md:border md:border-[#2F3336] md:w-5/6 lg:px-20">
                {tweets.length > 0 ? (
                    tweets.map((tweet) => (
                        <div key={tweet.id} className="p-4 border-b border-gray-300">
                            <div className="flex justify-between items-center">
                                <img className="w-[40px] h-[40px] md:w-[40px] md:h-[40px] rounded-full" src={user.photoURL || 'src/assets/default-profile.png'} alt="PFP" />
                                <div className="flex-grow ml-4">
                                    <h3 className="text-white text-[20px] font-bold">{user.displayName || 'Sin Usuario'}</h3>
                                    <h4 className="text-gray-600 text-[18px] font-medium">{user.email || 'Email no disponible'}</h4>
                                    <p className="text-white mt-2">{tweet.content}</p>
                                    <span className="text-gray-500 text-sm">
                                        {tweet.createdAt ? new Date(tweet.createdAt.seconds * 1000).toLocaleString() : 'Fecha no disponible'}
                                    </span>
                                </div>
                                <button onClick={() => handleDeleteTweet(tweet.id)} className="text-red-500 hover:text-red-700 ml-4">Eliminar</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay tweets para mostrar.</p>
                )}
            </div>
        </>
    );
};
