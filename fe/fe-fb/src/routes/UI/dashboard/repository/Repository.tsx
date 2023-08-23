import React from "react";
import classes from "./repository.module.css";
import avt from "../../../../assets/avatar.jpg";
import Input from "../../../../components/input";
import CardRep from "./CardRep";
const Repository = (props: any) => {
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
        <h4>{props.title}</h4>
      </div>
      <div className={classes.repositoryItem}>
        <div className={classes.repositoriTitle}>
          <p>{props.topRep}</p>
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
    </div>
  );
};

export default Repository;
