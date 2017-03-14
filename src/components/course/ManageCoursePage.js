import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import {formatAuthors} from '../../selectors/selectors';

export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            allAuthors: [],
            onSave: function () { },
            saving: false,
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

    redirectTo(destination) {
        this.context.router.push(destination);
        this.setState({ saving: false });
        toastr.success("Course saved.");
    }

    handleSaveError(error) {
        this.setState({ saving: false });
        toastr.error(error);
    }

    isCourseValid() {
        let courseIsValid = true;
        let errors = {};

        if (this.state.course.title.length < 5) {
            errors.title = "Title must be at least 5 characters long.";
            courseIsValid = false;
        }

        this.setState({ errors: errors });
        return courseIsValid;
    }

    saveCourse(event) {
        event.preventDefault();

        if (!this.isCourseValid()) {
            return;
        }

        this.setState({ saving: true });
        this.props.actions.saveCourse(this.state.course)
            .then(() => this.redirectTo("/courses"))
            .catch(error => this.handleSaveError(error));
    }

    render() {
        return (
            <CourseForm
                course={this.state.course}
                allAuthors={this.props.authors}
                onSave={this.saveCourse}
                onChange={this.updateCourseState}
                saving={this.state.saving}
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

    let formattedAuthors = formatAuthors(state.authors);

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