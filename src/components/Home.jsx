import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap'

class Home extends React.Component{

    render(){

        return (
            <div style={{textAlign: 'center'}}>
                <h1>World Population Application</h1>

                <Grid style={{paddingTop: '45px'}}>
                    <Row>
                        <Col md={6}>
                            <h4>World Population</h4>
                        </Col>
                        <Col md={6}>
                            <h4>USA Population</h4>
                        </Col>
                    </Row>
                </Grid>

            </div>
        )
    }
}
export default Home;