import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: 'grey darken-3'
        };
    };

    componentWillReceiveProps(nextProps, prevState) {
        if (nextProps.determineSelected) {
            this.setState({
                color: 'teal',
            });
        } else {
            this.setState({
                color: 'grey darken-3',
            });
        };   
    };

    render() {
        return (
            <div>
                <a onClick={this.props.selectedCheck.bind(null, this)} style={{backgroundColor: this.state.color}} className={`btn-desk btn-large waves-effect waves-light btn z-depth-2 ${this.state.color} ${this.props.style}`}>
                <div>
                    <div className="title-container oxygenFont">
                       {this.props.title} 
                    </div>
                     <div>
                       {this.props.descrip}   
                    </div>                                       
                </div>
                </a>
            </div>
        );
    };
};

export default Button;
