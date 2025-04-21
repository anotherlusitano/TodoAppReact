import React from "react";

export default function FeatureButton(props) {
  return (
    <button
      style={props.toggleFeature ? { display: "inline" } : { display: " none" }}
      onClick={props.feature}
    >
      {props.children}
    </button>
  );
}
