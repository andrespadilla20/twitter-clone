import React, { createContext, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../data/firebase'; 

export const TweetContext = createContext();

export const TweetProvider = ({ children }) => {
    const [tweets, setTweets] = useState([]);

    // Función para obtener tweets de Firestore
    const fetchTweets = async () => {
        try {
            const tweetCollection = collection(db, 'Tweets');
            const tweetSnapshot = await getDocs(tweetCollection);
            const tweetList = tweetSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetList);
        } catch (error) {
            console.error("Error fetching tweets:", error);
        }
    };

    // Función para agregar un tweet a Firestore
    const addTweet = async (tweetContent) => {
        try {
            const tweetCollection = collection(db, 'Tweets');
            await addDoc(tweetCollection, {
                content: tweetContent,
                createdAt: new Date(),
                // Añadir otros campos si es necesario
            });
            // Actualizar los tweets después de agregar uno nuevo
            fetchTweets();
        } catch (error) {
            console.error("Error adding tweet:", error);
        }
    };

    // Usar onSnapshot para escuchar actualizaciones en tiempo real
    useEffect(() => {
        const tweetCollection = collection(db, 'Tweets');
        const unsubscribe = onSnapshot(tweetCollection, (snapshot) => {
            const tweetList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTweets(tweetList);
        });

        // Limpiar la suscripción cuando el componente se desmonte
        return () => unsubscribe();
    }, []);

    return (
        <TweetContext.Provider value={{ tweets, addTweet }}>
            {children}
        </TweetContext.Provider>
    );
};
