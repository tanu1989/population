import BigNumber from 'bignumber.js';

export const calculatePopulationSum =(arr) =>{
    return arr.reduce((a,b) => {
        a = typeof a === 'string' ? new BigNumber(a) :new BigNumber(a.population.toString());
        b = (b === undefined) ? new BigNumber('0') : new BigNumber(b.population.toString());
        let sum = a.plus(b);
        return sum.c.join('').toString();
    }, '0');
}