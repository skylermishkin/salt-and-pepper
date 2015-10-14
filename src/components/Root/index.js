// third party imports
import React, {Component} from 'react'
import throttle from 'lodash/function/throttle'
// local imports
import styles from './styles'
import StatsBar from 'components/StatsBar'
import LevelSelector from 'components/LevelSelector'
import Player from 'game/Player'
import Board from 'game/Board'
import Vector2 from 'math/Vector2'
import Color from 'game/Color'


export default class Root extends Component {
    constructor(...args) {
        // instantiate `this`
        super(...args)

        const initialLevel = 1

        const board = new Board({
            rows: 10,
            cols: 10,
        })
        board.sprinkle(initialLevel)

        const salt = new Player({
            position: new Vector2(100, 100),
            velocity: new Vector2(),
            color: new Color(200, 4, 1),
            radius: 10,
        })
        const pepper = new Player({
            position: new Vector2(500, 300),
            velocity: new Vector2(),
            color: new Color(100, 200, 3),
            radius: 20,
        })

        // set initial state
        this.state = {
            // canvas dimensions
            height: 100,
            width: 100,
            // game state
            level: initialLevel,
            score: 0,
            moves: 0,
            isPaused: true,
            board: board,
            salt: salt,
            pepper: pepper,
        }
        // throttle so that we dont spam resize event
        this.onResize = throttle(
            // bind instance method so it can be passed as window event handler
            // pass draw as callback so always redraw after resize
            this.onResize.bind(this, this.draw.bind(this)),
            100
        )
    }


    componentDidMount() {
        // determine initial dimensions and render to canvas
        this.onResize()
        // add resize event handler
        window.addEventListener('resize', this.onResize)
    }


    componentWillUnmount() {
        // cut animation loop
        this.setState(
            {isPaused: true},
            // then remove resize event handler
            () => window.removeEventListener('resize', this.onResize)
        )
    }


    onResize(cb) {
        // canvas DOM node
        const canvas = this.refs.canvas
        // width of canvas DOM node
        const width = canvas.clientWidth
        // desired height of canvas DOM node
        const height = width

        // set canvas dimensions to its DOM node dimensions so that
        // no stretching occurs
        canvas.width = width
        canvas.height = height

        this.setState({
            height,
            width,
        }, cb)
    }


    loopAnimation() {
        this.draw()

        if (!this.state.isPaused) {
            requestAnimationFrame(() => this.loopAnimation())
        }
    }


    handleCanvasClick({pageX, pageY, target}) {
        // mouse coordinates relative to canvas DOM node
        const x = pageX - target.offsetLeft
        const y = pageY - target.offsetTop

        // if pepper is not frozen
        if (!this.state.pepper.isFrozen) {
            // move it to mouse position
            // implicit state mutation ok since state will be updated just below
            this.state.pepper.position = new Vector2(x, y)
        }

        const wasPaused = this.state.isPaused

        // update number of moves and make sure animation is not paused
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
        // clear and resprinkle board
        this.state.board.clear().sprinkle(level)
        // recenter salt, then...
        this.centerSalt(() => {
            // draw new setup
            this.draw()
            // update internal state
            this.setState({
                level,
                isPaused: true,
                moves: 0,
            })
        })
    }


    centerSalt(cb) {
        // center salt character
        this.state.salt.position = new Vector2(
            this.state.width / 2,
            this.state.height / 2
        )
        // force update since state mutation above is implicit
        this.forceUpdate(cb)
    }


    draw() {
        const context = this.refs.canvas.getContext('2d')

        this.state.board.draw(context)
		this.state.salt.draw(context)
		this.state.pepper.draw(context)
    }


    render() {
        console.log('state', this.state)


        return (
            <div style={styles.container}>
                <div style={styles.menu}>
                    <LevelSelector
                        value={this.state.level}
                        onChange={
                            ({target}) => this.setLevel(parseInt(target.value, 10))
                        }
                    />
                    <StatsBar
                        toWin={this.state.level * 10 || 'N/A'}
                        score={this.state.score}
                        moves={this.state.moves}
                    />
                </div>
                <div style={styles.content}>
                    <canvas
                        tabIndex='0'
                        ref='canvas'
                        style={styles.canvas}
                        onClick={
                            (event) => this.handleCanvasClick(event)
                        }
                    />
                </div>
            </div>
        )
    }
}
