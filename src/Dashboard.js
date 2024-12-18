import React, { useState } from 'react';
import './Dashboard.css';
import Save from "./Save";
import Load from "./Load";
import Display from './Dispaly';
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
function 
Video() {
    return (
        <>
        <Display/>
        </>
    );
  }
function Dashboard({ setPage,DocId}) {
    const [currentPage, setCurrentPage] = useState("Video");

    // Function to render the page based on the current selection
    const renderPage = () => {
      switch (currentPage) {
        case "Uploading":
            return <UploadingPage setPage={setPage} DocId={DocId} />;
        case "Revenue":
            return <RevenuePage DocId={DocId} />;
        case "Video":
            return <Video/>
        default:
            return <Video/>;
      }
    };

  return (
    <div className="streamtube-container">
      {/* Header */}
      <div className="header">
        <span>Streamtube</span>
        <div className="header-icons">
          <i className="fas fa-bell"></i>
          <i className="fas fa-user-circle"></i>
        </div>
      </div>

      {/* Sidebar and Content */}
      <div style={{ display: 'flex', flex: 1 }}>
        <div className="sidebar">
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
        </div>

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
