import React, { Component } from 'react';
import Phaser from 'phaser';

class LittleGame extends Component {
    game = {};
    bg = '';

    // Build the Game class
    componentDidMount() {
        const width = window.innerWidth;
        const height = window.innerHeight - 4;

        const renderOptions = {
            width,
            height,
            renderer: Phaser.WEBGL,
            parent: 'render-game',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 }
                }
            },
            scene: {
                preload: this.preload,
                create: this.create
            }
        };
        this.game = new Phaser.Game( renderOptions );
    };

    // Load assets
    preload() {
        this.load.image( 'sky', 'assets/sky.png' );
        this.load.image( 'cat', 'assets/cat.png' );
    };

    // Create the game
    create() {
        const particles = this.add.particles('');
        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
        // Set and scale the background image
        this.bg = this.add.image( this.game.config.width / 2, this.game.config.height / 2, 'sky' );
        this.bg.setDisplaySize( this.game.config.width, this.game.config.height );

        // Create the cat and make it move
        // The numbers define where it starts
        const cat = this.physics.add.sprite( 100, 100, 'cat' );
        cat.setDisplaySize( 75, 50, true )
        cat.setVelocity( 100, 200 );
        cat.setBounce( 1, 1 );
        cat.setCollideWorldBounds( true );

        emitter.startFollow( cat );
    };

    render() {
        return <div id='render-game' />
    };
};

export default LittleGame;