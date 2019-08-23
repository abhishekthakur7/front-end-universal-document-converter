import React, { Component } from "react";
import Dropzone from "../dropzone/dropzone.component";
import './upload.styles.scss';
import Progress from "../progress/progress.component";
import Spinner from "../../pages/spinner/spinner.component";
import Download from "../download/download.component";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      isFileSuccessfullyUploaded: false,
      isFileConverted: false,
      fileTypeToConvert: ''
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }), () => console.log('file is: ' + files));
  }

  async uploadFiles(event) {
    const { fileTypeToConvert } = this.state;
    if (!fileTypeToConvert) {
      alert('Please select file type to convert.')
      return;
    }

    if (event.target.files) {
      this.onFilesAdded(event.target.files);
    }

    const filesSelected = this.state.files;
    console.log(filesSelected);
    if (typeof filesSelected === 'undefined' || !filesSelected.length > 0) {
      alert('Please select file to convert first.')
      return;
    }
    this.setState({ uploadProgress: {}, isFileConverted: false, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file, fileTypeToConvert));
    });
    try {
      let response = await Promise.all(promises);
      console.log('Response is: ' + response);
      this.setState({ isFileSuccessfullyUploaded: true, uploading: false }, () => console.log('uploaded: ', this.state.isFileSuccessfullyUploaded));
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ isFileSuccessfullyUploaded: true, uploading: false });
    }
  }

  sendRequest(file, fileTypeToConvert) {
    return new Promise((resolve, reject) => {
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
      req.setRequestHeader("fileType", fileTypeToConvert)
      req.send(formData);
      req.onload = () => {
        if (req.status === 200) {
          this.setState({ isFileConverted: true, uploading: false });
          resolve(req.response);
        }
      }
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.isFileSuccessfullyUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <span style={{ 'display': uploadProgress && uploadProgress.state === "done" ? 'block ' : 'none' }}>Upload done</span>
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

  handleSelectChange(event) {
    this.setState({ fileTypeToConvert: event.target.value })
  }

  renderActions() {
    if (this.state.isFileConverted) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], isFileSuccessfullyUploaded: false, isFileConverted: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <div className='buttons'>
          <div className='uploadButton'>
            <button
              disabled={this.state.files.length < 0 || this.state.uploading}
              onClick={this.uploadFiles}
            >
              Convert
            </button>
          </div>
          <div className='selectDropdown'>
            <select value={this.state.fileTypeToConvert} onChange={this.handleSelectChange}>
              <option value="">Convert To</option>
              <option value="html">HTML</option>
              <option value="image">Image</option>
              <option value="text">Text</option>
              <option value="docx">Docx</option>
              <option value="ppt">PPT</option>
            </select>
          </div>
        </div>
      );
    }
  }

  render() {
    let { uploading, isFileConverted, isFileSuccessfullyUploaded } = this.state;
    let component;
    if ((!isFileConverted && uploading) || (!isFileConverted && isFileSuccessfullyUploaded && !uploading)) {
      console.log(`uploading: ${uploading}, isFileConverted: ${isFileConverted}`);
      if (!uploading && isFileSuccessfullyUploaded) {
        component = <Spinner message='Converting...' />
      } else {
        component = <Spinner message='Uploading...' />
      }
    } else if ((isFileConverted && !uploading && isFileSuccessfullyUploaded) || !(isFileConverted && uploading && isFileSuccessfullyUploaded)) {
      if (isFileConverted) {
        component = <Download />
      } else {
        component = <div>
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
                    {/* {this.renderProgress(file)} */}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Actions">{this.renderActions()}</div>
        </div>
      }
    }
    return (
      <div className="Upload">
        {component}
      </div>
    );
  }
}

export default Upload;
