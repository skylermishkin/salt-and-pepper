// third party imports
import React from 'react'
// local imports
import styles from './styles'


export default ({toWin, score, moves}) => (
    <div style={styles.container}>
        <span style={styles.contained}>
            To Win: {toWin}
        </span>
        <span style={styles.contained}>
            Score: {score}
        </span>
        <span style={styles.contained}>
            Moves: {moves}
        </span>
    </div>
)
