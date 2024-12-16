import React, { useState } from "react";

function Upload() {
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Video Uploader</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />

    </div>
  );
}

export default Upload;
