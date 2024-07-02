import nextIcon from "../../assets/icon-arrow-right.png";

const NextArrow = ({ className, onClick }) => {
  return <img src={nextIcon} alt="" className={className} onClick={onClick} />;
};

export default NextArrow;
