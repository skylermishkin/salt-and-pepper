// third party imports
import React, {Component} from 'react'
// local imports
import styles from './styles'
import Menu from 'components/Menu'
import SVG from 'components/SVG'
import ColorMatrixComponent from 'components/ColorMatrix'
import PlayerComponent from 'components/Player'
import ColorMatrix from 'game/ColorMatrix'
import PlayerClass from 'game/Player'
import Color from 'game/Color'
import Vector2 from 'math/Vector2'


// global time step
const dt = 0.07
// level to start out on
const initialLevel = 100
const gameHeight = 900
const gameWidth = 1600
const gameRows = gameHeight / 100
const gameCols = gameWidth / 100
const cellWidth = gameWidth / gameCols
const cellHeight = gameHeight / gameRows


export default class Root extends Component {
    constructor(...args) {
        // instantiate `this`
        super(...args)
        // set initial state
        this.state = {
            level: initialLevel,
            score: 0,
            moves: 0,
            isPaused: true,
            colorMatrix: new ColorMatrix({
                rows: gameRows,
                cols: gameCols,
            }).sprinkle(initialLevel),
            salt: new PlayerClass({
                position: new Vector2(gameWidth / 2, gameHeight / 2),
                velocity: new Vector2(),
                color: new Color(200, 140, 110),
                mass: 15,
            }),
            pepper: new PlayerClass({
                position: new Vector2(gameWidth / 2, gameHeight / 2),
                velocity: new Vector2(),
                color: new Color(140, 200, 133),
                mass: 35,
            }),
        }
    }


    componentWillUnmount() {
        // cut animation loop
        this.setState({isPaused: true})
    }


    loopAnimation() {
        const {salt, pepper, colorMatrix, isPaused} = this.state

        const saltI = Math.floor(salt.position.y / cellHeight)
        const saltJ = Math.floor(salt.position.x / cellWidth)

        // the amount of dust leeched from the colorMatrix by salt
        const leeched = colorMatrix.leech(saltI, saltJ)

        const saltToPepper = pepper.position.minus(salt.position)

        let scalar = 70 / saltToPepper.magSq * saltToPepper.mag
        if (!(scalar < 500)) {
            scalar = 500
        }

        const acceleration = saltToPepper.scale(scalar)
        salt.velocity = salt.velocity.plus(acceleration.scale(dt))
        salt.position = salt.position.plus(salt.velocity.scale(dt))
            .mod(new Vector2(gameWidth, gameHeight))

        // trigger update by updating score based on leech
        this.setState({score: this.state.score + leeched})


        // if the animation loop has not been cut off
        if (!isPaused) {
            // then keep it going
            requestAnimationFrame(() => this.loopAnimation())
        }
    }


    handleSVGClick({pageX, pageY, currentTarget}) {
        // mouse coordinates relative to canvas DOM node
        const x = pageX - currentTarget.offsetLeft
        const y = pageY - currentTarget.offsetTop

        // move pepper to mouse position
        // implicit state mutation ok since state will be updated just below
        this.state.pepper.position = new Vector2(
            // TODO: don't use `window` like a fool
            gameWidth * x / window.innerWidth,
            gameWidth * y / window.innerWidth,
        )

        // to reference later in callback
        const wasPaused = this.state.isPaused

        // update number of moves and make sure animation is not paused, then...
        this.setState(
            {
                moves: this.state.moves + 1,
                isPaused: false,
            },
            () => {
                // if animation was paused (it wont be anymore when this is called)
                if (wasPaused) {
                    // kick off animation loop
                    this.loopAnimation()
                }
            }
        )
    }


    setLevel(level) {
        // clear and resprinkle colorMatrix
        this.state.colorMatrix.clear().sprinkle(level)
        // center salt character
        this.state.salt.position = new Vector2(gameWidth / 2, gameHeight / 2)
        // reset salt velocity
        this.state.salt.velocity = new Vector2()
        // center pepper character
        this.state.pepper.position = new Vector2(gameWidth / 2, gameHeight / 2)
        // reset pepper velocity
        this.state.pepper.velocity = new Vector2()
        // trigger update to state by setting...
        this.setState({
            // new level number
            level,
            // pausing animation loop
            isPaused: true,
            // resetting move counter
            moves: 0,
        })
    }


    render() {
        const {
            level,
            score,
            moves,
            colorMatrix,
            salt,
            pepper,
        } = this.state

        return (
            <div style={styles.container}>
                <Menu
                    level={level}
                    onLevelChange={
                        ({target}) => this.setLevel(parseInt(target.value, 10))
                    }
                    score={score}
                    moves={moves}
                />
                <div
                    style={styles.svgContainer}
                >
                    <SVG
                        style={styles.svg}
                        viewBox={`0 0 ${gameWidth} ${gameHeight}`}
                        onClick={(event) => this.handleSVGClick(event)}
                    >
                        <ColorMatrixComponent
                            height={gameHeight}
                            width={gameWidth}
                            colorMatrix={colorMatrix}
                        />
                        <PlayerComponent
                            height={gameHeight}
                            width={gameWidth}
                            mass={pepper.mass}
                            x={pepper.position.x}
                            y={pepper.position.y}
                            color={pepper.color}
                        />
                        <PlayerComponent
                            height={gameHeight}
                            width={gameWidth}
                            mass={salt.mass}
                            x={salt.position.x}
                            y={salt.position.y}
                            color={salt.color}
                        />
                    </SVG>
                </div>
            </div>
        )
    }
}
