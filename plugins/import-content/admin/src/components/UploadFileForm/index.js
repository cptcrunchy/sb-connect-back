import React, { Component } from 'react'
import PropTypes from 'prop-types'
import P from "../P";
import Row from "../Row";
import Label from "../Label";
import SvgIcon from '../SvgIcon';
import { Button } from '@buffetjs/core'

class UploadFileForm extends Component {
  state = {
    file: null,
    type: null,
    options: {
      filename: null,
    },
    isDragging: false,
  };
  onChangeImportFile = (file) => {
    file &&
      this.setState({
        file,
        type: file.type,
        options: { ...this.state.options, filename: file.name },
      });
  };

  handleDragEnter = () => this.setState({ isDragging: true });
  handleDragLeave = () => this.setState({ isDragging: false });
  handleDrop = (e) => {
    e.preventDefault();
    this.setState({ isDragging: false });
    const file = e.dataTransfer.files[0];
    this.onChangeImportFile(file);
  };
  readFileContent = (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };
  clickAnalyzeUploadFile = async () => {
    const { file, options } = this.state;
    const data = file && (await this.readFileContent(file));
    data &&
      this.props.onRequestAnalysis({
        source: "upload",
        type: file.type,
        options,
        data,
      });
  };

  render() {
    return (
      <div className={"col-12"}>
        <Row className={"row"}>
          <Label
            showLoader={this.props.loadingAnalysis}
            isDragging={this.state.isDragging}
            onDrop={this.handleDrop}
            onDragEnter={this.handleDragEnter}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <SvgIcon />
            <P>
              <span>
                Drag & drop your file into this area or <span className={"underline"}>browse</span> for a file to upload
              </span>
            </P>
            <div onDragLeave={this.handleDragLeave} className="isDragging" />
            <input
              name="file_input"
              accept=".csv"
              onChange={({ target: { files } }) =>
                files && this.onChangeImportFile(files[0])
              }
              type="file"
            />
          </Label>
        </Row>
        <Row className={"row"}>
          <Button
            label={"Analyze"}
            color={this.state.file ? "secondary" : "cancel"}
            disabled={!this.state.file}
            onClick={this.clickAnalyzeUploadFile}
          />
        </Row>
      </div>
    );
  }
}

UploadFileForm.propTypes = {
  onRequestAnalysis: PropTypes.func.isRequired,
  loadingAnalysis: PropTypes.bool.isRequired,
};

export default UploadFileForm