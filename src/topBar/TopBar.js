import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Menu, Layout, Dropdown, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import * as Actions from "./../Actions";
const { Header } = Layout;

const LANGUAGE = {
	LANGUAGE: {
		zh: "语言",
		en: "Language"
	},
	EDITOR:{
		zh: "编辑器",
		en: "Editor"
	}
};

class TopBar extends React.Component {
	render() {
		return (
			<Header className="header">
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={["/"]}
					selectedKeys={[this.props.location.pathname]}
					style={{ lineHeight: "64px" }}
				>
					{this.props.topBar.map((obj) => {
						return (
							<Menu.Item key={obj.url}>
								<Link to={obj.url}>{obj.name[this.props.language]}</Link>
							</Menu.Item>
						);
					})}
					<Menu.Item key="Editor">
						<a href="http://www.baidu.com" target="blank">{LANGUAGE.EDITOR[this.props.language]}</a>
					</Menu.Item>
					<Menu.Item key="Language" style={{ float: "right" }}>
						<Dropdown overlay={<Menu onClick={(item) => {
							this.props.changeLanguage(item.key);
						}}>
							<Menu.Item key="zh">
								<span>简体中文</span>
							</Menu.Item>
							<Menu.Item key="en">
								<span>English</span>
							</Menu.Item>
						</Menu>} trigger={['click']}>
							<a className="ant-dropdown-link">
								{LANGUAGE.LANGUAGE[this.props.language]} <Icon type="down" />
							</a>
						</Dropdown>
					</Menu.Item>
				</Menu>
			</Header>
		);
	}
}

TopBar.propTypes = {
	topBar: PropTypes.array.isRequired,
	location: PropTypes.object.isRequired,
	language: PropTypes.string.isRequired,
	changeLanguage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return { topBar: state.topBar, language: state.language };
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		changeLanguage: (str) => {
			dispatch(Actions.changeLanguage(str));
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopBar));
