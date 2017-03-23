import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import toastr from 'toastr';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: {
                title: ""
            }
        };

        this.redirectToManageCoursesPage = this.redirectToManageCoursesPage.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    deleteCourse(course){            
        if(course === undefined){
            return;
        }
        
        this.props.actions.deleteCourse(course.course)
            .then(() => {
                toastr.success("Course deleted.");
            })
            .catch(() => {
                
            });        
    }

    redirectToManageCoursesPage() {
        browserHistory.push("/course");
    }

    render() {
        const { courses } = this.props;
        return (
            <div>
                <h1>Courses</h1>
                <input
                    type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToManageCoursesPage} />
                <CourseList courses={courses} deleteCourse={this.deleteCourse}/>
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); 