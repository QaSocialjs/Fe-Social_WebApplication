import Icon from "./Icon";
import classess from "./Button.module.css";
const Button = (props: any) => {
  return (
    <div className={classess.buttonBox} onClick={props.onClick}>
      <Icon icon="PlusIcon"></Icon>
      <p className={classess.text}>New</p>
    </div>
  );
};

export default Button;
