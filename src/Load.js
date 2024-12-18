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
          <p>Name video: {user.name}</p>
          <p>Deskripsi: {user.deskripsi}</p>
          <p>Total pendapatan donasi:{user.totaldonasi}</p>
          <p>Total pendapatan adsense:{user.watchcount*0.1}</p>
          <p>Total pendapatan paidcontent:{user.boughttime*user.price}</p>
          <p>Total pendapatan :{user.totaldonasi*(user.donasi ? 1 : 0)+user.watchcount*0.1*(user.adsense ? 1 : 0)+user.boughttime*user.price*(user.paidcontent ? 1 : 0)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Load;
