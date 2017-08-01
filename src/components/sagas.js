import { call, fork, put, select , takeLatest} from 'redux-saga/effects';
import * as actions from './actions';


export function getPopulation(country, date){
    debugger;
    console.log(country);
}



export function* fetchPopulation(action) {
    try {
        const response = yield call(getPopulation, action.country, action.currentDate);
        yield put({ type: actions.GET_POPULATION_SUCCESS , payload: response});

    } catch (error) {
        yield put({ type: actions.GET_POPULATION_ERROR, payload: error });
    }

}
export default function* sagas() {
    yield fork(takeLatest, actions.GET_POPULATION, fetchPopulation);
}
