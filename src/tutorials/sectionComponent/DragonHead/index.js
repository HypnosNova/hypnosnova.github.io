import React from "react";
import PorpTypes from "prop-types";
import "./style.css";

export function DragonHead(props) {
    return <div>
        <h1 className="DragonH1" id={props.title}>{props.title}</h1>
        <div className="DragonDiscription">{props.discription}</div><br /><hr className="DragonHr" />
    </div>
}

DragonHead.propTypes = {
    title: PorpTypes.oneOfType([PorpTypes.string, PorpTypes.bool]).isRequired,
    discription: PorpTypes.oneOfType([PorpTypes.string, PorpTypes.bool]).isRequired
}
