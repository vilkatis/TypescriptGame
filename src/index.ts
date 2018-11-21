let engine: Arch.Engine;

window.onload = () => {
    engine = new Arch.Engine();
    engine.start();
};

window.onresize = () => {
    engine.resize();
};
