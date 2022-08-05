import React, { Component } from 'react';


export class UploadPic extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            file: null,
        }
    }

    handleUploadImage = (e) => {
        this.setState({
            file: URL.createObjectURL(e.target.files[0]),
        })
    }

    render() {

        return (
            <>
                <div>UploadPic</div>
                <input type="file" onChange={this.handleUploadImage}/>
                {!(this.state.file === null) && <img src={this.state.file} alt="Картинка" />}                
            </>
        )
    }
}