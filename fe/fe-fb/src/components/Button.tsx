import Icon from "./Icon/Icon";
import classess from "./Button.module.css";
const Button = (props: any) => {
  return (
    <button className={classess.buttonBox} onClick={props.onClick}>
      <p className={classess.text}>{props.name}</p>
    </button>
  );
};

export default Button;
