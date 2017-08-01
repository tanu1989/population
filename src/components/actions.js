export const GET_POPULATION =  'GET_POPULATION';
export const GET_POPULATION_SUCCESS = 'GET_POPULATION_SUCCESS';
export const GET_POPULATION_ERROR = 'GET_POPULATION_ERROR'

export const getPopulation = (country, currentDate) => ({
    type: GET_POPULATION,
    country,
    currentDate
});