import { fork } from 'redux-saga/effects';
import sagas from '../src/components/sagas';

export default function* root() {
    yield fork(sagas);

}