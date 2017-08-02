import { call, fork, put, select , takeLatest} from 'redux-saga/effects';
import * as actions from './actions';
import axios from 'axios';
import moment from 'moment';


export function getPopulation(country){

    var now = moment().format("YYYY-MM-DD");
    return axios.get(`http://api.population.io:80/1.0/population/${country}/${now}/`)
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
    var now = moment().format("YYYY-MM-DD");
    debugger;
    return axios.get(`http://api.population.io:80/1.0/wp-rank/${dob}/${gender}/${country}/on/${now}`)
        .then(response =>{
            return response.data
        }).catch(error =>{
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
export default function* sagas() {
    yield fork(takeLatest, actions.GET_POPULATION, fetchCountryPopulation);
    yield fork(takeLatest, actions.GET_COUNTRIES, fetchCountries);
    yield fork(takeLatest, actions.FETCH_RANKING, fetchRanking);
}
