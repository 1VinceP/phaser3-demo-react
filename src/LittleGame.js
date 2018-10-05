import React, { Component } from 'react';
import Phaser from 'phaser';

class LittleGame extends Component {
    game = {};
    bg = '';
    cursors = {};

    // Build the Game class
    componentDidMount() {
        const width = window.innerWidth;
        const height = window.innerHeight - 4;

        const renderOptions = {
            width,
            height,
            renderer: Phaser.AUTO,
            parent: 'render-game',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 }
                }
            },
            scene: {
                preload: this.preload,
                create: this.create,
                update: this.update
            }
        };
        this.game = new Phaser.Game(renderOptions);
    };

    // Load assets
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('cat', 'assets/cat.png');
    };

    // Create the game
    create() {
        const particles = this.add.particles('');
        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.bg = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'sky'); // Set and scale the background image
        this.bg.setDisplaySize(this.game.config.width, this.game.config.height); // Make background size of screen
        this.bg.setDepth(-1); // Send background to very back
        this.input.on('pointerdown', () => console.log('Click!!'))

        // Create the cat and make it move
        // The numbers define where it starts
        this.cat = this.physics.add.sprite(500, 0, 'cat');
        this.cat.setDisplaySize(75, 50, true)
        // this.cat.setVelocity( 100, 100 );
        // this.cat.setBounce( 1, 1 );
        this.cat.setCollideWorldBounds(true);
        emitter.startFollow(this.cat);

        //Create Platforms
        this.platforms = this.physics.add.group({
            collideWorldBounds: true,
            allowGravity: false,
            immovable: true,
            velocityX: 100,
        });
        this.platforms.create(200, 164, 'cat');
        this.platforms.create(400, 280, 'cat');
        this.platforms.create(600, 396, 'cat');
        this.platforms.create(800, 512, 'cat');

        // Create collision between cat and platforms
        this.physics.add.collider(this.cat, this.platforms)
    };

    update() {
        if (this.cursors.left.isDown) {
            this.cat.setVelocityX(-160);
        }
        else if (this.cursors.right.isDown) {
            this.cat.setVelocityX(160);
        }
        else if( this.cursors.down.isDown ) {
            this.cat.setVelocityY(330)
        }
        else {
            this.cat.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.cat.setVelocityY(-330);
        }
    }

    render() {
        return <div id='render-game' />
    };
};

export default LittleGame;