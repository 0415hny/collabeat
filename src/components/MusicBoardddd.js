import React from "react";
import SoundSelector from "./SoundSelector";
import Slider from "@material-ui/core/Slider";
import Switch from "@material-ui/core/Switch";

class MusicBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 0,
      switchToggle: true,
    };
  }
  handleSliderChange = (event, newValue, trackId) => {
    this.setState({
      sliderValue: newValue,
    });
    this.props.updateTrackVolume(trackId, parseFloat(event.target.value));
  };
  handleMute = (event, trackId) => {
    this.setState({
      switchToggle: event.target.checked,
    });
    this.props.muteTrack(trackId);
  };
  render() {
    return (
      <tbody>
        {this.props.tracks.map((track, i) => {
          return (
            <tr key={i} className="track">
              <th>
                <SoundSelector
                  id={track.id}
                  current={track.name}
                  onChange={this.props.updateSoundSample}
                  samples={this.props.samples}
                />
              </th>
              {/* <td className="vol">
                <Slider
                  min={0}
                  max={1000}
                  step={1}
                  value={11}
                  onChange={(event, newValue) => {
                    this.handleSliderChange(event, newValue, track.id);
                  }}
                />
              </td> */}
              <td className="mute">
                <Switch
                  checked={!track.isMute}
                  onChange={(event) => this.handleMute(event, track.id)}
                  name="Mute"
                  value={this.state.switchToggle}
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default MusicBoard;
