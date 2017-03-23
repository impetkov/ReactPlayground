import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const CourseListRow = ({ course, deleteCourse }) => {
    return (
        <tr>
            <td>
                <a href={course.watchHref} target="_blank"> Watch </a>
                {"|"}
                <span onClick={deleteCourse.bind(null, { course: course })} style={{cursor: "pointer"}}> Delete </span>
            </td>
            <td>
                <Link to={"/course/" + course.id}>  {course.title} </Link>
            </td>
            <td>{course.authorId}</td>
            <td>{course.category}</td>
            <td>{course.length}</td>
        </tr>
    );
};

CourseListRow.propTypes = {
    course: PropTypes.object.isRequired,
    deleteCourse: PropTypes.func.isRequired
};

export default CourseListRow; 