const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const loadingText = document.getElementById('loading-text')!;

const resize = () =>
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

const frame = () =>
{
    requestAnimationFrame(frame);

    console.log('frame');
};

frame();