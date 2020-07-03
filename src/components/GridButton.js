import React from "react";
import { Button } from "@material-ui/core";

export class GridButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "default",
      clicked: false,
    };
  }

  handleClick = () => {
    let isOn = this.state.clicked;
    if (!isOn) {
      // play sound
      this.props.playSound();
      this.setState({
        color: "primary",
        clicked: !this.state.clicked,
      });
    } else {
      this.setState({
        color: "grey",
        clicked: !this.state.clicked,
      });
    }
  };
  render() {
    return (
      <Button
        variant="contained"
        color={this.state.color}
        disabled={this.state.disabled}
        onClick={() => this.handleClick()}
        style={{
          padding: "10px",
        }}
      ></Button>
    );
  }
}

export default GridButton;
