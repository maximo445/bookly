import "./MainContainer.css";

function MainContainer({ children }) {
  return (
    <div className="mainContainer">
      <div className="innerContainer">{children}</div>
    </div>
  );
}

export default MainContainer;
