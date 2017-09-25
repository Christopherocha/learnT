import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';


export default class Dropzone extends React.Component {
    
        // Initial state setup
        constructor(props) {
            super(props);
            this.state = {
                user: {},
                posts: []
            }

        }


        render() {
            const componentConfig = {
                iconFiletypes: ['.jpg', '.png', '.gif'],
                showFiletypeIcon: true,
                postUrl: '/uploadHandler'
            }
            const djsConfig = { autoProcessQueue: false,
                addRemoveLinks: true, }
            const eventHandlers = { addedfile: (file) => console.log(file) }

            return(<div>
                <DropzoneComponent config={componentConfig}
                    eventHandlers={eventHandlers}
                    djsConfig={djsConfig} />
            </div>)
        }

}