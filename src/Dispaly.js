'use client'

import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Display = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", "NajrJFyow3UVUTxomku8wUjjYBT2", "video")
        );

        const docsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().name || "No Title",
          views: doc.data().watchcount || 0,
          date: doc.data().date
            ? doc.data().date.toDate().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : 'N/A',
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
        <div className="animate-pulse bg-gray-200 w-[800px] h-[400px] rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl w-full mx-auto mt-auto bg-white shadow-lg rounded-lg">
      {/* Header */}
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold text-[#00000]">Video Anda</h2>
      </div>

      {/* Table */}
      <div className="p-6">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#A10D00] text-white">
              <th className="px-4 py-2 border">Video</th>
              <th className="px-4 py-2 border">Views</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border font-medium">{doc.title}</td>
                <td className="px-4 py-2 border">{doc.views}</td>
                <td className="px-4 py-2 border">{doc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Display;
