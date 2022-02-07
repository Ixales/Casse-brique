class Tableau1 extends Phaser.Scene{


    preload(){

        this.load.image('carre','img/carre.png');
        this.load.image('cercle','img/cercle.png');
    }

    create(){

        this.hauteur = 800
        this.largeur = 800
        this.speedX = 0
        while(this.speedX===0){
            this.speedX = 500*Phaser.Math.Between(-1,1)
        }
        this.speedY = Phaser.Math.Between(-500, 500)
        this.maxspeed = 500

        this.balle = this.physics.add.sprite(this.largeur/2, this.hauteur/2, 'cercle')
        this.balle.setDisplaySize(20, 20)
        this.balle.body.setBounce(1,1);
        this.balle.body.setAllowGravity(false)

        this.haut = this.physics.add.sprite(0, 0, 'carre').setOrigin(0, 0)
        this.haut.setDisplaySize(this.largeur, 20)
        this.haut.body.setAllowGravity(false)
        this.haut.setImmovable(true);
        this.droite = this.physics.add.sprite(0, 0, 'carre').setOrigin(0, 0)
        this.droite.setDisplaySize(20,1000)
        this.droite.body.setAllowGravity(false)
        this.droite.setImmovable(true);
        this.gauche = this.physics.add.sprite(780, 0, 'carre').setOrigin(0, 0)
        this.gauche.setDisplaySize(20,1000)
        this.gauche.body.setAllowGravity(false)
        this.gauche.setImmovable(true);
        this.player1 = this.physics.add.sprite(400, 750, 'carre')
        this.player1.setDisplaySize(200, 20)
        this.player1.body.setAllowGravity(false)
        this.player1.setImmovable(true)
        this.block1 = this.physics.add.sprite(400, 400, 'carre')
        this.block1.setDisplaySize(60, 30)
        this.block1.body.setAllowGravity(false)
        this.block1.setImmovable(true);
        this.block2 = this.physics.add.sprite(461, 400, 'carre')
        this.block2.setDisplaySize(60, 30)
        this.block2.body.setAllowGravity(false)
        this.block2.setImmovable(true);


        let me = this;


        this.physics.add.collider(this.player1, this.balle,function(){
            console.log('touche player 1')
            me.rebond(me.player1)
        })

        this.physics.add.collider(this.block1, this.balle,function(){
            console.log('touche block 1')
            me.rebond(me.block1)

        })

        this.physics.add.collider(this.block1, this.balle,function(){
            console.log('touche block 2')
            me.rebond(me.block2)

        })

        this.physics.add.collider(this.balle, this.droite)
        this.physics.add.collider(this.balle, this.haut)
        this.physics.add.collider(this.balle, this.gauche)

        this.balle.setMaxVelocity(this.maxspeed,this.maxspeed)

        this.physics.add.collider(this.haut, this.player1)
        this.physics.add.collider(this.droite, this.player1)
        this.physics.add.collider(this.gauche, this.player1)

        this.player1Speed = 0

        this.joueur = new Joueur('carre','joueur')
        console.log(this.joueur)

        this.balleAucentre();
        this.initKeyboard()


    }

    rebond(players){
        let me = this ;
        console.log(this.player1.y);
        console.log(me.balle.y);
        let hauteurPlayers = players.displayHeight;

        let positionRelativePlayers = (this.balle.y - players.y);

        positionRelativePlayers= (positionRelativePlayers / hauteurPlayers)
        positionRelativePlayers = positionRelativePlayers*2-1;

        this.balle.setVelocityY(this.balle.body.velocity.y + positionRelativePlayers * 50);

    }

    balleAucentre(){
        this.balle.x = 400
        this.balle.y = 700
        this.speedX = 0

        this.balle.setVelocityX(0)
        this.balle.setVelocityY(Math.random()>0.5?-300:300)
    }

    /**
     *
     * @param {Joueur} joueur
     */
    win(joueur){
        //alert('Joueur '+joueur.name+' gagne')
        joueur.score ++;
        //alert('Le score est de '+this.joueurGauche.score+' a '+this.joueurDroite.score)
        this.balleAucentre();
    }

    update(){
        if(this.balle.y>=810){
            this.balleAucentre()

        }


        this.player1.x += this.player1Speed
    }

    initKeyboard(){
        let me = this
        this.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.player1Speed = -5
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.player1Speed = 5
                    break;
            }
        });
        this.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.player1Speed = 0
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.player1Speed = 0
                    break;

            }
        });
    }

}
