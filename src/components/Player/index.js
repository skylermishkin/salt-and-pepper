// third party imports
import React, {Component, PropTypes} from 'react'
// local imports
import G from 'components/G'
import Circle from 'components/Circle'
import Color from 'game/Color'


export default class Player extends Component {
    static propTypes = {
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        mass: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        color: (props, propName) => {
            const prop = props[propName]

            if (!(prop instanceof Color)) {
                return new Error(`expected color instance, got: ${prop}`)
            }
        },
    }


    render() {
        const {
            height,
            width,
            mass,
            x,
            y,
            color,
            ...unusedProps,
        } = this.props

        return (
            <G {...unusedProps}>
                <Circle
                    r={mass}
                    cx={x}
                    cy={y}
                    fill={color.toString()}
                    stroke={color.complement.toString()}
                    strokeWidth={5}
                />
            </G>
        )
    }
}
