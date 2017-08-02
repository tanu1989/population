export const GET_POPULATION =  'GET_POPULATION';
export const GET_POPULATION_SUCCESS = 'GET_POPULATION_SUCCESS';
export const GET_POPULATION_ERROR = 'GET_POPULATION_ERROR';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIES_SUCCESS = 'GET_COUNTRIES_SUCCESS';
export const GET_COUNTRIES_ERROR = 'GET_COUNTRIES_ERROR';

export const FETCH_RANKING = 'FETCH_RANKING';
export const FETCH_RANKING_SUCCESS = 'FETCH_RANKING_SUCCESS';
export const FETCH_RANKING_ERROR = 'FETCH_RANKING_ERROR';

export const getPopulation = (country) => ({
    type: GET_POPULATION,
    country
});

export const getAllCountries = () => ({
    type: GET_COUNTRIES
});

export const getRanking = (dob, country, gender) => ({
    type: FETCH_RANKING,
    dob,
    country,
    gender
});