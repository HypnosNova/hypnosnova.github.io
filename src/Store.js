import { createStore } from 'redux';
import reducer from './Reducer.js';

const initValues = {
  "topBar": [{ "name": { "en": "Home", "zh": "主页" }, url: "/" }, { "name": { "en": "API", "zh": "API" }, url: "/api/" }, { "name": { "en": "Examples", "zh": "实例" }, url: "/examples/" }, { "name": { "en": "Tutorials", "zh": "教程" }, url: "/tutorial/" }],
  "homeMenu": [{ "name": "" }],
  "backgroundShader": "",
  "language": "en"
};

const store = createStore(reducer, initValues);

export default store;
