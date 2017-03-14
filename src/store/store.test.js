import expect from "expect";
import { createStore } from "redux";
import rootReducer from "../reducers/rootReducer";
import initialState from "../reducers/initialState";
import * as actions from "../actions/courseActions";

describe('Store', () => {
    it('Should create a new course successfully', () => {
        const store = createStore(rootReducer, initialState);
        const course = { id: 1, title: "test" };

        const action = actions.createCourseSuccess(course);
        store.dispatch(action);

        const newStoreState = store.getState();

        expect(newStoreState.courses[0]).toEqual(course);
    });
});