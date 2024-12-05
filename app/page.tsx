import Dashboard from './ClientPage';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { cache } from 'react';
import { Angel } from '../types';

const getAllAngels = cache(async () => {
  const querySnapshot = await getDocs(collection(db, 'angels'));
  const data: Angel[] = querySnapshot.docs.map((doc, index) => ({
    id: index, // Use index as id since type is now number
    name: doc.data().name || '',
    createdAt: doc.data().createdAt || new Date(),
    updatedAt: doc.data().updatedAt || new Date(),
    checksize_label: doc.data().checksize_label || '',
    checkSize: doc.data().checkSize || 'Small',
    company: doc.data().company || '',
    hidden: doc.data().hidden || false,
    twitterPicture: doc.data().twitterPicture || '',
    details: doc.data().details || '',
    site: doc.data().site || '',
    twitterVerified: doc.data().twitterVerified || false,
    email: doc.data().email || '',
    rank: doc.data().rank || 3,
    linkedin: doc.data().linkedin || ''
  }));
  return data;
});

export default async function HomePage() {
  const data = await getAllAngels();

  return <Dashboard data={data} />;
}