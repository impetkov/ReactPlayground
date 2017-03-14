import expect from "expect";
import thunk from "redux-thunk";
import nock from "nock";
import configureMockStore from "redux-mock-store";
import * as courseActions from "./courseActions";
import * as types from "./actionTypes";

describe('Course Actions', () => {
    describe('Create new course', () => {
        it('should return correct object', () => {
            const course = { id: 1, title: "test" };
            const expectedObject = { type: types.CREATE_COURSE, course: course };

            expect(courseActions.createCourse(course)).toEqual(expectedObject);
        });
    });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('shoudl create appropriate actions when loading courses', (done) => {
        // nock example call
        // nock("http://example.com/")
        //  .get("/courses")
        //  .reply(200, { body: { courses: [{ id: 1, title: "test" }]}});

        const expectedActions = [
            { type: types.BEGIN_AJAX_CALL },
            { type: types.LOAD_COURSES_SUCCESS, body: { courses: [{ id: 1, title: "test" }] } }
        ];

        const store = mockStore({ courses: [] }, expectedActions);
        store.dispatch(courseActions.loadCourses())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
                expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
                done();
            });
    });
});