// third party imports
import React from 'react'
// local imports
import styles from './styles'
import LevelSelector from 'components/LevelSelector'
import StatsBar from 'components/StatsBar'


export default ({level, onLevelChange, score, moves}) => (
    <div style={styles.container}>
        <LevelSelector
            value={level}
            onChange={onLevelChange}
        />
        <StatsBar
            toWin={level * 10 || 'N/A'}
            score={score}
            moves={moves}
        />
    </div>
)
