import { Engine } from './engine';

let engine: Engine;

window.onload = () => {
    engine = new Engine();
    engine.start();
};

window.onresize = () => {
    engine.resize();
};
