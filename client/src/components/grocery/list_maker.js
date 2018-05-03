import React, {Component} from 'react';

class ListMaker extends Component{
    constructor(props){
        super(props);


    }

    toggleComplete(){
        let {complete,  id} = this.props.item;

        complete = 1 - complete;

        this.props.completeItem(id, complete);
    }

    render(){

        const {complete} = this.props.item;

        return (
            <div className='item' key={this.props.id} >
                <input type='checkbox' checked={complete ? 'checked' : ''} onChange={this.toggleComplete.bind(this)} className='check filled-in' style={{borderColor: 'white'}} id={this.props.id} />
                <label className='filled-in name oxygenFont' style={{fontSize: `1.2rem`}} htmlFor={this.props.id}>{this.props.item.ingredient}</label>
            </div>
            // <p>
            //     <input type="checkbox" class="filled-in" id="filled-in-box" checked="checked" />
            //     <label for="filled-in-box">Filled in</label>
            // </p>
        )
    }
}

export default ListMaker;