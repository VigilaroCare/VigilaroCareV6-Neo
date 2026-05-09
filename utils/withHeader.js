import React from "react";
import HeaderNav from "../components/HeaderNav.js";
export default function withHeader(Component, titulo = null) {
  return function (props) {
    return (
      <>
        <HeaderNav titulo={titulo || props.route.name} />
        <Component {...props} />
      </>
    );
  };
}
