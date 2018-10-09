import React from "react";
import { Layout } from 'antd';
import './style.css';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import 'rc-texty/assets/index.css';
import ReactVivus from 'react-vivus';
import npmSVG from './npm.svg';
import githubSVG from './github.svg';
import '../tutorials/sectionComponent/DragonHead/style.css';
import '../tutorials/style.css';

const LANGUAGE = {
    INTRO: {
        zh: "一个为Three.js开发的轻量级高性能的框架",
        en: "A lightweight and fast framework for Three.js"
    }
}

class HomePage extends React.Component {
    render() {
        return (
            <Layout>
                <div className="nameNeon"><p>Nova.js</p></div>
                <div className="texty-demo discription">
                    <div>{LANGUAGE.INTRO[this.props.language]}</div>
                    <div style={{ width: "100%", marginTop: "150px" }}>
                        <ReactVivus
                            id="npm"
                            option={{
                                file: npmSVG,
                                animTimingFunction: 'EASE',
                                type: 'oneByOne',
                                delay: 0
                            }}
                            style={{ height: '150px', width: '150px', position: "fixed", left: "35%", transform: "translate(-50%, -50%)" }}
                        />
                        <ReactVivus
                            id="github"
                            option={{
                                file: githubSVG,
                                animTimingFunction: 'EASE',
                                type: 'oneByOne',
                                delay: 0
                            }}
                            style={{ height: '100px', width: '100px', position: "fixed", left: "65%", transform: "translate(-50%, -50%)" }}
                        />
                    </div>
                </div>
            </Layout>
        );
    }
}

HomePage.propTypes = {
    homeMenu: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return { homeMenu: state.homeMenu, language: state.language };
}


export default connect(mapStateToProps)(HomePage);