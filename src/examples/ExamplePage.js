import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "./style.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PAGE_LIST from "./pageList";
import { Button } from 'antd';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/terminal';
import '../home/style.css';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
let loopTmp = undefined;

const LANGUAGE = {
	EXAMPLES: {
		zh: "实例",
		en: "Examples"
	},
	RESULT: {
		zh: "运行结果",
		en: "Result"
	},
	CODE: {
		zh: "代码",
		en: "Code"
	}
}

class ExamplePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			localUrl: [],
			currentCode: "",
			showCode: false
		}
	}

	linkClick(obj, type, father) {
		this.setState({
			localUrl: [father, type, obj[0]]
		});

		fetch(obj[1] + ".html").then((response) => {
			return response.text();
		}).then((code) => {
			this.setState({
				currentCode: code
			});
		});
	}

	onAceChange(newValue) {
		this.setState({
			currentCode: newValue
		});
	}

	changeShowCode() {
		this.setState({
			showCode: !this.state.showCode
		});
	}

	render() {
		return (
			<Layout>
				<Layout>
					<Sider
						width={200}
						style={{ height: "calc(100vh - 64px)", overflowY: "auto", overflowX: "hidden" }}
						className="leftSlide"
					>
						<Menu
							mode="inline"
							defaultSelectedKeys={["1"]}
							defaultOpenKeys={["Core"]}
							className="firstTitle"
							style={{
								height: "100%",
								borderRight: 0
							}}
						>
							{Object.keys(PAGE_LIST).map(key => {
								return (
									<SubMenu key={key} title={<span>{PAGE_LIST[key][this.props.language]}</span>}>
										{PAGE_LIST[key].data.map(obj => {
											if ( obj instanceof Array ) {
												return <Menu.Item className="linkBtn" key={obj[0][this.props.language]} onClick={this.linkClick.bind(this, obj, loopTmp, PAGE_LIST[key])}>{obj[0][this.props.language]}</Menu.Item>;
											} else {
												loopTmp = obj;
												return (
													<Menu.Item className="subTitle" key={obj[this.props.language]}>
														<p style={{marginTop:"-5px"}}>{obj[this.props.language]}</p>
													</Menu.Item>
												);
											}
										})}
									</SubMenu>
								);
							})}
						</Menu>
					</Sider>
					<Layout style={{ padding: "0 24px 24px" }}>
						<Breadcrumb style={{ margin: "16px 0" }}>
							<Breadcrumb.Item>{LANGUAGE.EXAMPLES[this.props.language]}</Breadcrumb.Item>
							{
								this.state.localUrl.map((name) => {
									if(typeof name === "string"){
										return <Breadcrumb.Item key={name}>{name}</Breadcrumb.Item>;
									}else{
										return <Breadcrumb.Item key={name[this.props.language]}>{name[this.props.language]}</Breadcrumb.Item>;
									}
								})
							}
						</Breadcrumb>
						<Content className="viewContainer" >
							<Button type="primary" ghost style={{ position: "fixed", marginTop: "-42px", right: "28px" }} onClick={this.changeShowCode.bind(this)}>{(this.state.showCode ? LANGUAGE.RESULT : LANGUAGE.CODE)[this.props.language]}</Button>
							<iframe style={{ display: this.state.showCode ? "none" : "block" }} className="viewFrame" srcDoc={this.state.currentCode} title="code-view"></iframe>
							<AceEditor
								value={this.state.currentCode}
								style={{ width: "100%", height: "calc(100vh - 146px)", background: "rgba(0,0,0,0.5)", display: this.state.showCode ? "block" : "none" }}
								mode="html"
								theme="terminal"
								onChange={this.onAceChange.bind(this)}
								name="UNIQUE_ID_OF_DIV"
								enableBasicAutocompletion={true}
								enableSnippets={true}
								enableLiveAutocompletion={true}
								fontSize={20}
								editorProps={{ $blockScrolling: true }}
							/>
						</Content>
					</Layout>
				</Layout>
			</Layout>
		);
	}
}

ExamplePage.propTypes = {
	homeMenu: PropTypes.array.isRequired,
	language: PropTypes.string.isRequired
};

function mapStateToProps(state) {
	return { homeMenu: state.homeMenu, language: state.language };
}

export default connect(mapStateToProps)(ExamplePage);
