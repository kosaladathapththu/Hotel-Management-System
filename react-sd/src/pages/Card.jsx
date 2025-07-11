function Card({ heading, content, handleButtonClick }) {
  return (
    <div>
      <h2>{heading}</h2>
      <p>{content}</p>
      <button onClick={handleButtonClick}>Click Me</button>
      <hr />
    </div>
  );
}

export default Card;
