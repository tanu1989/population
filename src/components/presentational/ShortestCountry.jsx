import React from 'react';
import BigNumber from 'bignumber.js';
import {Grid, Row, Col} from 'react-bootstrap';

const ShortestCountry = ({name, countryDetail}) => {

    return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <div><strong>{name}</strong></div>
                        <div><strong>Total Population:</strong></div>
                        <div className="largeNumber">{new BigNumber(countryDetail.population.toString()).toFormat(2)}</div>
                    </Col>
                </Row>
            </Grid>
    )
}

export default ShortestCountry;