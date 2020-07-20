import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export class Autogenerate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenre: "",
    };
  }

  handleChange = (e) => {
    let currentGenre = e.target.value;
    this.setState({
      selectedGenre: currentGenre,
    });
    this.props.onGenreChange(currentGenre);
    console.log(currentGenre);
  };

  render() {
    return (
      <div>
        <FormControl>
          <InputLabel id="genre-select-label">Select...</InputLabel>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            value={this.state.selectedGenre}
            onChange={this.handleChange}
          >
            <MenuItem value="disco">Disco/Techno/EDM</MenuItem>
            <MenuItem value="rockRoll1">Rock and Roll 1</MenuItem>
            <MenuItem value="rockRoll2">Rock and Roll 2</MenuItem>
            <MenuItem value="hipHop1">Funk/Hip-Hop</MenuItem>
            <MenuItem value="hipHop2">Hip-Hop 2</MenuItem>
            <MenuItem value="afroCuban1">Afro/Cuban</MenuItem>
            <MenuItem value="afroCuban2">Afro/Cuban 2</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default Autogenerate;
