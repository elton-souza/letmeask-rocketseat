import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss";

interface Props {
  code: string;
}
export function RoomCode({ code }: Props) {

  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code);
  };
  
  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </button>
  );
}
