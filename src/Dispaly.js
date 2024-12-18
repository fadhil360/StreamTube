import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Import your Firebase config file
import { collection, getDocs } from 'firebase/firestore';

const Display = () => {
  const [documents, setDocuments] = useState([]); // State to store documents
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Get all documents from the Firestore collection
        const querySnapshot = await getDocs(collection(db, "users","NajrJFyow3UVUTxomku8wUjjYBT2","video"));
        
        // Map the documents to an array
        const docsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDocuments(docsArray); // Set the documents in state
      } catch (error) {
        console.error("Error getting documents: ", error);
      } finally {
        setLoading(false); // Set loading to false once documents are fetched
      }
    };

    fetchDocuments();
  }, []); // Empty dependency array, so it runs once after the first render

  if (loading) {
    return <p>Loading...</p>; // Display loading message while data is being fetched
  }

  return (
    <div>
      <h2>Documents</h2>
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <h3>{doc.id}</h3>
            <p>{JSON.stringify(doc)}</p> {/* Display document data */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Display;
