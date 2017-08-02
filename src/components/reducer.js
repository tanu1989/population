import * as actions from './actions';

const initialState = {
    population: {},
    loading: false,
    error: false,
    errorDetail: null,

    totalPopulation: {
        totalPopulation: [],
        loading: false,
        error: false,
        errorDetail: null,
    },
    countries: {
        isCountriesLoading: false,
        countries: [],
        cError: false,
        cErrorDetail: null
    },
    ranking: {
        ranking: {},
        rLoading: false,
        rError: false,
        rErrorDetail: null
    },
    smallestCountries: {
        sCountries: [],
        isLoading: false,
        error: false
    }
}

const reduceFetchPopulation = (state) => {
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
        errorDetail: action.payload,
        error: true,
        loading: false
    }

}

const reduceFetchCountries = (state) => {
    return {
        ...state,
        countries: {
            ...state.countries,
            isLoading: true,
        }
    }
}

const reduceFetchCountriesSuccess = (state, action) => {
    return {
        ...state,
        countries: {
            ...state.countries,
            isLoading:false,
            countries: action.payload.countries
        }
    }
}

const reduceFetchCountriesError = (state, action) => {
    return {
        ...state,
        countries: {
            ...state.countries,
            cError: true,
            isLoading:false,
            cErrorDetail : action.payload
        }
    }
}

const reduceFetchRanking = (state) => {
    return {
        ...state,
        ranking: {
            ...state.ranking,
            rLoading:true
        }
    }

}

const reduceFetchRankingSuccess = (state, action) => {
    return {
        ...state,
        ranking: {
            ...state.ranking,
            rLoading:false,
            ranking: action.payload
        }
    }
}

const reduceFetchRankingError = (state,action) => {
    return {
        ...state,
        ranking: {
            ...state.ranking,
            rError: true,
            rLoading:false,
            rErrorDetail : action.payload
        }
    }
}

const reduceFetchSmallest = (state) => {
  return {
      ...state,
      smallestCountries:{
          ...state.smallestCountries,
          isLoading: true
      }
  }
}
const reduceFetchSmallestSuccess = (state, action) => {
    return {
        ...state,
        smallestCountries:{
            ...state.smallestCountries,
            isLoading: false,
            sCountries: action.payload
        }
    }
}

const reduceFetchSmallestError = (state) => {
    return {
        ...state,
        smallestCountries:{
            ...state.smallestCountries,
            isLoading: false,
            error: true
        }
    }
}

const reduceFetchTotalPopulation = (state) => {
    return {
        ...state,
        totalPopulation: {
            ...state.totalPopulation,
            loading:true
        }
    }
}

const reduceFetchTotalPopulationSuccess = (state, action) => {
    return {
        ...state,
        totalPopulation: {
            ...state.totalPopulation,
            loading:false,
            totalPopulation: action.payload
        }
    }
}

const reduceFetchTotalPopulationError = (state, action) => {
    return {
        ...state,
        totalPopulation: {
            ...state.totalPopulation,
            loading: false,
            error:true,
            errorDetail: action.payload
        }
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
        case actions.GET_COUNTRIES:
            return reduceFetchCountries(state, action);
        case actions.GET_COUNTRIES_SUCCESS:
            return reduceFetchCountriesSuccess(state, action);
        case actions.GET_COUNTRIES_ERROR:
            return reduceFetchCountriesError(state, action);
        case actions.FETCH_RANKING:
            return reduceFetchRanking(state, action);
        case actions.FETCH_RANKING_SUCCESS:
            return reduceFetchRankingSuccess(state, action);
        case actions.FETCH_RANKING_ERROR:
            return reduceFetchRankingError(state, action);
        case actions.FETCH_SMALLEST:
            return reduceFetchSmallest(state, action);
        case actions.FETCH_SMALLEST_SUCCESS:
            return reduceFetchSmallestSuccess(state, action);
        case actions.FETCH_SMALLEST_ERROR:
            return reduceFetchSmallestError(state, action);
        case actions.GET_TOTAL_POPULATION:
            return reduceFetchTotalPopulation(state,action);
        case actions.GET_TOTAL_POPULATION_SUCCESS:
            return reduceFetchTotalPopulationSuccess(state, action);
        case actions.GET_TOTAL_POPULATION_ERROR:
            return reduceFetchTotalPopulationError(state, action);
        default:
            return state;
    }

}

export default population;