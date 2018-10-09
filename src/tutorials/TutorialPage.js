import React from "react";
import { Layout, Menu, Breadcrumb, Tag, Tabs  } from 'antd';
import "./style.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "../home/style.css";
import PAGE_LIST from "./pageList";
import Highlight from 'react-highlight';
import { ContextFrame } from "./sectionComponent/ContextFrame";
import { DisorderList } from './sectionComponent/DisorderList';
import { DragonHead } from './sectionComponent/DragonHead';
import { Paragraph } from './sectionComponent/Paragraph';
import './tomorrow-night-bright.css';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const TabPane = Tabs.TabPane;
const LANGUAGE = {
	TUTORIAL: {
		"zh": "教程",
		"en": "Tutorials"
	}
}

class TutorialPage extends React.Component {

	constructor(props) {
		super(props);
		this.rootSubmenuKeys = ["Thinking in Nova", "Beginning"];
		this.state = {
			localUrl: [{
				en: "Thinking in Nova",
				zh: "Nova编程思想"
			}, {
				"en": "Introduction",
				"zh": "简介"
			}],
			currentCode: "",
			showCode: false,
			openKeys: ["Thinking in Nova"],
			pageInfo: {}
		};
	}

	linkClick(obj, type, father) {
		fetch("../tutorials/" + obj[1] + ".json").then((data) => {
			return data.json();
		}).then((json) => {
			this.setState({
				localUrl: [father, type, obj[0]],
				pageInfo: json
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

	onOpenChange(openKeys) {
		const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
		if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({ openKeys });
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		}
	}

	createPageElement() {
		if (!this.state.pageInfo.type) {
			return;
		}
		return <ContextFrame sideWidth={this.state.pageInfo.sideWidth}>{
			this.state.pageInfo.children.map((obj, key) => {
				return this.createOneElement(obj, key);
			})
		}</ContextFrame>;
	}

	createOneElement(obj, key) {
		let language = this.props.language;
		switch (obj.type) {
			case "DragonHead":
				return <DragonHead key={key} title={obj.title ? obj.title[language] : false} discription={obj.discription ? obj.discription[language] : false}></DragonHead>
			case "Paragraph":
				return <Paragraph hr={obj.hr} key={key} title={obj.title ? obj.title[language] : false} subtitle={obj.subtitle ? obj.subtitle[language] : false} discription={obj.discription ? obj.discription[language] : false}>{
					!obj.children ? false : <span>{
						obj.children.map((child, index) => {
							return this.createOneElement(child, index);
						})
					}</span>
				}</Paragraph>
			case "DisorderList":
				return <DisorderList key={key} language={language} data={obj.data}></DisorderList>
			case "Tag":
				return <Tag key={key} color={obj.color}>{
					!obj.children ? false : <span>{
						obj.children.map((child, index) => {
							return this.createOneElement(child, index);
						})
					}</span>
				}</Tag>
			case "Text":
				return <span key={key}>{obj.text[language]}</span>
			case "A":
				return <a key={key} target={obj.target} href={obj.href}>{obj.text[language]}</a>
			case "Highlight":
				return <Highlight key={key} language={obj.language}>{obj.code}</Highlight>
			case "Tab":
				return <Tabs defaultActiveKey="0">{
					obj.children.map((child, index) => {
						return <TabPane tab={child.tabName[language]} key={index}>{this.createOneElement(child, index)}</TabPane>
					})
				}</Tabs>
			default:
				return false;
		}
	}

	render() {
		return (
			<Layout>
				<Sider
					width={200}
					style={{
						height: "calc(100vh - 64px)",
						overflowY: "auto",
						overflowX: "hidden"
					}}
					className="leftSlide"
				>
					<Menu
						mode="inline"
						defaultSelectedKeys={["Introduction"]}
						openKeys={this.state.openKeys}
						onOpenChange={this.onOpenChange}
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
										return (
											<Menu.Item
												className="linkBtn"
												key={obj[0][this.props.language]}
												onClick={this.linkClick.bind(this, obj, PAGE_LIST[key])}
											>
												{obj[0][this.props.language]}
											</Menu.Item>
										);
									})}
								</SubMenu>
							);
						})}
					</Menu>
				</Sider>
				<Layout style={{ padding: "0 12px 24px", maxHeight: "calc(100vh - 64px)" }}>
					<Breadcrumb style={{ margin: "16px 0" }}>
						<Breadcrumb.Item key="tutorials">{LANGUAGE.TUTORIAL[this.props.language]}</Breadcrumb.Item>
						{this.state.localUrl.map((name, index) => {
							return <Breadcrumb.Item key={index}>{name[this.props.language]}</Breadcrumb.Item>;
						})}
					</Breadcrumb>
					<Content className="viewContainer">{
						this.createPageElement()
					}</Content>
				</Layout>
			</Layout>
		);
	}
}

TutorialPage.propTypes = {
	homeMenu: PropTypes.array.isRequired,
	language: PropTypes.string.isRequired
};

function mapStateToProps(state) {
	return { homeMenu: state.homeMenu, language: state.language };
}

export default withRouter(connect(mapStateToProps)(TutorialPage));
