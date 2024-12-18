import Save from "./Save";
import Load from "./Load";
import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [docId,setDocId]=useState("")
  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return (
          <div>
            {/* <Save setPage={setCurrentPage} DocId={docId} />  */}
            <Dashboard setPage={setCurrentPage} DocId={docId}/>
          </div>
        );
      case "Load":
        return <Load setLoad={docId}/>;
      case "SignUp":
        return<SignUp setPage={setCurrentPage} />
      default:
        return <Login setPage={setCurrentPage} setDocId={setDocId} />;
    }
  };
  return (
    <div>
      <div>{renderPage()}</div>
    </div>
  );
}

export default App;
