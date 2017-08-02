import React from 'react';
import BigNumber from 'bignumber.js';
import {Grid, Row, Col, Button, FormControl, ControlLabel} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getPopulation, getAllCountries, getRanking, findSmallestPopulations, findTotalPopulation} from './actions';
import {calculatePopulationSum} from '../utils/CalculateBigSum';
import Spinner from './presentational/Spinner';
import DisplayPopulation from './presentational/DisplayPopulation';
import RankingBlock from './presentational/RankingBlock';
import ShortestCountry from './presentational/ShortestCountry';

//default to the current date
var date = new Date().toISOString();
class Home extends React.Component{

    constructor(props) {
        super(props);

        this.initialState = {
            showRanking: false,
            showSmallestCountries: false,
            smallestCountryNames: [],
            form : {
                gender: 'male',
                date: date,
                country: ''
            }
        };
        this.state = this.initialState;
    }

    static propTypes = {
        population: PropTypes.object,
        countries: PropTypes.array,
        ranking: PropTypes.object,
        smallestCountries: PropTypes.array,
        handleGetPopulation: PropTypes.func,
        handleGetCountries: PropTypes.func,
        handleGetRanking: PropTypes.func,
        handleFindSmallestPopulations: PropTypes.func,
        handleFindTotalPopulation: PropTypes.func,
        totalPopulation: PropTypes.array
    };

    componentDidMount(){
        this.props.handleGetPopulation('United States');
        this.props.handleGetCountries();
        this.props.handleFindTotalPopulation();
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
        if(countries.countries){
            return countries.countries.map((name) => {
                return <option value={name}>{name}</option>
            })
        }

    };

    handleGetRankingAndClear = () => {
        const {form, showRanking} = this.state;
        if(!showRanking){
            this.setState(() => ({
                showRanking: true
            }),() => this.props.handleGetRanking(form.date, form.country, form.gender))

        }else
        {
            this.setState(()=> ({
                showRanking: false,
                form : this.initialState.form
            }))
        }
    };

    findSmallest = () => {
        const countries = this.props.countries.countries;
        const sortedCountries = countries.sort((a, b) => {return a.length - b.length;});

        const smallest = sortedCountries[0].length;
        let smallestArr = sortedCountries.filter(name => { return name.length === smallest});
        this.setState(() => ({
            smallestCountryNames: smallestArr,
            showSmallestCountries: true
        }), () => {this.props.handleFindSmallestPopulations(smallestArr);
        })
    };

    printSmallCountry = () => {
        const {smallestCountries} = this.props;
        const {smallestCountryNames} = this.state;

        if(smallestCountries.isLoading) {
            return <Spinner/>
        }else if(!smallestCountries.isLoading && smallestCountries.sCountries){
            return smallestCountries.sCountries.map((country, id) => {
                return <ShortestCountry name={smallestCountryNames[id]} countryDetail={country}/>
            })
        }
    };

    printRankingBlock = () => {
        const {ranking} = this.props;

        if(ranking.rLoading) {
            return <Spinner/>
        }else if(!ranking.rLoading && ranking.ranking){
            return <RankingBlock ranking={ranking}/>
        }
    }

    render(){
        let countries = this.getAllCountries();
        let smallCountry = this.printSmallCountry();
        let ranking = this.printRankingBlock();

        let {showRanking, showSmallestCountries, smallestCountryNames} = this.state;
        let {totalPopulation, population, smallestCountries} = this.props;

        let populationSum = totalPopulation.totalPopulation.length != 0 ? calculatePopulationSum(totalPopulation.totalPopulation) : 0;
        let calculateSmallCountryTotal = smallestCountries.sCountries.length != 0 ? calculatePopulationSum(smallestCountries.sCountries) : 0;




        return (
            <div style={{textAlign: 'center'}}>
                <h1>World Population Application</h1>

                <Grid style={{paddingTop: '45px'}}>
                    <Row>
                        <Col md={6}>
                            <h4>World Population</h4>
                            {totalPopulation.loading ? <Spinner/> :
                                <DisplayPopulation population={(new BigNumber(populationSum)).toFormat(2)}/>
                            }
                        </Col>
                        <Col md={6}>
                            <h4>USA Population</h4>
                            {population.loading ? <Spinner/> :
                                <DisplayPopulation population={population.population.total_population}/>
                            }
                        </Col>
                    </Row>
                </Grid>

                <div className="titleClasses">
                    <h4>Shortest Country Names</h4>
                    <h6>Population of countries with shortest names</h6>
                    <Button bsStyle="info" className="btn1" onClick={this.findSmallest}>Fetch</Button>
                    {showSmallestCountries ?  <div className="smallCountry">
                            <Grid style={{paddingTop: '45px'}}>
                                <Row>
                                    <Col md={6}>
                                        <div>Total Population of countries: {(new BigNumber(calculateSmallCountryTotal)).toFormat(2)}</div>
                                    </Col>
                                    <Col md={6}>
                                        <div>Number of countries: {smallestCountryNames.length}</div>
                                    </Col>
                                </Row>
                            </Grid>
                                {smallCountry}
                            </div> : null}
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
                            <FormControl componentClass="select" placeholder="Country" onChange={this.handleCountryChange} value={this.state.form.country}>
                                <option value="select" disabled default>Select a country</option>
                                {countries}
                            </FormControl>
                        </Col>

                        <Col md={3}>
                            <ControlLabel>Gender:</ControlLabel>
                            <FormControl componentClass="select" placeholder="Gender" onChange={this.handleGenderChange} value={this.state.form.gender}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </FormControl>
                        </Col>
                    </Row>
                </Grid>
                   <Button bsStyle={!showRanking ? "info" : "danger"} className="btn1" onClick={this.handleGetRankingAndClear}>
                       {!showRanking ? "Fetch" : "Clear"}
                   </Button>
                    {showRanking ? ranking : null}
                </div>


            </div>
        )
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        handleGetPopulation : country =>  dispatch(getPopulation(country)),
        handleGetCountries : () => dispatch(getAllCountries()),
        handleGetRanking : (dob, country, gender) => dispatch(getRanking(dob,country,gender)),
        handleFindSmallestPopulations : (smallestArr) => dispatch(findSmallestPopulations(smallestArr)),
        handleFindTotalPopulation : (arr) => dispatch(findTotalPopulation(arr))
    }
};

export const mapStateToProps = (state) => {
    return {
        population: state.population,
        countries: state.population.countries,
        ranking: state.population.ranking,
        smallestCountries: state.population.smallestCountries,
        totalPopulation: state.population.totalPopulation
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);