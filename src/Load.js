import React, { use, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

function Load({setLoad}) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Replace 'users' with your collection name and 'docId' with the document ID
        const docRef = doc(db, "users", setLoad);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.error("No such document!");
          setError("No such document!");
        }
      } catch (err) {
        console.error("Error fetching document: ", err);
        setError("Error fetching document!");
      }
    };

    fetchUser();
  }, );

  return (
    <div>
      <h1>User Details</h1>
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>deskripsi: {user.deskripsi}</p>
          <p>Total pendapatan donasi:{user.totaldonasi}</p>
          <p>Total pendapatan adsense:{user.watchcount*0.1}</p>
          <p>Total pendapatan paidcontent:{user.boughttime*user.price}</p>
          <p>Total pendapatan :{user.totaldonasi+user.watchcount*0.1+user.boughttime*user.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Load;
