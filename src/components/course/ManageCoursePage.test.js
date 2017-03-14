import React from 'react';
import expect from "expect";
import { mount, shallow } from "enzyme";
import { ManageCoursePage } from "./ManageCoursePage";

function setup() {
    const props = {
        course: {
            id: "",
            watchHref: "",
            title: "",
            authorId: "",
            category: "",
            length: ""
        },
        authors: [],

        actions: { saveCourse: () => { return Promise.resolve(); } }
    };

    return mount(<ManageCoursePage {...props} />);
}

describe("Manage Course Page", () => {
    it("Sets error message when saving a course with blank title", () => {
        const wrapper = setup();
        const saveButton = wrapper.find("input").last();
        expect(saveButton.prop("type")).toBe("submit");
        saveButton.simulate("click");

        expect(wrapper.state().errors.title).toBe("Title must be at least 5 characters long.");
    });
});