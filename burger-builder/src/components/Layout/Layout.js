import React from "react";
import Aux from "../../hoc/Aux";
import LayoutStyle from "./Layout.module.css"

const layout = (props) => (
  <Aux>
    <div>Toolbar, sidedrawer, backdrop</div>
    <main className={LayoutStyle.Content}>{props.children}</main>
  </Aux>
);

export default layout;
