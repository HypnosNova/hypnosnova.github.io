import React from "react";
import PorpTypes from "prop-types";
import "./style.css";

export function Paragraph(props) {
    return <div className="paragraph">
        {
            props.title ? <h1 className="ParagraphH1" id={props.title}>{props.title}</h1> : undefined
        }
        {
            props.subtitle ? <h2 className="ParagraphH1" id={props.subtitle}>{props.subtitle}</h2> : undefined
        }
        {
            props.discription ? <div className="Context" id={props.discription}>{props.discription}</div> : undefined
        }
        {
            props.children
        }
        {
            props.hr ? <hr className="ParagraphHr" /> : undefined
        }
    </div>
}

Paragraph.propTypes = {
    title: PorpTypes.oneOfType([PorpTypes.string, PorpTypes.bool]).isRequired,
    discription: PorpTypes.oneOfType([PorpTypes.string, PorpTypes.bool]).isRequired
}
