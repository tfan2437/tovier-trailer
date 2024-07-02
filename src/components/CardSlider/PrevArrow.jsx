import prevIcon from "../../assets/icon-arrow-left.png";

const PrevArrow = ({ className, onClick }) => {
  return <img src={prevIcon} alt="" className={className} onClick={onClick} />;
};

export default PrevArrow;
