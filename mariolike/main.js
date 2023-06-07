var config = {
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 1000 },
            estSolide:true
        }
    },
    input: { gamepad: true },

    scene: [Menu,niveaumarathon,],

    pixelArt : true ,
} 
var game =  new Phaser.Game(config);