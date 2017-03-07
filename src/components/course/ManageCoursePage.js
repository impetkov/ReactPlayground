import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            allAuthors: [],
            onSave: function () { },
            loading: false,
            errors: {}
        };

        this.updateCourseState = this.updateCourseState.bind(this);
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({ course: course });
    }

    render() {
        return (
            <CourseForm
                course={this.state.course}
                allAuthors={this.props.authors}
                onSave={this.state.onSave}
                onChange={this.updateCourseState}
                loading={this.state.loading}
                errors={this.state.errors} />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired
};

function getCourseById(allCourses, id) {
    const matchingCourses = allCourses.filter((course) => {
        return course.id === id;
    });

    if(matchingCourses.length){
        return matchingCourses[0];
    }

    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;
    let course = getCourseById(state.courses, courseId);    

    const formattedAuthors = state.authors.map((author) => {
        return {
            value: author.id,
            text: author.firstName + " " + author.lastName
        };
    });

    return {
        course: course,
        authors: formattedAuthors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageCoursePage);