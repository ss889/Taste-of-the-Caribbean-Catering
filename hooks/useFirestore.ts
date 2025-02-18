// hooks/useFirestore.js
import { useEffect, useState } from 'react';
import { db } from '../firebase'; // Adjust according to your Firebase configuration
import { collection, getDocs, Firestore } from 'firebase/firestore';

const useFirestore = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const colRef = collection(db, collectionName);
                const querySnapshot = await getDocs(collection(db, collectionName));
                const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(dataList);
            } catch (error) {
                console.error("Error fetching data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionName]);

    return { data, loading };
};

export default useFirestore;
