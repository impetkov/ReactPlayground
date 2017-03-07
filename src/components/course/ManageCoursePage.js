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
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.course.id !== newProps.course.id) {
            this.setState({
                course: Object.assign({}, newProps.course)
            });
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({ course: course });
    }

    saveCourse(event) {
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push("/courses");
    }

    render() {
        return (
            <CourseForm
                course={this.state.course}
                allAuthors={this.props.authors}
                onSave={this.saveCourse}
                onChange={this.updateCourseState}
                loading={this.state.loading}
                errors={this.state.errors} />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(allCourses, id) {
    const matchingCourses = allCourses.filter((course) => {
        return course.id === id;
    });

    if (matchingCourses.length) {
        return matchingCourses[0];
    }

    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;
    let course = {
        id: "",
        watchHref: "",
        title: "",
        authorId: "",
        category: "",
        length: ""
    };

    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

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