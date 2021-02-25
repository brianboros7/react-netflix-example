import { useEffect, useState, useContext } from 'react';
import { FirebaseContextProvider } from '../context/firebase';

export default function useContent(target) {
    const [content, setContent] = useState([]);
    const { firebase } = useContext(FirebaseContextProvider);
    
    useEffect((firebase, target) => {
        firebase.firestore().collection(target).get().then((snapshot) => {
            const allContent = snapshot.docs.map((contentObj) => ({
                ...contentObj.data(),
                    docId: contentObj.id,
                }));
                
                setContent(allContent);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [firebase, target])
    
    return { [target]: content };
}