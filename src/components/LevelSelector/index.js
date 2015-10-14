// third party imports
import React from 'react'
// local imports
import styles from './styles'


export default ({value, onChange}) => (
    <div style={styles.container}>
        Level:
        <input
            type='number'
            min='1'
            style={styles.input}
            value={value}
            onChange={onChange}
        />
    </div>
)
