import React, { Component } from 'react';
import { firebase } from '../../../firebase';
import FileUploader from 'react-firebase-file-uploader'

class Uploader extends Component {

    state={
        name:'',
        isUploading:false,
        progress:0,
        fileURL:''
    }

    handleUploadStart = ()=>{
        this.setState({isUploading:true,progress:0})
    }

    handleProgress = (progress)=>{
        this.setState({progress})
    }

    handleUploadError = (error)=>{
        this.setState({isUploading:false})
        console.log(error)
    }

    handleUploadSuccess = (filename)=>{
        this.setState({
            isUploading:false,
            progress:100,
            name:filename
        })
        ///
        firebase.storage().ref(`${this.props.imageFolder}`)
        .child(filename).getDownloadURL()
        .then( url =>{
            this.setState({fileURL:url})
        })

        this.props.fileName(filename)
    }

    render() {
        return (
            <div>

                {this.state.isUploading ? 
                    <p>Progress:{this.state.progress}%</p>
                    :null
                }

                {this.state.fileURL ? 
                    <img 
                    style={{width:'300px'}} src={this.state.fileURL} alt={this.state.name}/>
                    :
                    null
                }
                
                <FileUploader
                    accept="image/*"
                    name='image'
                    randomizeFilename
                    storageRef={firebase.storage().ref(`${this.props.imageFolder}`)}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleProgress}
                />

            </div>
        );
    }
}

export default Uploader;