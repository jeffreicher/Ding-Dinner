import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            color: 'grey darken-1'
        };
    };

    componentWillReceiveProps(nextProps, prevState) {
        if (nextProps.determineSelected) {
            this.setState({
                color: 'teal',
            });
        } else {
            this.setState({
                color: 'grey darken-1',
            });
        };   
    };

    render() {

        const buttonStyle = {
            // boxShadow: '6px 6px 4px 0 rgba(50, 50, 50, 0.14), 0 1px 10px 0 rgba(50, 50, 50, 0.12), 0 2px 4px -1px rgba(50, 50, 50, .5)',
            backgroundColor: this.state.color
        }

        return (
            <div>
                <a onClick={this.props.selectedCheck.bind(null, this)} style={buttonStyle} className={`btn-desk btn-large waves-effect waves-light btn ${this.state.color} ${this.props.style}`}>
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
