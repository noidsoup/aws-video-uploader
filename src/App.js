import { useState } from "react";
import AWS from "aws-sdk";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const uploadFile = async () => {
    const S3_BUCKET = "nicholas-uploader-bucket";
    const REGION = "us-west-1";

    AWS.config.update({
      accessKeyId: "AKIA5ODJEIJEWOF6EKUK",
      secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      alert("File uploaded successfully.");
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={uploadFile}>Upload</button>
        </div>
      </header>
    </div>
  );
}

export default App;
