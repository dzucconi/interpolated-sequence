import { FrameInterval } from "frame-interval";
import { configure } from "queryparams";
import { uid } from "./lib/uid";
import { rand } from "./lib/rand";
import { tag } from "./lib/dom";

const DOM = {
  app: document.getElementById("root"),
};

const STATE: Record<string, number> = {};

const creator =
  (size: number) =>
  (n: number, randomize: boolean): [string, CanvasRenderingContext2D] => {
    const id = `canvas_${uid()}`;

    const node = tag(
      "div",
      { klass: "container" },
      ` <canvas id='${id}' width='${n}' height='${n}'></canvas>
  `
    );

    if (size) {
      node.style.width = `${size}px`;
      node.style.height = `${size}px`;
    }

    DOM.app.appendChild(node);

    DOM[id] = document.getElementById(id);
    STATE[id] = randomize ? rand(-1, 9) : -1;

    const ctx = (DOM[id] as HTMLCanvasElement).getContext("2d");

    ctx.font = `${n}px 'Helvetica Neue', sans-serif`;
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    return [id, ctx];
  };

const update = ([id, ctx]: [string, CanvasRenderingContext2D]) => {
  if (STATE[id] === 9) STATE[id] = 0;

  STATE[id]++;

  ctx.clearRect(0, 0, DOM[id].width, DOM[id].height);
  ctx.fillText(String(STATE[id]), DOM[id].width / 2, DOM[id].height / 2);
};

const { params } = configure({
  fps: 60,
  amount: 10,
  offset: 1,
  step: 1,
  randomize: false,
});

const create = creator(
  Math.min(window.innerWidth / params.amount, window.innerHeight)
);

const handles = Array(params.amount)
  .fill(undefined)
  .map((_, n) => {
    const step = n === 0 ? 1 : params.step;
    return create((n + params.offset) * step, params.randomize);
  });

const fi = new FrameInterval(params.fps, () => handles.forEach(update));

fi.start();
