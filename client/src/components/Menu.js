import React from "react";
import { createPortal } from "react-dom";

const Menu = (props) => {
    
    return props.isopen
        ? createPortal(
              <div className="menu">
                  <div className="menu__body">
                      {props.title}
                      {props.content}
                      {props.actions}
                  </div>
                  <div
                      onClick={props.closeModal}
                      className="menu__overlay"
                  ></div>
              </div>,
              document.querySelector("#menu-root")
          )
        : null;
};

export default Menu;
