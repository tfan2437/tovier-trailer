import "./LoadingAnimation.css";

const LoadingAnimation = ({ height }) => {
  return (
    <div className="animation-container" style={{ height: height }}>
      <div className="animation-wrapper">
        <ul className="animation-list">
          {Array.from({ length: 25 }, (_, i) => (
            <li key={i} className="animation-item"></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoadingAnimation;
