import { useState } from "react";
import Button from "../../../../components/Button";
import MainContainer from "../../../../components/Home/main-container";
import Card from "../../../../components/UI/Card";
import Spinner from "../../../../components/UI/spinner";
import { datahome } from "../../../../lib/Data/Home";
import classes from "./Foryou.module.css";
const Foryou = (): JSX.Element => {
  const [load, setLoad] = useState<Boolean>(false);
  const handleLoad = () => {
    setLoad((pre) => !pre);
  };
  return (
    <MainContainer>
      {datahome.map(({ ...data }, idx) => (
        <div key={idx}>
          <Card {...data}></Card>
        </div>
      ))}
      <div className={classes.loader}>
        {load ? (
          <Spinner setLoad={setLoad}></Spinner>
        ) : (
          <Button name="Load more" onClick={handleLoad}></Button>
        )}
      </div>
    </MainContainer>
  );
};

export default Foryou;
