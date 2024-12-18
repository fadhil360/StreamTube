import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Display = ({setLoad}) => {
  const [documents, setDocuments] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
        try {
        const querySnapshot = await getDocs(collection(db, "users", setLoad, "video"));
        const docsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDocuments(docsArray);
      } catch (error) {
        console.error("Error getting documents: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  

  return (
    <div className="max-w-4xl w-full mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Video Anda</h2>
      <ul className="w-full border-2 p-5 border-gray-300 rounded-xl overflow-hidden">
        {/* Header Row */}
        <li className="flex flex-row justify-between rounded-xl bg-[#A10D00] text-white font-semibold px-4 py-2">
          <div className="w-1/2">Video</div>
          <div className="w-1/4">Views</div>
          <div className="w-1/4">Date</div>
        </li>

        {/* Data Rows */}
        {documents.map((doc) => (
          <li 
            key={doc.id} 
            className="flex flex-row justify-between items-center px-4 py-2 border-t border-gray-200 hover:bg-gray-50 transition"
          >
            <div className="w-1/2 truncate">{doc.title || doc.id}</div>
            <div className="w-1/4">{doc.watchcount || 0}</div>
            <div className="w-1/4">
              {doc.date
  ? doc.date.toDate().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) : 'N/A'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
