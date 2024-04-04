import { call, put, takeEvery } from "redux-saga/effects";
import { BaseUrl, EndPoints } from "../../utils/Api";
import axios from "axios";
import { ADD_NEW_CLASS, ADD_NEW_STUDENT, CHANGE_CLASS_TABLE, CHANGE_STUDENT_TABLE, EDIT_CLASS, EDIT_CURRENT_STUDENT } from "../constant/constants";


function* studentsModifier(actions) {

    console.log("inside the saga")
    try {
        if (actions.payload.isNew) {

            const response = yield call(axios.get, `${BaseUrl}${EndPoints.getDemo}`, {
                // Assuming action.payload contains the student data to be added
                title: actions.payload.name,
                // Include other product data as needed
            });
        if (response.status) {
            yield put({
            type: ADD_NEW_STUDENT,
            payload: actions.payload,
            });

        }
    }
    else {
        console.log("editing")
            const response = yield call(axios.post, `${BaseUrl}${EndPoints.postDemo}`, {
                // Assuming action.payload contains the student data to be added
                title: actions.payload.name,
                // Include other product data as needed
            });
        if (response.status == 200) {
            yield put({
            type: EDIT_CURRENT_STUDENT,
            payload: actions.payload,
            });

        }
    }
    } catch (error) {
        console.error("Something Went Wrong !", error.status);
        setIsLoading(false);
    }
}


function* classesModifier(actions) {

    try {
        if (actions.payload.isNew) {

            const response = yield call(axios.get, `${BaseUrl}${EndPoints.getDemo}`, {
                // Assuming action.payload contains the student data to be added
                title: actions.payload.name,
                // Include other product data as needed
            });
        if (response.status) {
            yield put({
            type: ADD_NEW_CLASS,
            payload: actions.payload,
            });

        }
    }
    else {
        console.log("editing")
            const response = yield call(axios.post, `${BaseUrl}${EndPoints.postDemo}`, {
                // Assuming action.payload contains the student data to be added
                title: actions.payload.name,
                // Include other product data as needed
            });
        if (response.status == 200) {
            yield put({
            type: EDIT_CLASS,
            payload: actions.payload,
            });

        }
    }
    } catch (error) {
        console.error("Something Went Wrong !", error.status);
        setIsLoading(false);
    }
}


function* StudentsSaga() {
    yield takeEvery(CHANGE_STUDENT_TABLE, studentsModifier);
    yield takeEvery(CHANGE_CLASS_TABLE, classesModifier)
  }
  
  export default StudentsSaga;
