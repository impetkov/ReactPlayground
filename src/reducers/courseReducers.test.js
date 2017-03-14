import expect from "expect";
import * as actions from "../actions/courseActions";
import courseReducer from "./courseReducers";

describe('Course Reducers', () => {
    describe('Create Course Success', () => {
        it('should return correctly created course', () => {
            const state = [{ id: 1, title: "test1" }, { id: 2, title: "test2" }];
            const course = { id: 3, title: "test3" };

            const action = actions.createCourseSuccess(course);

            const expectedState = [{ id: 1, title: "test1" }, { id: 2, title: "test2" }, { id: 3, title: "test3" }];

            let reducedState = courseReducer(state, action);

            expect(reducedState.length).toBe(3);
            expect(reducedState[0].title).toBe("test1");
            expect(reducedState[1].title).toBe("test2");
            expect(reducedState[2].title).toBe("test3");
            expect(reducedState).toEqual(expectedState);
        });
    });

    describe('Update Course Success', () => {
        it('should update course correctly', () => {
            const state = [
                { id: 1, title: "test1" },
                { id: 2, title: "test2" },
                { id: 3, title: "test3" }
            ];
            const course = { id: 3, title: "new title" };
            const action = actions.updateCourseSuccess(course);

            const newState = courseReducer(state, action);
            const updatedCourse = newState.find(x => x.id == course.id);
            const untouchedCourse = newState.find(x => x.id === 2);

            expect(newState.length).toBe(3);
            expect(untouchedCourse.title).toBe("test2");
            expect(updatedCourse.title).toBe("new title");
        });
    });
});