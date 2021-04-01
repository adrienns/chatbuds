import "./Chat.css";

const Participants = ({ el, index }) => {
  return (
    <div className="participant-name-text" key={index}>
      <span
        style={{ background: el.random_color }}
        className="participant-name-dot"
      ></span>
      <span> {el.name}</span>
    </div>
  );
};

export default Participants;
