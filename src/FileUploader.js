import React, { Component } from "react";
// We are using axios as the http library
import axios from "axios";
export default class FileUpload extends Component {
  // fileToUpload contains the actual file object
  // uploadSuccess becomes true when the file upload is complete
  state = {
    fileToUpload: undefined,
    uploadSuccess: undefined,
    error: undefined,
    message: undefined,
  };
  uploadFile() {
    axios
      .get(
        "https://1unnp838pa.execute-api.us-west-1.amazonaws.com/default/lambda-video-uploader-test"
      )
      .then((response) => {
        // Getting the url from response
        const url = response.data.uploadURL;
        axios({
          method: "PUT",
          headers: { "content-type": "video/mp4" },
          url: url,
          data: this.state.fileToUpload,
        })
          .then((res) => {
            console.log("-----PUT-----", res);
            this.setState({
              uploadSuccess: "File upload successfull",
              error: undefined,
            });
          })
          .catch((err) => {
            console.log("----------", err);
            this.setState({
              error: "Error Occured while uploading the file",
              uploadSuccess: undefined,
            });
          });
      });
  }
  render() {
    return (
      <div>
        <div>File Upload to S3 with Lambda, And React axios Application</div>
        <div>
          <form>
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                id="fileUpload"
                onChange={(e) => {
                  this.setState({
                    fileToUpload: e.target.files[0],
                  });
                }}
              />
              {this.state.fileToUpload ? (
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={(e) => {
                    this.uploadFile();
                  }}
                >
                  Upload your file
                </button>
              ) : null}
              <div>
                <span>
                  {this.state.uploadSuccess ? "File Upload Successfully" : ""}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
