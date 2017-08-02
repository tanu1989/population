import React from 'react';
import {Well} from 'react-bootstrap';

const DisplayPopulation = ({population}) => {
    debugger;
    return (
        <div>
            <Well bsSize="small">As of today</Well>
            {population && <Well bsSize="small">{parseInt(population.population,10).toLocaleString()}</Well>}
        </div>

    )
}

export default DisplayPopulation;

