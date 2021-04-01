import "./Chat.css";

const Participants = ({ el, index }) => {
  return (
    <div className="chat-text-box" key={index}>
      <span className="user-name" style={{ color: el.random_color }}>
        {el.name}
      </span>{" "}
      <span>{el.text}</span>
      {/* <span className="message-date">
      {formattedDate(el.createdAt)}
    </span> */}
    </div>
  );
};

export default Participants;
