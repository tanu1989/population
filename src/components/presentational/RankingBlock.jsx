import React from 'react';
import {Panel} from 'react-bootstrap';

const RankingBlock = ({ranking}) => {

    return (
        <div className="rankingPanel">
            <Panel header="Ranking Details" bsStyle="info">
                Panel content
            </Panel>
        </div>
    )
}

export default RankingBlock;