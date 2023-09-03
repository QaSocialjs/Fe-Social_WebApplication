import classes from "./Title.module.css";
const TitleHeader = (props: any) => {
  return (
    <div className={classes.titleHeader}>
      <p>{props.name}</p>
    </div>
  );
};

export default TitleHeader;
