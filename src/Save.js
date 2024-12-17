import React, { useState } from "react";
import { doc, setDoc,getDoc } from "firebase/firestore"; // For Firestore
import { db } from "./firebaseConfig";

function Save({ setPage,DocId}) {
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);
  const [videofile,setVideoFile] = useState(null);
  const [adsense, setAdsense] = useState(false);
  const [donasi, setDonasi] = useState(false);
  const [paidcontent, setPaidcontent] = useState(false);

  const handleCheckboxChange = (e) => {
    switch (e.target.name) {
      case "adsense":
        setAdsense(e.target.checked);
        break;
      case "donasi":
        setDonasi(e.target.checked);
        break;      
      case "paidcontent":
        setPaidcontent(e.target.checked);
        break;
      default:
        setAdsense(e.target.checked);
        break;
    }
     // Updates state based on the checkbox value
  };
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!name || !deskripsi ||!videofile) {
    //   alert("Please fill out all fields.");
    //   return;
    // }
    try {
      const docRef = doc(db, "users", DocId);
      const docSnap = await getDoc(docRef);
  
      let existingData = null;
  
      if (docSnap.exists()) {
        existingData = docSnap.data(); // Get existing document data
      } else {
        console.error("No such document!");
        setError("No such document!");
      }
  
      // Save to Firestore
      await setDoc(docRef, {
        name: name ? name : existingData?.name, // Use input name if provided; otherwise, fallback to existing name
        deskripsi: deskripsi ? deskripsi : existingData?.deskripsi ,
        donasi:donasi,   
        adsense:adsense, 
        paidcontent:paidcontent,
        price:price ?price:existingData?.price,
        boughttime:existingData?.boughttime,
        watchcount:existingData?.watchcount,
        totaldonasi:existingData?.totaldonasi,
        syarat:existingData?.syarat,
      });
  
      setName("");
      setDeskripsi("");
  
      setPage("Load"); // Navigate to "Load" page
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Error saving data.");
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h1>Video Uploader</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />

      <h1>Detail video</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
          deskripsi:
            <input
              type="text"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
{paidcontent&&   <div style={{ marginBottom: "10px" }}>
          <label>
          Price:
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>}
        <button type="submit" style={{ padding: "5px 10px" }}>
          Save
        </button>
      </form>
      <h1>Jenis monetasi</h1>
      <label>
        <input
          type="checkbox"
          name="adsense"
          checked={adsense}
          onChange={handleCheckboxChange}
        />
        Adsense
      </label>
      <label>
        <input
          type="checkbox"
          name="donasi"
          checked={donasi}
          onChange={handleCheckboxChange}
        />
        Donasi
      </label>
      <label>
        <input
          type="checkbox"
          name="paidcontent"
          checked={paidcontent}
          onChange={handleCheckboxChange}
        />
        Paid Content
      </label>
    </div>
  );
}

export default Save;
