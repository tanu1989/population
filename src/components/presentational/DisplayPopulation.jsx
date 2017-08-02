import React from 'react';
import BigNumber from 'bignumber.js';
import {Well} from 'react-bootstrap';

const DisplayPopulation = ({population}) => {

    let val = typeof population === 'object' ? new BigNumber(population.population).toFormat(2) : population
    return (
        <div>
            <Well bsSize="small">As of today</Well>
            {population && <Well bsSize="small">{val}</Well>}
        </div>

    )
}

export default DisplayPopulation;

