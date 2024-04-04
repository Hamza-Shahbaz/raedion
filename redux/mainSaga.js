import { all } from "redux-saga/effects";
import StudentsSaga from "./saga/StudentSaga";

export function* mainSaga() {
  yield all([
    StudentsSaga()
  ]);
}