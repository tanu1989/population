import * as actions from './actions';

const initialState = {
    population: [],
    loading: false,
    error: false,
    errorDetail: null
}

const reduceFetchPopulation = (state, action) => {
    return {
        ...state,
        loading: true
    }


}

const reduceFetchPopulationSuccess = (state, action) => {
    return {
        ...state,
        population: action.payload,
        loading: false
    }

}

const reduceFetchPopulationError = (state, action) => {
    return {
        ...state,
        error: action.payload,
        error: true,
        loading: false
    }

}

const population = (state = initialState, action) => {

    switch(action.type){
        case actions.GET_POPULATION:
            return reduceFetchPopulation(state, action);
        case actions.GET_POPULATION_SUCCESS:
            return reduceFetchPopulationSuccess(state, action);
        case actions.GET_POPULATION_ERROR:
            return reduceFetchPopulationError(state, action);
        default:
            return state;
    }

}

export default population;