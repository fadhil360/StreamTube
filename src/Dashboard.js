import React, { useState } from "react";
import './Dashboard.css';
import Save from "./Save";
import Load from "./Load";
import Display from './Dispaly';

// Components for different pages
function UploadingPage({ setPage, DocId }) {
  return (
    <div>
      <Save setPage={setPage} DocId={DocId} />
    </div>
  );
}

function RevenuePage({ DocId }) {
  return (
    <div>
      <Load setLoad={DocId} />
    </div>
  );
}

function Video({ DocId }) {
  return (
    <>
      <Display setLoad={DocId} />
    </>
  );
}

function Dashboard({ setPage, DocId }) {
  const [currentPage, setCurrentPage] = useState("Video");

  // Function to render the page based on the current selection
  const renderPage = () => {
    switch (currentPage) {
      case "Uploading":
        return <UploadingPage setPage={setPage} DocId={DocId} />;
      case "Revenue":
        return <RevenuePage DocId={DocId} />;
      case "Video":
        return <Video DocId={DocId} />;
      default:
        return <Video DocId={DocId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex h-20 items-center px-9 justify-between">
          <h1 className="text-xl font-semibold">Streamtube</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-800">
              <i className="fas fa-bell" />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <i className="fas fa-user-circle" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar and Content */}
      <div className="flex">
        <aside className="sidebar">
          <button
            className={`sidebar-button ${currentPage === 'Video' ? 'active' : ''}`}
            onClick={() => setCurrentPage("Video")}
          >
            <i className="fas fa-play"></i> Video
          </button>
          <button
            className={`sidebar-button ${currentPage === 'Revenue' ? 'active' : ''}`}
            onClick={() => setCurrentPage("Revenue")}
          >
            <i className="fas fa-chart-bar"></i> Revenue
          </button>
          <button
            className={`sidebar-button ${currentPage === 'Uploading' ? 'active' : ''}`}
            onClick={() => setCurrentPage("Uploading")}
          >
            <i className="fas fa-upload"></i> Upload
          </button>
        </aside>

        <main
          style={{
            flex: 1,
            padding: "20px",
          }}
        >
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
