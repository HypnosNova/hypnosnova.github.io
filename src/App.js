import React, { Component } from "react";
import "./App.css";
import Layer from "./layer/Layer";
import GLBackgroundLayer from "./layer/GLBackgroundLayer";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home/Home";
import ExamplePage from "./examples/ExamplePage";
import ApiDocs from "./docs/ApiDocs";
import TutorialPage from "./tutorials/TutorialPage";
import { Provider } from "react-redux";
import store from "./Store";
import TopBar from "./topBar/TopBar";
import BackgroundWorld from "./three/BackgroundWorld/BackgroundWorld";
import { Layout } from 'antd';

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div>
						<GLBackgroundLayer zIndex={-1} World={BackgroundWorld} />
						<Layer zIndex={1}>
							<Layout>
								<TopBar />
								<Route path="/" exact component={Home} />
								<Route path="/home" component={Home} />
								<Route path="/tutorial" component={TutorialPage} />
								<Route path="/api" component={ApiDocs} />
								<Route path="/examples" component={ExamplePage} />
							</Layout>
						</Layer>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}
