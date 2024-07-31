
/*import { Application } from 'pixi.js';

const app = new Application();

await app.init({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.canvas);*/
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({height: 600, width: 700});
globalThis.__PIXI_APP__ = app;
// add to dom
document.body.appendChild(app.view);
