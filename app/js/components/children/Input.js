import React from 'react';
import helper from '../utils/helpers';

export default class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            title: '',
            body: '',
            link: '',
        };
        this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        var newState = {};

        newState[e.target.id] = e.target.value;
        this.setState(newState);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("click");
        this.props.setPost(this.state.title, this.state.body, this.state.link);
    }

    render() {
        return (
            <div className="row">
                <div className="panel panel-default">

                    <div className="panel-heading">
                        <h3 className="panel-title">What did you learn today?</h3>
                    </div>

                    <div className="panel-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">

                                <h5>Title</h5>
                                <input
                                    value={this.state.title}
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    onChange={this.handleChange}
                                    required
                                />

                                <h5>Body</h5>
                                <input
                                    value={this.state.body}
                                    type="text"
                                    className="form-control"
                                    id="body"
                                    onChange={this.handleChange}
                                    required
                                />

                                <h5>Link</h5>
                                <input
                                    value={this.state.link}
                                    type="text"
                                    className="form-control"
                                    id="link"
                                    onChange={this.handleChange}
                                    required
                                />

                                <button className="btn-sm btn-success" type="submit">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}