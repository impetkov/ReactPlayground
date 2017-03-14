import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import CourseForm from './CourseForm';

function setup(isSaving) {
    const props = {
        course: {},
        saving: isSaving,
        errors: {},
        allAuthors: [],
        onSave: () => { },
        onChange: () => { }
    };

    return shallow(<CourseForm {...props} />);
}

describe("Testing CourseForm via Enzyme", () => {
    it("Renders a form and h1", () => {
        const wrapper = setup(false);
        expect(wrapper.find("form").length).toBe(1);
        let h1Element = wrapper.find("h1");
        expect(h1Element.length).toBe(1);
        expect(h1Element.text()).toEqual("Manage Course");
    });

    it("Submit button labelled 'Save' when not saving", () => {
        const wrapper = setup(false);
        const submitButton = wrapper.find("input");

        expect(submitButton.props().value).toEqual("Save");
    });

    it("Submit button labelled 'Saving' when saving", () => {
        const wrapper = setup(true);
        const submitButton = wrapper.find("input");

        expect(submitButton.props().value).toEqual("Saving");
    });
});