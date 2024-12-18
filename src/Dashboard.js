import React, { useState } from "react";
import Save from "./Save";
import Load from "./Load";
// Components for different pages
function UploadingPage({ setPage,DocId}) {
  return (
    <div>
        <Save setPage={setPage} DocId={DocId} />
    </div>
  );
}

function RevenuePage({DocId}) {
  return (
    <div>
    <Load setLoad={DocId}/>
    </div>
  );
}

function Dashboard({ setPage,DocId}) {
  const [currentPage, setCurrentPage] = useState("Uploading");

  // Function to render the page based on the current selection
  const renderPage = () => {
    switch (currentPage) {
      case "Uploading":
        return <UploadingPage setPage={setPage} DocId={DocId} />;
      case "Revenue":
        return <RevenuePage DocId={DocId} />;
      default:
        return <UploadingPage setPage={setPage} DocId={DocId}/>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Navigation */}
      <nav
        style={{
          width: "200px",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Dashboard</h3>
        <button
          onClick={() => setCurrentPage("Uploading")}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            backgroundColor: currentPage === "Uploading" ? "#007bff" : "#ddd",
            color: currentPage === "Uploading" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Upload Video
        </button>
        <button
          onClick={() => setCurrentPage("Revenue")}
          style={{
            display: "block",
            margin: "10px 0",
            padding: "10px",
            width: "100%",
            backgroundColor: currentPage === "Revenue" ? "#007bff" : "#ddd",
            color: currentPage === "Revenue" ? "#fff" : "#000",
            border: "none",
            cursor: "pointer",
          }}
        >
          Revenue Page
        </button>
      </nav>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        {renderPage()}
      </main>
    </div>
  );
}

export default Dashboard;
