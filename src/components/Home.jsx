import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import {getPopulation} from './actions';

class Home extends React.Component{

    componentDidMount(){
        this.props.handleGetPopulation('USA', 'date');
    }

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

export const mapDispatchToProps = (dispatch) => {
    return {
        handleGetPopulation : (country, date) =>  dispatch(getPopulation(country,date))
    }
}

export const mapStateToProps = (state) => {
    return {
        population: state.population
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);