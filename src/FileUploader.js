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
  };
  uploadFile() {
    // When the upload file button is clicked,
    // first we need to get the presigned URL
    // URL is the one you get from AWS API Gateway
    axios({
      method: "post",
      contentType: "application/json",
      url:
        "https://3cgjoex7mf.execute-api.us-west-1.amazonaws.com/prod/uploader",
    }).then((response) => {
      console.log("----------", response);
    });
  }
  render() {
    return (
      <div>
        <div>File Upload to S3 with Lambda, And React axios Application</div>
        <div>
          <form>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-light"
                onClick={(e) => {
                  this.uploadFile();
                }}
              >
                button
              </button>
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
