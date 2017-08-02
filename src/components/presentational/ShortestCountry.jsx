import React from 'react';
import BigNumber from 'bignumber.js';
import {Grid, Row, Col} from 'react-bootstrap';

const ShortestCountry = ({countryDetail}) => {

    return (
            <Grid>
                <Row>
                    <Col md={6}>
                        <h4><strong>{countryDetail.country}</strong></h4>
                        <div><strong>Total Population: </strong>
                            <span className="largeNumber">{new BigNumber(countryDetail.total.toString()).toFormat(2)}</span>
                        </div>

                    </Col>
                    <Col md={6}>
                        <div><strong>Male population:</strong>{new BigNumber(countryDetail.males.toString()).toFormat(2)}</div>
                        <div><strong>Female population:</strong>{new BigNumber(countryDetail.females.toString()).toFormat(2)}</div>
                    </Col>
                </Row>
            </Grid>
    )
}

export default ShortestCountry;