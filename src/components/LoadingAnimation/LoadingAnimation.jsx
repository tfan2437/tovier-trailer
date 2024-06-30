import "./LoadingAnimation.css";

const LoadingAnimation = () => {
  return (
    <div className="animation-container">
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
