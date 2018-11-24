let engine: Arch.Engine;

window.onload = () => {
    engine = new Arch.Engine(null, 320, 480);
    engine.start();
};

window.onresize = () => {
    engine.resize();
};
