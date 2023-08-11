//mport { useState } from "react";
//import AWS from "aws-sdk";
import axios from "axios";
import "./App.css";
import FileUploader from "./FileUploader";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FileUploader />
      </header>
    </div>
  );
}

export default App;
