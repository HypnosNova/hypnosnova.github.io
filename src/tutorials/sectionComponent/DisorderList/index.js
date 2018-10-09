import React from "react";
import "./style.css";

export function DisorderList(props) {
    return <ul className="listUl">
        {
            props.data.map((obj, index) => {
                let language = props.language;
                return <li className="listText" key={index}><b>{obj.title[language]}:&nbsp;</b>{obj.text[language]}</li>
            })
        }
    </ul>
}