import React, { useState, useRef } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

function Save({ DocId }) {
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [price, setPrice] = useState(0);
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("No file chosen"); // State to store file name

  const [adsense, setAdsense] = useState(false);
  const [donasi, setDonasi] = useState(false);
  const [paidcontent, setPaidcontent] = useState(false);
  const [noMonetise, setNoMonetise] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleFileChange = () => {
    const file = fileInputRef.current.files[0]; // Access the selected file
    if (file) {
      setFileName(file.name); // Update state with the file name
    } else {
      setFileName("No file chosen"); // Reset if no file is selected
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !deskripsi || !fileInputRef.current.files[0]) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const docRef = doc(db, "users", DocId, "video", name);
      await setDoc(docRef, {
        name,
        deskripsi,
        donasi,
        adsense,
        paidcontent,
        price: paidcontent ? price : 0,
        boughttime: 0,
        watchcount: 0,
        totaldonasi: 0,
        syarat: false,
        date: serverTimestamp(),
      });

      setName("");
      setDeskripsi("");
      setPrice(0);
      setDonasi(false);
      setAdsense(false);
      setPaidcontent(false);
      setNoMonetise(true);
      fileInputRef.current.value = "";
      handleFileChange()
      alert("You uploaded a video!");
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Error saving data.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* File Input */}
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#a80000",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Choose File
          <input
            type="file"
            accept="video/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange} // Trigger file change
          />
        </label>
        <span style={{ marginLeft: "10px", color: "#777" }}>
          {fileName}
        </span>
      </div>

      {/* Video Details */}
      <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>Detail Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Judul video"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        />
        <textarea
          placeholder="Deskripsi video"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            height: "100px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginBottom: "10px",
            resize: "none",
          }}
        />

        {paidcontent && (
          <input
            type="number"
            placeholder="Harga (Rupiah)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          />
        )}

        {/* Monetization Buttons */}
        <h2 style={{ fontWeight: "bold", marginBottom: "10px" }}>
          Jenis Monetisasi
        </h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
  type="button"
  onClick={() => {
    setPaidcontent(!paidcontent);
    setNoMonetise(!(adsense||!paidcontent||donasi));
  }}
  style={{
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #a80000",
    backgroundColor: paidcontent ? "#a80000" : "white",
    color: paidcontent ? "white" : "black",
    fontWeight: "bold",
    cursor: "pointer",
    width: "150px",
  }}
>
  Paid Content
</button>

<button
  type="button"
  onClick={() => {
    setDonasi(!donasi);
    setNoMonetise(!(adsense||paidcontent||!donasi));
  }}
  style={{
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #a80000",
    backgroundColor: donasi ? "#a80000" : "white",
    color: donasi ? "white" : "black",
    fontWeight: "bold",
    cursor: "pointer",
    width: "150px",
  }}
>
  <em>Donation</em>
</button>

<button
  type="button"
  onClick={() => {
    setAdsense(!adsense);
    setNoMonetise(!(!adsense||paidcontent||donasi));
  }}
  style={{
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #a80000",
    backgroundColor: adsense ? "#a80000" : "white",
    color: adsense ? "white" : "black",
    fontWeight: "bold",
    cursor: "pointer",
    width: "150px",
  }}
>
  <em>Adsense</em>
</button>

<button
  type="button"
  onClick={() => {
    setNoMonetise(true);
    setPaidcontent(false);
    setDonasi(false);
    setAdsense(false);
  }}
  style={{
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #a80000",
    backgroundColor: noMonetise ? "#a80000" : "white",
    color: noMonetise ? "white" : "black",
    fontWeight: "bold",
    cursor: "pointer",
    width: "150px",
  }}
>
  Tidak dimonetisasi
</button>

        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting} // Disable button when submitting
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isSubmitting ? "#b0b0b0" : "#a80000",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            fontWeight: "bold",
            marginTop: "20px",
          }}
        >
          {isSubmitting ? "Saving..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

export default Save;
