import React, { use, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import Display from "./Dispaly";

const dummyDatabase = {
  adsense : true,
  boughttime: 2,
  deskripsi : "JTELSJFLJS",
  donasi : true,
  name : "Test",
  paidcontent: true, 
  price: 20,
  syarat: true,
  totaldonasi : 25000,
  watchcount: 1000,
}

function Load({setLoad}) {
  const [user, setUser] = useState(dummyDatabase);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       // Replace 'users' with your collection name and 'docId' with the document ID
  //       const docRef = doc(db, "users", setLoad);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         setUser(docSnap.data());
  //       } else {
  //         console.error("No such document!");
  //         setError("No such document!");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching document: ", err);
  //       setError("Error fetching document!");
  //     }
  //   };

  //   fetchUser();
  // }, );

  return (
    <div>
      <h1>User Details</h1>
      {error ? (
        <p>{error}</p>
      ) : user ? (
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 font-semibold">
            <div className="flex flex-col gap-3">
              <div className="px-16 py-12 text-center flex flex-col justify-center border-2 border-gray-400 rounded-xl text-xl font-semibold">
                <h2>Total Pendapatan</h2>
                <h2>{user.totaldonasi*(user.donasi ? 1 : 0)+(user.watchcount*0.1*(user.adsense ? 1 : 0))+(user.boughttime*user.price*(user.paidcontent ? 1 : 0))}</h2>
              </div>
              <div className="flex flex-row justify-between">
                <div className="border-2 border-gray-400 rounded-md w-20 text-center py-1.5 ">All</div>
                <div className="border-2 border-gray-400 rounded-md w-20 text-center py-1.5 ">1 Thn</div>
                <div className="border-2 border-gray-400 rounded-md w-20 text-center py-1.5 ">1 Bln</div>
              </div>
            </div>
            <div className="flex flex-col h-full gap-4 justify-between flex-grow">
              <h3 className="border-2 border-gray-400 py-4 justify-left pl-5 flex rounded-md">Donation : Rp {user.totaldonasi}</h3>
              <h3 className="border-2 border-gray-400 py-4 justify-left pl-5 flex rounded-md">Paid Content : Rp {user.boughttime*user.price}</h3>
              <h3 className="border-2 border-gray-400 py-4 justify-left pl-5 flex rounded-md">Adsense : Rp {user.watchcount*0.1}</h3>
            </div>
          </div>
          <Display/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Load;


{/* <div>
          <p>Name video: {user.name}</p>
          <p>Deskripsi: {user.deskripsi}</p>
          <p>Total pendapatan donasi:{user.totaldonasi}</p>
          <p>Total pendapatan adsense:{user.watchcount*0.1}</p>
          <p>Total pendapatan paidcontent:{user.boughttime*user.price}</p>
          <p>Total pendapatan :{user.totaldonasi*(user.donasi ? 1 : 0)+user.watchcount*0.1*(user.adsense ? 1 : 0)+user.boughttime*user.price*(user.paidcontent ? 1 : 0)}</p>
        </div> */}