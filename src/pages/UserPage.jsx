import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../data/firebase";

export const UserPage = () => {
    const { user, signout } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [userTweets, setUserTweets] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            fetchUserData();
            fetchUserTweets();
        }
    }, [user, navigate]);

    const fetchUserData = async () => {
        try {
            const userCollection = collection(db, 'Users');
            const q = query(userCollection, where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setUserData(querySnapshot.docs[0].data());
            } else {
                console.error("No user data found.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const fetchUserTweets = async () => {
        try {
            const tweetCollection = collection(db, 'Tweets');
            const q = query(tweetCollection, where("userId", "==", user.uid));
            const tweetSnapshot = await getDocs(q);
            const tweetList = tweetSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserTweets(tweetList);
        } catch (error) {
            console.error("Error fetching user tweets:", error);
        }
    };

    const handleSignout = async () => {
        try {
            await signout();
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    const handleTweet = () => {
        navigate('/tweet');
    };

    const handleHome = () => {
        navigate('/home');
    };

    const handleDeleteTweet = async (tweetId) => {
        try {
            const tweetRef = doc(db, 'Tweets', tweetId);
            await deleteDoc(tweetRef);
            setUserTweets(userTweets.filter(tweet => tweet.id !== tweetId)); 
        } catch (error) {
            console.error("Error deleting tweet:", error);
        }
    };

    return (
        <>
            {/* Botones */}
            <div className="fixed flex md:flex-col md:justify-center md:-top-[10px] md:h-screen md:-ml-0 md:w-auto justify-evenly items-center h-[60px] w-screen bottom-1 -ml-8 lg:left-10">
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] hidden md:flex rounded-full justify-center items-center hover:bg-[#1B1B1B]">
                    <button onClick={handleHome} className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] rounded-full">
                        <img src="src/assets/twitter-logo.png" alt="Twitter logo" />
                    </button>
                </div>
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full flex justify-center items-center hover:bg-[#1B1B1B]">
                    <button onClick={handleHome} className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] rounded-full">
                        <img src="src/assets/home-icon.png" alt="Home icon" />
                    </button>
                </div>
                {/* Otros botones */}
                <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full flex justify-center items-center hover:bg-[#1B1B1B]">
                    <button className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] rounded-full">
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

            {/* Caja de Perfil */}
            <div className="border border-[#2F3336] md:flex md:fixed md:flex-col md:left-[128px] md:-mt-1 md:py-10 md:pl-10 md:border md:border-[#2F3336] md:w-5/6 lg:px-20">
                {user ? (
                    <div className="flex py-2 pl-5 md:flex md:w-screen md:-mt-6 md:ml-20 md:py-3 md:pl-7">
                        <img className="w-[80px] h-[80px] md:w-[80px] md:h-[80px] rounded-full md:-ml-24" 
                            src={user.photoURL || 'src/assets/default-profile.png'} 
                            alt="Profile" />
                        <div className="md:flex-col">
                            <h2 className="text-white text-[30px] font-bold ml-10 md:ml-10">
                                {user.displayName || "Sin Usuario"}
                            </h2>
                            <h4 className="text-gray-600 text-[18px] font-medium -mr md:-mr-16">
                                {user.email}
                            </h4>
                        </div>
                    </div>
                ) : (
                    <p>Cargando perfil...</p>
                )}
            </div>

            {/* Botón Post */}
            <div className="fixed md:left-8 md:top-[600px] md:hidden flex justify-center items-center rounded-full w-[65px] h-[65px] bottom-[100px] right-[40px] hover:bg-[#1A8CD8] bg-cyan-500">
                <button onClick={handleTweet} className="w-[30px] h-[30px] rounded-full">
                    <img src="src/assets/post-icon.png" alt="Post icon" />
                </button>
            </div>

            {/* Caja de Tweets */}
            <div className="flex flex-col left-28 mx-auto mt-20 py-10 pl-10 border border-[#2F3336] w-6/6 px-20 md:flex md:flex-col md:left-[70px] md:ml-24 md:mt-[200px] md:py-10 md:pl-10 md:border md:border-[#2F3336] md:w-5/6 lg:px-20">
                {userTweets.length > 0 ? (
                    userTweets.map((tweet) => (
                        <div key={tweet.id} className="p-4 border-b border-gray-300">
                            <div className="flex justify-between">
                                <img className="w-[40px] h-[40px] md:w-[40px] md:h-[40px] rounded-full" 
                                    src={user.photoURL || 'src/assets/default-profile.png'} 
                                    alt="Profile" />
                                
                                <div className="">
                                    <h3 className="text-white text-[20px] font-bold">
                                        {user.displayName || "Sin Usuario"}
                                    </h3>
                                    <h4 className="text-gray-600 text-[18px] font-medium">
                                        {user.email || 'Email no disponible'}
                                    </h4>
                                </div>
                                <button 
                                    onClick={() => handleDeleteTweet(tweet.id)}
                                    className="text-red-500 hover:text-red-700 ml-4"
                                >
                                    Eliminar
                                </button>
                            </div>
                            <p className="text-white flex justify-center">{tweet.content}</p>
                            <span className="text-gray-500 text-sm">
                                {tweet.createdAt ? new Date(tweet.createdAt.seconds * 1000).toLocaleString() : 'Fecha no disponible'}
                            </span>
                        </div>
                    ))
                ) : (
                    <p>No hay tweets para mostrar.</p>
                )}
            </div>
        </>
    );
};
