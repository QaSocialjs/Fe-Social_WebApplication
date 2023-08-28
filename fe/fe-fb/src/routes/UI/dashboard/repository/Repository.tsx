import React from "react";
import classes from "./repository.module.css";
import avt from "../../../../assets/avatar.jpg";
import Input from "../../../../components/input";
import CardRep from "./CardRep";
import Button from "../../../../components/Button";
import { Outlet, useNavigate } from "react-router-dom";
const Repository = (props: any) => {
  const navigate = useNavigate();
  const handleNaigate = () => {
    navigate("/Dashboard/New");
  };
  const list = [
    {
      name: "NNQA/sadsad",
    },
    {
      name: "NNQA/quocanhasdhsakhdhk",
    },
    {
      name: "NNQA/yeuem the",
    },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.infoUser}>
        <img src={avt} alt="" className={classes.avatar} />
        <h4>NNQA</h4>
      </div>
      <div className={classes.repositoryItem}>
        <div className={classes.repositoriTitle}>
          <p>Top Repository</p>
          <Button onClick={handleNaigate}></Button>
        </div>
        <div className={classes.findRep}>
          <Input
            input={{
              id: "search",
              type: "search",
              name: "search",
              placeholder: "Find a repository",
            }}
          ></Input>
        </div>
        <div className={classes.repListItem}>
          {list.map((item, idx) => (
            <div key={idx}>
              <CardRep name={item.name}></CardRep>
            </div>
          ))}
        </div>
        <div className={classes.showMore}>
          <p>Show more</p>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Repository;
