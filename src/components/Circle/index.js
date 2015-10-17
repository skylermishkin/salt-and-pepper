// third party imports
import React, {Component} from 'react'


export default class Circle extends Component {
    render() {
        const {...unusedProps} = this.props

        return (
            <circle
                {...unusedProps}
            />
        )
    }
}
