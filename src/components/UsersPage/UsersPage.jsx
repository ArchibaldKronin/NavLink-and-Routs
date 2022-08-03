import React, { Component } from 'react';

export class UsersPage extends React.Component {
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
                <div>UsersPage</div>
                <input type="file" onChange={this.handleUploadImage}/>
                <img src={this.state.file} alt="Картинка" />
            </>
        )
    }
}