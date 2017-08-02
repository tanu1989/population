import React from 'react';
import BigNumber from 'bignumber.js';
import {Grid, Row, Col} from 'react-bootstrap';
import {startCase} from 'lodash';

const RankingBlock = ({ranking}) => {

    const {dob, rank, sex} = ranking.ranking;

    const dobArr = dob ? dob.split('-') : null;

    const rankRes = rank != undefined ? new BigNumber(rank.toString()) : new BigNumber('0');
    const rankStr = rankRes.s === -1 ? ('-').concat(new BigNumber(rankRes.c.join('')).toFormat(2)) :
                    new BigNumber(rankRes.c.join('')).toFormat(2);
    return (
        <div className="rankingPanel">
            <Grid>
                    <Row>
                        <Col md={6}>
                            <div><strong>DOB:</strong> {dobArr ? `${dobArr[1]}-${dobArr[2]}-${dobArr[0]}` : null}</div>
                            <div><strong>Gender:</strong> {startCase(sex)}</div>
                        </Col>
                        <Col md={6}>
                            <div><strong>Your rank in the world</strong></div>
                            <div>You are ranked {rankStr}</div>
                        </Col>
                    </Row>
            </Grid>
        </div>
    )
}

export default RankingBlock;