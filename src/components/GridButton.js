import React from "react";
import { Button } from "@material-ui/core";

export class GridButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.colour,
    };
  }

  handleClick = (e) => {
    this.props.handleClick();
  };

  render() {
    return (
      <Button
        variant="contained"
        color={this.state.color}
        onClick={this.handleClick}
        style={{
          padding: "10px",
        }}
      ></Button>
    );
  }
}

export default GridButton;
