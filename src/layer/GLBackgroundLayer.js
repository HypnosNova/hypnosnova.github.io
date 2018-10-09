import Layer from "./Layer";
import * as NOVA from "nova-three";
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

export default class GLBackgroundLayer extends Layer {
    constructor(props) {
        super(props);
        this.initThree();
    }

    initThree() {
        this.app = new NOVA.App();
        if (this.props.World) {
            this.app.world = new this.props.World(this.app);
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        let dom = ReactDom.findDOMNode(this);
        dom.appendChild(this.app.renderer.domElement);
    }
}

GLBackgroundLayer.propTypes = {
    World: PropTypes.func.isRequired
}