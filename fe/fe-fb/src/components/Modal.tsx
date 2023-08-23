import React from "react";
import ReactDOM from "react-dom";

import classes from "./modal.module.css";

const BackDrop = (props: any) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};
const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalElement: Element | DocumentFragment | null =
  document.getElementById("overlays");
const Modal = (props: any) => {
  if (!portalElement) {
    // Handle the case when portalElement is null, e.g., show an error message or a default behavior
    return null;
  }

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop onClose={props.onClose}></BackDrop>,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};
export default Modal;
