import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, query, where, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../data/firebase";
import back from "@assets/x-icon.png";
import twitter from "@assets/twitter-logo.png";
export const TweetPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tweetContent, setTweetContent] = useState("");
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchTweets();
        }
    }, [user, navigate]);

    const fetchTweets = async () => {
        if (!user) return;

        const tweetCollection = collection(db, 'Tweets');
        const q = query(tweetCollection, where("userId", "==", user.uid)); 
        const tweetList = tweetSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setTweets(tweetList);
    };

    const handleTweetChange = (e) => {
        setTweetContent(e.target.value);
    };

    const handleTweetSubmit = async (e) => {
        e.preventDefault();
        if (tweetContent.trim()) {
            const newTweet = {
                content: tweetContent,
                createdAt: Timestamp.fromDate(new Date()),
                userId: user.uid, 
                displayName: user.displayName || "Anonymous", 
                photoURL: user.photoURL || "default-photo-url", 
            };
            try {
                await addDoc(collection(db, 'Tweets'), newTweet); 
                setTweets([newTweet, ...tweets]); 
                setTweetContent(""); 
            } catch (error) {
                console.error("Error adding tweet: ", error);
            }
        }
    };

    const handleClickBack = () => {
        navigate('/home');
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

    return (
        <>
            {/* Caja de Post */}
            <button
                onClick={handleClickBack}
                className="text-white font-bold w-[50px] h-[50px] rounded-full bg-black hover:bg-slate-950 flex justify-center items-center"
            >
                <img src={back} alt="Back icon" />
            </button>
            <img
                className="w-[40px] h-[40px] mx-auto -mt-10"
                src={twitter}
                alt="Twitter logo"
            />
            <form
                onSubmit={handleTweetSubmit}
                className="flex fixed flex-col left-10 mt-10 py-10 pl-10 border border-[#2F3336] w-5/6 px-20"
            >
                <div className="flex w-screen ml-1 pr-10">
                    <img
                        className="w-[40px] h-[40px] rounded-full"
                        src={user?.photoURL || "default-photo-url"}
                        alt="PFP"
                    />
                    <textarea
                        value={tweetContent}
                        onChange={handleTweetChange}
                        className="bg-black text-white text-[30px] h-[52px] w-6/12 ml-4 -mt-2"
                        placeholder="¡Qué está pasando?!"
                    />
                </div>
                <div className="flex justify-center ml-20 w-screen mt-5">
                    <div className="flex justify-center w-1/12 -ml-20">
                        <button
                            className="text-white font-bold bg-[#1D9BF0] w-[95px] h-[35px] rounded-full hover:bg-[#1A8CD8]"
                            type="submit"
                        >
                            Postear
                        </button>
                    </div>
                </div>
            </form>

            {/* Caja del tweet */}
            <div className="hidden md:flex flex-col left-28 mx-auto mt-56 py-10 pl-10 border border-[#2F3336] w-6/6 px-20">
                <div>
                    {tweets.map((tweet) => (
                        <div key={tweet.id} className="-ml-8">
                            <div className="flex">
                                <img
                                    className="w-[40px] h-[40px] rounded-full"
                                    src={tweet.photoURL || "default-photo-url"}
                                    alt="PFP"
                                />
                                <div className="ml-2">
                                    <h3 className="text-white text-[20px] font-bold">
                                        {tweet.displayName || "Sin Usuario"}
                                    </h3>
                                    <p className="text-white">{tweet.content}</p>
                                    <span className="text-gray-500 text-sm">
                                        {tweet.createdAt.toDate().toLocaleString()}
                                    </span>
                                    <button
                                        onClick={() => handleDeleteTweet(tweet.id)}
                                        className="text-red-500 hover:text-red-700 ml-4"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
