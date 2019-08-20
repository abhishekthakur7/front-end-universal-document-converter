import React, { Component } from "react";
import Dropzone from "../dropzone/dropzone.component";
import './upload.styles.scss';
import Progress from "../progress/progress.component";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      isFileSuccessfullyUploaded: false,
      isFileConverted: false
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    let file = this.state.files[0];
    try {
      let x = await new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();

        //Start: Track upload progress
        req.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = {
              state: "pending",
              percentage: (event.loaded / event.total) * 100
            };
            this.setState({ uploadProgress: copy });
          }
        }

        req.upload.onload = (event) => {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = { state: "done", percentage: 100 };
          this.setState({ uploadProgress: copy, isFileSuccessfullyUploaded: true, uploading: false });
        };

        req.upload.onerror = event => {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = { state: "error", percentage: 0 };
          this.setState({ uploadProgress: copy, isFileConverted: false, isFileSuccessfullyUploaded: false, uploading: false });
          reject(req.response);
        };
        //End: Track upload progress

        const formData = new FormData();
        formData.append("file", file, file.name);
        req.open("POST", "http://localhost:5000/convertPdfFile");
        req.setRequestHeader("fileType", "html")
        req.send(formData);
        req.onload = () => {
          if (req.status === 200) {
            this.setState({ isFileConverted: true, uploading: false });
            resolve(req.response);
          }
        }
        // Handle network errors
        req.onerror = function () {
          reject(Error("Network Error"));
        };
      });
      console.log('response is: ' + x);
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ isFileSuccessfullyUploaded: false, isFileConverted: false, uploading: false });
    }
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.isFileSuccessfullyUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.isFileSuccessfullyUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], isFileSuccessfullyUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
        <span className="Title">Upload Files</span>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.isFileSuccessfullyUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
      </div>
    );
  }
}

export default Upload;
