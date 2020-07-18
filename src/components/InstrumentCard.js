import React from 'react';
  
  export class InstrumentCard extends React.Component {  
    constructor(props) {
      super(props);
      this.state = {
        name: this.props.name,
        path: this.props.path,
        val: parseInt(this.props.val),
      };
    }

    onClick = () => {
      this.props.onClick(this.state.val);
    }

    render() {
      return (
        <button onClick={() => this.onClick()}>
          <img src={this.state.path} alt={this.state.name}
          height="150"
          width="150"/>
        </button>
      );
    }
  }

  export default InstrumentCard;