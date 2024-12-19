'use client';

import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Display = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setDocuments([]);
        setLoading(false);
        return;
      }

      try {
        const uid = user.uid;
        const querySnapshot = await getDocs(collection(db, 'users', uid, 'video'));

        const savedViews = JSON.parse(localStorage.getItem('randomViews')) || {};

        const docsArray = querySnapshot.docs.map((doc) => {
          const videoId = doc.id;
          let randomViews = savedViews[videoId];

          // Jika belum ada di local storage, generate random views
          if (randomViews === undefined) {
            randomViews = Math.floor(Math.random() * 1000); // Random angka 0-999
            savedViews[videoId] = randomViews; // Simpan ke local storage
          }

          return {
            id: videoId,
            title: doc.data().name || 'No Title',
            views: randomViews, // Ambil views dari local storage atau hasil random
            revenue: randomViews * 2000, // Kalkulasi revenue langsung
            date: doc.data().date
              ? doc.data().date.toDate().toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              : 'N/A',
          };
        });

        // Simpan views ke local storage untuk persistensi
        localStorage.setItem('randomViews', JSON.stringify(savedViews));

        setDocuments(docsArray);
      } catch (error) {
        console.error('Error getting documents: ', error);
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
        <h2 className="text-2xl font-bold text-[#000000]">Video Anda</h2>
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
            {documents.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-2 border text-center">
                  Belum ada video
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border font-medium">{doc.title}</td>
                  <td className="px-4 py-2 border">{doc.views}</td>
                  <td className="px-4 py-2 border">{doc.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Display;
