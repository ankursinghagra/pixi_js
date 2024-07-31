
/*import { Application } from 'pixi.js';

const app = new Application();

await app.init({ background: '#1099bb', resizeTo: window });
document.body.appendChild(app.canvas);*/


import * as PIXI from 'pixi.js';

const app = new PIXI.Application({height: window.innerHeight, width: window.innerWidth, resizeTo: window});
globalThis.__PIXI_APP__ = app;
// add to dom
document.body.appendChild(app.view);

//loading
const loader = PIXI.Loader.shared;
loader.add('TilesetField', 'assets/backgrounds/TilesetField.json');
loader.add('TilesetField_image', 'assets/backgrounds/TilesetField.png');
const sprites = {};

var home_container = new PIXI.Container();

loader.load((loader:any, resources:any) => {
    const sheet = new PIXI.Spritesheet(resources.TilesetField_image.texture, resources.TilesetField.data);
    sheet.parse();
    let sprite1 = new PIXI.Sprite(sheet.textures["TilesetField1_big.png"]);
    //sprite1.scale.set(5,5);
    sprite1.position.set(0,0);
    home_container.addChild(sprite1);
    let sprite2 = new PIXI.Sprite(sheet.textures["TilesetField1_pattern.png"]);
    //sprite2.scale.set(5,5);
    home_container.addChild(sprite2);
	app.stage.addChild(home_container);
});

