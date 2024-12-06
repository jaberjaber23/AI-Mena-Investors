import Dashboard from './ClientPage';
import { db } from '../lib/firebase';
import { collection, getDocs, onSnapshot, Timestamp } from 'firebase/firestore';
import { Angel } from '../types'; // Assuming this is the path to your types
import { use } from 'react';

function useFirestoreCollection() {
  return use(
    new Promise<Angel[]>((resolve) => {
      const collectionRef = collection(db, 'angels');

      // Initial fetch
      getDocs(collectionRef).then((querySnapshot) => {
        const initialData: Angel[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: parseInt(doc.id), // Convert Firestore doc ID to number
            name: data.name || '',
            email: data.email || null,
            company: data.company || null,
            title: data.title || null,
            checkSize: data.checkSize || null,
            details: data.details || null,
            twitterPicture: data.twitterPicture || null,
            site: data.site || null,
            twitterVerified: data.twitterVerified || false,
            hidden: data.hidden || false,
            rank: data.rank || undefined,
            createdAt: data.createdAt instanceof Timestamp 
              ? data.createdAt.toDate() 
              : new Date(),
            updatedAt: data.updatedAt instanceof Timestamp 
              ? data.updatedAt.toDate() 
              : new Date(),
            checksize: data.checksize || null,
            checksize_id: data.checksize_id || null,
            checksize_label: data.checksize_label || '',
            linkedin: doc.data().linkedin || ''
          };
        });

        // Set up real-time listener
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
          const updatedData: Angel[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: parseInt(doc.id), // Convert Firestore doc ID to number
              name: data.name || '',
              email: data.email || null,
              company: data.company || null,
              title: data.title || null,
              checkSize: data.checkSize || null,
              details: data.details || null,
              twitterPicture: data.twitterPicture || null,
              site: data.site || null,
              twitterVerified: data.twitterVerified || false,
              hidden: data.hidden || false,
              rank: data.rank || undefined,
              createdAt: data.createdAt instanceof Timestamp 
                ? data.createdAt.toDate() 
                : new Date(),
              updatedAt: data.updatedAt instanceof Timestamp 
                ? data.updatedAt.toDate() 
                : new Date(),
              checksize: data.checksize || null,
              checksize_id: data.checksize_id || null,
              checksize_label: data.checksize_label || '',
              linkedin: doc.data().linkedin || ''
            };
          });

          resolve(updatedData);
        }, (error) => {
          console.error('Error fetching angels:', error);
          resolve([]);
        });

        // Return initial data
        resolve(initialData);

        // Return unsubscribe function to clean up listener
        return () => unsubscribe();
      });
    })
  );
}

export default function HomePage() {
  const data = useFirestoreCollection();

  return <Dashboard data={data} />;
}