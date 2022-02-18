import { fetchActiveServiceFailure, fetchActiveServiceSuccess, fetchServicesFailure, fetchServicesSuccess } from "../actions/actionCreators";
import { FETCH_ACTIVE_SERVICE_REQUEST, FETCH_SERVICES_REQUEST } from "../actions/actionTypes";
import { fetchActiveService, fetchServices } from "../api";
import { takeEvery, put, spawn, call } from 'redux-saga/effects';

// worker
function* handleFetchServicesSaga () {
    try {
        const data = yield fetchServices();
        yield put(fetchServicesSuccess(data));
    } catch (e) {
        yield put(fetchServicesFailure(e.message));
    }
}

// watcher
function* watchFetchServicesSaga () {
    yield takeEvery(FETCH_SERVICES_REQUEST, handleFetchServicesSaga);
}

// worker
function* handleFetchActiveServiceSaga (action) {
    try {
        const data = yield fetchActiveService(action.payload.id);
        yield put(fetchActiveServiceSuccess(data));
    } catch (e) {
        yield put(fetchActiveServiceFailure(e.message));
    }
}

// watcher
function* watchFetchActiveServiceSaga () {
    yield takeEvery(FETCH_ACTIVE_SERVICE_REQUEST, handleFetchActiveServiceSaga);
}

export default function* saga() {
    yield spawn(watchFetchServicesSaga);
    yield spawn(watchFetchActiveServiceSaga)
}