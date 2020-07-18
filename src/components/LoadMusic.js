import Tone from "tone";
// Piano
import A_piano from "../music/piano/A2.mp3";
import B_piano from "../music/piano/B2.mp3";
import C_piano from "../music/piano/C2.mp3";
import D_piano from "../music/piano/D2.mp3";
import E_piano from "../music/piano/E2.mp3";
import F_piano from "../music/piano/F2.mp3";
import G_piano from "../music/piano/G2.mp3";
// Acoustic Guitar
import A_guitar from "../music/acoustic_guitar/A2.mp3";
import B_guitar from "../music/acoustic_guitar/B2.mp3";
import C_guitar from "../music/acoustic_guitar/C2.mp3";
import D_guitar from "../music/acoustic_guitar/D2.mp3";
import E_guitar from "../music/acoustic_guitar/E2.mp3";
import F_guitar from "../music/acoustic_guitar/F2.mp3";
import G_guitar from "../music/acoustic_guitar/G2.mp3";
// Saxophone
import A_saxophone from "../music/saxophone/A3.mp3";
import B_saxophone from "../music/saxophone/B2.mp3";
import C_saxophone from "../music/saxophone/C3.mp3";
import D_saxophone from "../music/saxophone/D2.mp3";
import E_saxophone from "../music/saxophone/E2.mp3";
import F_saxophone from "../music/saxophone/F2.mp3";
import G_saxophone from "../music/saxophone/G2.mp3";
// Harp
import A_harp from "../music/harp/A2.mp3";
import B_harp from "../music/harp/B3.mp3";
import C_harp from "../music/harp/C3.mp3";
import D_harp from "../music/harp/D2.mp3";
import E_harp from "../music/harp/E3.mp3";
import F_harp from "../music/harp/F2.mp3";
import G_harp from "../music/harp/G3.mp3";
// Cello
import A_cello from "../music/cello/A2.mp3";
import B_cello from "../music/cello/B2.mp3";
import C_cello from "../music/cello/C2.mp3";
import D_cello from "../music/cello/D2.mp3";
import E_cello from "../music/cello/E2.mp3";
import F_cello from "../music/cello/F2.mp3";
import G_cello from "../music/cello/G2.mp3";

function LoadMusic(instrument) {
  var instrumentNotes = {};
  switch(instrument){
    case 0:
      instrumentNotes = { "B2": B_piano, "A2": A_piano, "G2": G_piano, "F2": F_piano, "E2": E_piano, "D2": D_piano, "C2": C_piano };
      break;
    case 1:
      instrumentNotes = { "B2": B_guitar, "A2": A_guitar, "G2": G_guitar, "F2": F_guitar, "E2": E_guitar, "D2": D_guitar, "C2": C_guitar };
      break;
    case 2:
      instrumentNotes = { "B2": B_saxophone, "A3": A_saxophone, "G2": G_saxophone, "F2": F_saxophone, "E2": E_saxophone, "D2": D_saxophone, "C3": C_saxophone };
      break;
    case 3:
      instrumentNotes = { "B3": B_harp, "A2": A_harp, "G3": G_harp, "F2": F_harp, "E3": E_harp, "D2": D_harp, "C3": C_harp };
      break;
    case 4:
      instrumentNotes = { "B2": B_cello, "A2": A_cello, "G2": G_cello, "F2": F_cello, "E2": E_cello, "D2": D_cello, "C2": C_cello };
      break;
    default:
      instrumentNotes = { "B2": B_piano, "A2": A_piano, "G2": G_piano, "F2": F_piano, "E2": E_piano, "D2": D_piano, "C2": C_piano };
      break;
  }
  var sampler = new Tone.Sampler(
    instrumentNotes,
    {
      onload: () => {
        this.setState({loaded: { isLoaded: true }});
      }
    }
  );
  return sampler;
}

export default LoadMusic;