import 'p2'
import 'pixijs'
import Phaser from 'phaser'

import Boot from './Boot'

const game = new Phaser.Game(800, 600, Phaser.AUTO, 'fantasy-football-game')

game.state.add('Boot', Boot, true)
