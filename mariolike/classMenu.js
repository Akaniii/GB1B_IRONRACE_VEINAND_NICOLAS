class Menu extends Phaser.Scene {
    constructor() {
        super("menu");

    }
    preload() {
        this.load.sprite('nouvellepartie','assets/nouvellepartie')
        this.load.image('titre', 'assets/MENUTITRE.png');
        this.load.audio('Musicécran', 'sound/Wallpaper.mp3')
        this.load.image('logo','assets/LOGOIRONRACE')
        
    }
    create() {
        //var audioContext = new (window.AudioContext || window.webkitAudio)();
        //    this.sound.context = audioContext;
        //    // Crée une instance de Phaser.Sound pour jouer la musique
        var musique = this.sound.add('Musicécran', { loop: true });
            // Joue la musique
            musique.play();
            this.time.delayedCall(10000, function() {
                musique.stop();
            }, [], this);
        

        this.image = this.add.image
        this.image = this.add.image(630, 100, 'titre')

        var button = this.add.sprite(666 ,350, 'nouvellepartie');
        button.setInteractive();
        button.once('pointerdown', () => {
            this.Startgame();
            button.disableInteractive();

        });
        
        

        
    }
    update() {
       

    }
    Startgame() {
        

  // Anime le sprite de Lucy
    
        setTimeout(() => {
        this.scene.start('niveaumarathon')

                    }, 1100)
        ;
    }
}