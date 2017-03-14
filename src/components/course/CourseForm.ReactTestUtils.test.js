import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(isSaving) {
    let props = {
        course: {},
        saving: isSaving,
        errors: {},
        allAuthors: [],
        onSave: () => { },
        onChange: () => { }
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<CourseForm {...props} />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

describe("CourseForm via React Test Utils", () => {
    it("should render form and h1", () => {
        const { output } = setup();
        expect(output.type).toBe("form");
        const [h1] = output.props.children;
        expect(h1.type).toBe("h1");
    });

    it("should set button text to 'Save' when not saving", () => {
        const { output } = setup(false);
        const input = output.props.children[5];
        expect(input.type).toBe("input");
        expect(input.props.value).toBe("Save");
    });

    it("should set button text to 'Saving' when saving", () => {
        const { output } = setup(true);
        const input = output.props.children[5];
        expect(input.type).toBe("input");
        expect(input.props.value).toBe("Saving");
    });
});