{/*
https://www.npmjs.com/package/react-dropzone-component

https://github.com/felixrieseberg/React-Dropzone-Component

https://stackoverflow.com/questions/33728943/how-to-add-removefile-option-in-dropzone-plugin

https://libraries.io/github/nousdecor/React-Dropzone-Component

*/}


import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import helper from './utils/helpers';

export default class Dropzone extends React.Component {
    constructor(props) {
        super(props);
        this.state={ 
            oldPhoto:"" 
        } 

        // For a full list of possible configurations,
        // please consult http://www.dropzonejs.com/#configuration
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            method:"put"
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/uploadHandler'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = () => console.log('Hello!');

        this.success = file => {
            console.log('uploaded', file) 
        
        };

        this.removedfile = file => { 
            console.log('removing...', file); 
            helper.undoPhotoUpload(this.props.user._id, this.props.user.userPhoto); 
        } 

        this.dropzone = null;
    }


    render() {
        this.componentConfig.postUrl = '/uploadHandler/'+this.props.user._id;
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;


        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.success,
            removedfile: this.removedfile
        }

        return <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
    }
}