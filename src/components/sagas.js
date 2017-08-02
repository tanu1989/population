import { call, fork, put, takeLatest} from 'redux-saga/effects';
import * as actions from './actions';
import axios from 'axios';
import moment from 'moment';

const now = moment().format("YYYY-MM-DD");
const year = moment().format("YYYY");


export function getPopulation(country){
    return axios.get(`http://api.population.io:80/1.0/population/${country === 'Australia/New Zealand' ? 'New Zealand' : country}/${now}/`)
        .then(response =>{
            return response.data
        }).catch(error =>{
            return error;
         })
}

export function getCountries() {
    return axios.get(`http://api.population.io:80/1.0/countries`)
        .then(response =>{
            return response.data
        }).catch(error =>{
            return error;
        })
}

export function getRanking(dob,country,gender) {
    return axios.get(`http://api.population.io:80/1.0/wp-rank/${dob}/${gender}/${country === 'Australia/New Zealand' ? 'New Zealand' : country}/on/${now}`)
        .then(response =>{
            return response.data
        }).catch(error =>{
            return error;
        })
}

export function getSmallestCountries(arr) {
    let age = 18;
    let promiseArray = arr.map(name => axios.get(`http://api.population.io:80/1.0/population/${year}/${name}/${age}/`));
    return axios.all(promiseArray)
        .then((res) =>{
            let temp = res.map(r => r.data[0]);
            return temp;
        }).catch(error => {
            return error;
        })
}

export function getTotalPopulation(arr) {
    let promiseArray = arr.countries.map(name => axios.get(`http://api.population.io:80/1.0/population/${name === 'Australia/New Zealand' ? 'New Zealand' : name}/${now}/`));
    return axios.all(promiseArray)
        .then((res) =>{
            let temp = res.map(r => r.data.total_population);
            return temp;
        }).catch(error => {
            return error;
        })
}


export function* fetchCountryPopulation(action) {
    try {
        const response = yield call(getPopulation, action.country);
        yield put({ type: actions.GET_POPULATION_SUCCESS , payload: response});
    } catch (error) {
        yield put({ type: actions.GET_POPULATION_ERROR, payload: error });
    }

}

export function* fetchCountries() {
    try {
        const response = yield call(getCountries);
        yield put({ type: actions.GET_COUNTRIES_SUCCESS , payload: response});
    }catch(error) {
        yield put({ type: actions.GET_COUNTRIES_ERROR, payload: error });
    }
}

export function* fetchRanking(action) {
    try {
        const response = yield call(getRanking, action.dob, action.country, action.gender);
        yield put({ type: actions.FETCH_RANKING_SUCCESS , payload: response});
    }catch(error) {
        yield put({ type: actions.FETCH_RANKING_ERROR, payload: error });
    }

}

export function* fetchSmallestCountries(action) {
    try {
        const response = yield call(getSmallestCountries, action.arr);
        yield put({ type: actions.FETCH_SMALLEST_SUCCESS, payload: response});
    }catch(error) {
        yield put({ type: actions.FETCH_SMALLEST_ERROR, payload: error});
    }
}

export function* fetchTotalPopulation() {
    try {
        const arr =  yield call(getCountries);
        const response = yield call(getTotalPopulation, arr);
        yield put({ type: actions.GET_TOTAL_POPULATION_SUCCESS, payload: response});
    }catch(error) {
        yield put({ type: actions.GET_TOTAL_POPULATION_ERROR, payload: error});
    }
}

export default function* sagas() {
    yield fork(takeLatest, actions.GET_POPULATION, fetchCountryPopulation);
    yield fork(takeLatest, actions.GET_COUNTRIES, fetchCountries);
    yield fork(takeLatest, actions.FETCH_RANKING, fetchRanking);
    yield fork(takeLatest, actions.FETCH_SMALLEST, fetchSmallestCountries);
    yield fork(takeLatest, actions.GET_TOTAL_POPULATION, fetchTotalPopulation)
}
