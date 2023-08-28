import React, { useState } from "react";
import classes from "./NewRpository.module.css";
import InputCreate from "../../../../components/InputCreate";
import avt from "../../../../assets/avatar.jpg";
import Icon2 from "../../../../components/Icon2";
function NewRepository() {
  const [findRepo, SetFindRepo] = useState<boolean>(false);
  const handleFindRepo = () => {
    SetFindRepo((e: boolean) => !e);
  };
  const data = [
    {
      name: "NNQA",
    },
    {
      name: "QANN",
    },
  ];
  return (
    <div className={classes.newContain}>
      <form>
        <div className={classes.titleRepo}>
          <h3>Create a new repository</h3>
          <p className={classes.policy}>
            A repository contains all project files, including the revision
            history. Already have a project repository elsewhere?
          </p>
          <span>Import a repository.</span>
        </div>
        <div className={classes.createNewRepo}>
          <i className={classes.messageRequired}>
            Required fields are marked with an asterisk (*).
          </i>

          <div className={classes.namedRepo}>
            <div>
              <p>Owner*</p>
              <div className={classes.fieldsRepo} onClick={handleFindRepo}>
                <img src={avt} alt="" />
                <div>NNQA</div>
                <Icon2 icon="ChevronDownIcon"></Icon2>
              </div>
              {findRepo ? (
                <div className={classes.filterRepo}>
                  <div>
                    <InputCreate input={{}}></InputCreate>
                  </div>
                  <div className={classes.cotainerlookinforRepo}>
                    {data.map((i, idx) => (
                      <div className={classes.lookinForRepo} key={idx}>
                        <img src={avt} alt="" />
                        <div>{i.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <p className={classes.slash}>/</p>
            <div>
              <p>Repository name*</p>
              <InputCreate input={{}}></InputCreate>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewRepository;
