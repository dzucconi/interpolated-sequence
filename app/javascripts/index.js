import fps from 'frame-interval';
import parameters from 'queryparams';
import uid from './lib/uid';
import rand from './lib/rand';
import * as dom from './lib/dom';

window.parameters = parameters;

const DOM = window.DOM = {
  app: document.getElementById('app'),
};

const STATE = window.STATE = {};

const creator = size => (n, randomize) => {
  const id = `canvas_${uid()}`;

  const tag = dom.tag('div', { klass: 'container' }, `
    <canvas id='${id}' width='${n}' height='${n}'></canvas>
  `);

  if (size) {
    tag.style.width = `${size}px`;
    tag.style.height = `${size}px`;
  }

  DOM.app.appendChild(tag);

  DOM[id] = document.getElementById(id);
  STATE[id] = randomize ? rand(-1, 9) : -1;

  const ctx = DOM[id].getContext('2d');

  ctx.font = `${n}px 'Helvetica Neue', sans-serif`;
  ctx.fillStyle = 'white';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  return [id, ctx];
};

const update = ([id, ctx]) => {
  if (STATE[id] === 9) STATE[id] = 0;

  STATE[id]++;

  ctx.clearRect(0, 0, DOM[id].width, DOM[id].height);
  ctx.fillText(STATE[id], (DOM[id].width / 2), (DOM[id].height / 2));
};

export default () => {
  const CONFIG = parameters({
    fps: 60,
    amount: 10,
    offset: 1,
    step: 1,
    randomize: false,
  });

  const create = creator(Math.min((window.innerWidth / CONFIG.amount), window.innerHeight));

  const handles = Array(CONFIG.amount).fill(undefined).map((_, n) => {
    const step = n === 0 ? 1 : CONFIG.step;
    return create(((n + CONFIG.offset) * step), CONFIG.randomize);
  });

  fps(requestAnimationFrame)(CONFIG.fps, () => handles.forEach(update))();
};
