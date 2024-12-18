import React, { useState,useRef } from "react";
import { doc, setDoc,serverTimestamp } from "firebase/firestore"; // For Firestore
import { db } from "./firebaseConfig";

function Save({DocId}) {
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [price, setPrice] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [adsense, setAdsense] = useState(false);
  const [donasi, setDonasi] = useState(false);
  const [paidcontent, setPaidcontent] = useState(false);
  const [noMonetise, setNoMonetise] = useState(true);

  const handleCheckboxChange = async (e) => {
    const { name, checked } = e.target; 
      switch (name) {
        case "adsense":
          setAdsense(checked);
          if(checked){
            //alert("You activated Donation");
            setNoMonetise(false)
          }
          break;
        case "donasi":
          setDonasi(checked);
          if(checked){
            //alert("You activated Donation");
            setNoMonetise(false)
          }
          break;
        case "paidcontent":
          setPaidcontent(checked);
          if(checked){
            //alert("You activated Donation");
            setNoMonetise(false)
          }
          break;
        case "No":
          if(!noMonetise){
            setAdsense(false);
            setDonasi(false);
            setPaidcontent(false);
            setNoMonetise(true)
          }

          break;
        default:
          break;
      }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !deskripsi ||!fileInputRef.current.files[0]) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      const docRef = doc(db, "users", DocId,"video",name);

  
      // Save to Firestore
      await setDoc(docRef, {
        name: name  || "Default Name", // Fallback to "Default Name" if both are missing
        deskripsi: deskripsi || "No description provided",
        donasi: donasi ?? false, // Default to false if missing
        adsense: adsense ??  false,  // Default to 0 if missing
        paidcontent: paidcontent ??  false, // Default to false if missing
        price: price  || 0, // Default to 0 if missing
        boughttime:  0, // Default to 0 if missing
        watchcount:  0, // Default to 0 if missing
        totaldonasi:  0, // Default to 0 if missing
        syarat:  false, // Fallback to "Default terms"
        date: serverTimestamp()
      });
      
  
      setName("");
      setDeskripsi("");
      setDonasi(false);
      setAdsense(false);
      setPaidcontent(false);
      setPrice(0);
      fileInputRef.current.value = "";
      alert("You uploded a video");
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Error saving data.");
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h1>Video Uploader</h1>
      <input type="file" accept="video/*" ref={fileInputRef} />

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
      <label>
        <input
          type="checkbox"
          name="No"
          checked={noMonetise}
          onChange={handleCheckboxChange}
        />
        Paid Content
      </label>
    </div>
  );
}

export default Save;
