import React, { use, useEffect, useState } from "react";
import { collection, query, getDocs, limit,doc } from "firebase/firestore";
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
  const [total,setTotal]=useState(0)
  const [donation,setDonation]=useState(0)
  const [adsense,setAdsense]=useState(0)
  const [paid,setPaid]=useState(0)
  
  const getAllDocuments = async () => {
    try {
      // Initialize temporary totals
      let tempDonation = 0;
      let tempAdsense = 0;
      let tempPaid = 0;
      let tempTotal = 0;
  
      // Get the reference to the collection
      const querySnapshot = await getDocs(collection(db, "users", setLoad, "video"));
  
      // Iterate over the documents and accumulate the totals
      querySnapshot.forEach((doc) => {
        const data = doc.data();
  
        const newDonation = data.totaldonasi * (data.donasi ? 1 : 0);
        const newAdsense = data.watchcount * 0.1 * (data.adsense ? 1 : 0);
        const newPaid = data.boughttime * (data.price || 0) * (data.paidcontent ? 1 : 0);
  
        tempDonation += newDonation;
        tempAdsense += newAdsense;
        tempPaid += newPaid;
        tempTotal += newDonation + newAdsense + newPaid;
      });
  
      // Update the state once after processing all documents
      setDonation(tempDonation);
      setAdsense(tempAdsense);
      setPaid(tempPaid);
      setTotal(tempTotal);
  
      console.log("Final Totals:");
      console.log("Donation:", tempDonation);
      console.log("Adsense:", tempAdsense);
      console.log("Paid:", tempPaid);
      console.log("Total:", tempTotal);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };
  
  // Fetch the data once in useEffect
  useEffect(() => {
    getAllDocuments();
  }, []); // Dependency array ensures it runs only once
  

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
                <h2>{total}</h2>
              </div>
              <div className="flex flex-row justify-between">
                <div className="border-2 border-gray-400 rounded-md w-20 text-center py-1.5 ">All</div>
                <div className="border-2 border-gray-400 rounded-md w-20 text-center py-1.5 ">1 Thn</div>
                <div className="border-2 border-gray-400 rounded-md w-20 text-center py-1.5 ">1 Bln</div>
              </div>
            </div>
            <div className="flex flex-col h-full gap-4 justify-between flex-grow">
              <h3 className="border-2 border-gray-400 py-4 justify-left pl-5 flex rounded-md">Donation : Rp {donation}</h3>
              <h3 className="border-2 border-gray-400 py-4 justify-left pl-5 flex rounded-md">Paid Content : Rp {paid}</h3>
              <h3 className="border-2 border-gray-400 py-4 justify-left pl-5 flex rounded-md">Adsense : Rp {adsense}</h3>
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