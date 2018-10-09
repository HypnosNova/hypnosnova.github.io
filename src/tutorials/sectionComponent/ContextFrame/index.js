import React from "react";
import PorpTypes from "prop-types";
import { Anchor } from 'antd';
import "./style.css";
import '../Paragraph/style.css';
const { Link } = Anchor;

export function ContextFrame(props) {
    return <div>
        <div style={{ width: `calc(100% - ${props.sideWidth}px`, float: "left", maxHeight: "calc(100vh - 108px)" }}>{props.children}</div>
        <Anchor className="anchorList" style={{ width: "180px" }}>
            {
                props.children.map(obj => {
                    return obj.props.title ? <Link href={"#" + obj.props.title} title={obj.props.title} key={obj.props.title} /> : obj.props.subtitle ? <div className="intend20" key={obj.props.subtitle}><Link href={"#" + obj.props.subtitle} title={obj.props.subtitle} /></div> : false
                })
            }
        </Anchor>
    </div>
}

ContextFrame.propTypes = {
    sideWidth: PorpTypes.number.isRequired
}