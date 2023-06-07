

class niveaumarathon extends Phaser.Scene {
    constructor() {
        super('niveaumarathon');
    }

    init(data) {
    }
    preload() {
        this.load.tilemapTiledJSON("marathon", "nivgeneral.json");
        this.load.image("placeholder", "assets/placeholder.png");
        this.load.spritesheet('persoanimd', "assets/coursedroite.png", { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('persoanimg', 'assets/coursegauche.png', { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('energy', 'assets/spriteenergy-Sheet.png', { frameWidth: 125, frameHeight: 32 })
        this.load.image("canette", "assets/canette.png");
        this.load.image("banane", "assets/banane.png");
        this.load.image("barre", "assets/barrecereale.png");
    }

    create() {



        // CREATE MAP
        const map = this.add.tilemap("marathon");
        const tileset = map.addTilesetImage(
            "placeholder",
            "placeholder"
        );

        const eau = map.createLayer(
            "eaucalque",
            tileset
        );
        const boue = map.createLayer(
            "bouecalque",
            tileset
        );
        
        const terrain = map.createLayer(
            "terrain",
            tileset
        );
        this.bouffe = map.getObjectLayer(
            "bouffe",


        )
        this.boue = map.getObjectLayer(
            "boue",


        )
        this.eau = map.getObjectLayer(
            "eau",


        )
        this.banane = map.getObjectLayer(
            "banane",
        )
        this.barre = map.getObjectLayer(
            "barre",
        )
        const PORTES = map.createLayer(
            "PORTES",
            tileset
        );
        this.player = this.physics.add.sprite(70 * 32, 89 * 32, 'persoanimd');
        this.energy = this.add.sprite(100, 50, 'energy');
        this.energy.setScrollFactor(0)

        this.physics_bouffe = this.physics.add.group()
        this.bouffe.objects.forEach(canette => {
            this.physics_bouffe.create(canette.x, canette.y, 'canette')
        });
        this.physics_banane = this.physics.add.group()
        this.banane.objects.forEach(banane => {
            this.physics_banane.create(banane.x, banane.y, 'banane')
        });
        this.physics_barre = this.physics.add.group()
        this.barre.objects.forEach(barre => {
            this.physics_barre.create(barre.x, barre.y, 'barre')
        });
        this.listhitboxboue = []
        this.physics_boue = this.physics.add.group()
        console.log(this.boue.objects)
        this.boue.objects.forEach((boue, i) => {
            this.listhitboxboue[i] = this.add.rectangle(boue.x + boue.width / 2, boue.y + boue.height / 2, boue.width, boue.height)
            this.physics.add.existing(this.listhitboxboue[i], true)
            console.log(i)
            console.log(this.player)
            this.physics.add.overlap(this.player, this.listhitboxboue[i], glissant, null, this);
        })
        this.listhitboxeau = []
        this.physics_eau = this.physics.add.group()
        console.log(this.eau.objects)
        this.eau.objects.forEach((eau, i) => {
            this.listhitboxeau[i] = this.add.rectangle(eau.x + eau.width / 2, eau.y + eau.height / 2, eau.width, eau.height)
            this.physics.add.existing(this.listhitboxeau[i], true)
            this.physics.add.overlap(this.player, this.listhitboxeau[i], glissant, null, this);
        })


        terrain.setCollisionByProperty({ estSolide: true });

        //eau.setCollisionByProperty({glissant:true});
        //boue.setCollisionByProperty({glissant:true});

        // SPAWN JOUEUR


        ref = this
        mapref = map



        //CAMERA
        this.cameras.main.startFollow(this.player);

        //COLLIDER
        this.physics.add.collider(this.physics_bouffe, terrain);
        this.physics.add.collider(this.physics_banane, terrain);
        this.physics.add.collider(this.physics_barre, terrain);
        this.physics.add.collider(this.player, terrain);


        this.physics.add.overlap(this.player, this.physics_banane, collectible, null, this);
        this.physics.add.overlap(this.player, this.physics_barre, collectible, null, this);
        this.physics.add.overlap(this.player, this.physics_bouffe, collectible, null, this);
        //this.physics.add.overlap()



        //INPUT
        this.cursors = this.input.keyboard.createCursorKeys();
        this.clavier = this.input.keyboard.addKeys('SHIFT,E,A,SPACE');




        // ANIMATION

        this.anims.create({
            key: 'anim droite',
            frames: this.anims.generateFrameNumbers('persoanimd', { start: 0, end: 6 }),
            frameRate: 10,
        })
        this.anims.create({
            key: 'anim gauche',
            frames: this.anims.generateFrameNumbers('persoanimg', { start: 0, end: 6 }),
            frameRate: 10,
        })
        for (let i = 0; i < amountofenergy + 1; i++) {
            this.anims.create({
                key: 'energie' + i,
                frames: this.anims.generateFrameNumbers('energy', { start: i, end: i }),
                frameRate: 10,
            })
        }
        //idle


        //ANIMATION FIL FAIRE LES TRANSITIONS
        // this.anims.create({
        //     key: 'transi1',
        //     frames: this.anims.generateFrameNumbers('transi', { start: 0, end: 7 }),
        //     frameRate: 8,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'transi2',
        //     frames: this.anims.generateFrameNumbers('transi', { start: 7, end: 0 }),
        //     frameRate: 8,
        //     repeat: -1
        // });

    }



    update() {


        //                           DEPLACEMENT JOUEUR


        if (this.cursors.left.isDown && !this.onWallGauche && !walljump) { //si la touche gauche est appuyée


            this.player.setVelocityX(-250); //alors vitesse négative en X
            this.player.anims.play('anim gauche', true); //et animation => gauche
            if (boolboue == true) {
                console.log(boolboue)
                this.player.setVelocityY(0)
                this.player.setVelocityX(-50)
                setTimeout(() => {
                    boolboue = false
                }, 3000)
                
            }
            if(this.cursors.shift.isDown){
                this.player.setVelocityX(-450); 
                amountofenergy -= 0.5
              }
        }

        else if (this.onWallGauche && this.cursors.up.isDown) {
            walljump = true;
            this.player.setVelocityY(-450);
            this.player.setVelocityX(170); //alors vitesse positive en X
            this.player.anims.play('anim droite', true);
            this.onWallGauche = false;
            setTimeout(() => {
                walljump = false;
            }, 450);


        }

      else if (this.cursors.right.isDown && !this.onWallGauche && !walljump) { //sinon si la touche droite est appuyée
          this.player.setVelocityX(250); //alors vitesse positive en X
          this.player.anims.play('anim droite', true); //et animation => droite
          if (boolboue == true) {
              this.player.setVelocityY(0)
              this.player.setVelocityX(50)
              setTimeout(() => {
                  boolboue = false
              }, 3000)
          }
          if(this.cursors.shift.isDown){
            this.player.setVelocityX(450); 
            amountofenergy -= 0.5
          }
          
      }
        

        else if (this.onWallDroit && this.cursors.up.isDown) {
            walljump = true;

            this.player.setVelocityY(-450);
            this.player.setVelocityX(-170); //alors vitesse positive en X
            this.player.anims.play('anim gauche', true);
            this.onWallDroit = false;
            setTimeout(() => {
                walljump = false;
            }, 450);


        }

        else if (!walljump) { // sinon
            this.player.setVelocityX(0); //vitesse nulle

        }





        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            //si touche haut appuyée ET que le perso touche le sol
            this.player.setVelocityY(-450); //alors vitesse verticale négative
            canJump = false;
            amountofenergy -= 1;

            // hero can't jump anymore


            // hero is not on the wall anymore
            this.onWallDroit = false;
            this.onWallGauche = false;




        }

        if (this.cursors.down.isDown && !this.player.body.touching.down) { //si la touche bas est appuyée en saut
            this.player.setVelocityY(450);
        }

        if (this.player.body.blocked.down) {

            // hero can jump
            canJump = true;

            // hero not on the wall
            this.onWallDroit = false;
            this.onWallGauche = false;
        }



        if (this.player.body.blocked.right && !this.player.body.blocked.down) {

            this.onWallDroit = true;
        }



        if (this.player.body.blocked.left && !this.player.body.blocked.down) {
            this.onWallGauche = true;

        }
        if (amountofenergy < 0) {
            amountofenergy = 0
        }
        //console.log('energie'+amountofenergy)
        this.energy.play('energie' + (amountofenergy - 107) * -1)

        boolboue = false;

    }








}
function glissant(player, ralentissement) {
    console.log('yoyoy')
    boolboue = true
}
function collectible(player, pickup) {
    amountofenergy = recup + amountofenergy;
    if (amountofenergy > 107) {
        amountofenergy = 107

    }
    pickup.destroy()
}
var sprint = false;
var walljump = false;
var canJump = false;
var amountofenergy = 107
var ref
var mapref
var boolboue = false;
var recup = 25;