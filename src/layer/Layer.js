import "./style.css";
import React, { Component } from "react";

export default class Layer extends Component {
  render() {
    return (
      <div
        className="docBackground"
        style={{ zIndex: this.props.zIndex === undefined ? 0 : this.props.zIndex }}
      >
        {this.props.children}
      </div>
    );
  }
}
