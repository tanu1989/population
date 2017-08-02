import React from 'react';
import {Grid, Row, Col, Button, FormControl, ControlLabel} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getPopulation, getAllCountries, getRanking} from './actions';
import Spinner from './presentational/Spinner';
import DisplayPopulation from './presentational/DisplayPopulation';
import RankingBlock from './presentational/RankingBlock';

//default to the current date
var date = new Date().toISOString();
class Home extends React.Component{

    constructor(props) {
        super(props);

        this.initialState = {
            showRanking: false,
            form : {
                gender: 'male',
                date: date,
                country: ''
            }
        }

        this.state = this.initialState;


    }

    static propTypes = {
        population: PropTypes.object,
        countries: PropTypes.array,
        ranking: PropTypes.object,
        handleGetPopulation: PropTypes.func,
        handleGetCountries: PropTypes.func,
        handleGetRanking: PropTypes.func
    };

    componentDidMount(){
        this.props.handleGetPopulation('United States');
        this.props.handleGetCountries();
    };

    handleDateChange = (value, formattedValue) => {
        this.setState({form: {...this.state.form, date: formattedValue}});
    };

    handleGenderChange = (event) => {
        this.setState({form: {...this.state.form, gender: event.currentTarget.value}});
    };

    handleCountryChange = (event) => {
        this.setState({form: { ...this.state.form, country:event.currentTarget.value}})
    };

    getAllCountries = () => {
        const {countries} = this.props;
        debugger;
        if(countries.countries){
            return countries.countries.map((name) => {
                return <option value={name}>{name}</option>
            })
        }

    };

    handleGetRankingAndClear = () => {
        const {form, showRanking} = this.state;
        debugger;
        if(!showRanking){
            this.setState(() => ({
                showRanking: true
            }),() => this.props.handleGetRanking(form.date, form.country, form.gender))

        }else
        {
            this.setState(()=> ({
                ...(this.initialState)
            }))
        }
    };

    render(){
        let countries = this.getAllCountries();
        let {showRanking} = this.state;
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
                            {this.props.population.loading ? <Spinner/> :
                                <DisplayPopulation population={this.props.population.population.total_population}/>
                            }
                        </Col>
                    </Row>
                </Grid>

                <div className="titleClasses">
                    <h4>Shortest Country Names</h4>
                    <h6>Population of countries with shortest names</h6>
                    <Button bsStyle="info" className="btn1">Fetch</Button>
                </div>
                <div className="titleClasses">

                <h4>Check Your Ranking</h4>
                <h6>Enter your information to check where you rank</h6>
                <Grid>
                    <Row>
                        <Col md={3}>
                            <ControlLabel>DOB:</ControlLabel>
                            <DatePicker id="example-datepicker"
                                        value={this.state.form.date}
                                        onChange={this.handleDateChange}
                                        dateFormat="YYYY-MM-DD"/>
                        </Col>
                        <Col md={3}>
                            <ControlLabel>Country:</ControlLabel>
                            <FormControl componentClass="select" placeholder="Country" onChange={this.handleCountryChange}>
                                <option value="select" disabled default>Select a country</option>
                                {countries}
                            </FormControl>
                        </Col>

                        <Col md={3}>
                            <ControlLabel>Gender:</ControlLabel>
                            <FormControl componentClass="select" placeholder="Gender" onChange={this.handleGenderChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </FormControl>
                        </Col>
                    </Row>
                </Grid>
                   <Button bsStyle={!showRanking ? "info" : "danger"} className="btn1" onClick={this.handleGetRankingAndClear}>
                       {!showRanking ? "Fetch" : "Clear"}
                   </Button>
                    {showRanking ? <RankingBlock ranking={this.props.ranking}/> : null}
                </div>


            </div>
        )
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        handleGetPopulation : country =>  dispatch(getPopulation(country)),
        handleGetCountries : () => dispatch(getAllCountries()),
        handleGetRanking : (dob, country, gender) => dispatch(getRanking(dob,country,gender))
    }
};

export const mapStateToProps = (state) => {
    return {
        population: state.population,
        countries: state.population.countries,
        ranking: state.population.ranking
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);