import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore"; // For Firestore
import { db } from "./firebaseConfig";

function Save({ setPage,DocId}) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Save to Firestore
      await setDoc(doc(db, "users", DocId), {
        name,
        age: parseInt(age),
      });
      setName("");
      setAge("");

      // Navigate to the "Load" page
      setPage("Load");
    } catch (err) {
      console.error("Error adding document: ", err);
      alert("Error saving data.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
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
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "5px 10px" }}>
          Save
        </button>
      </form>
    </div>
  );
}

export default Save;
