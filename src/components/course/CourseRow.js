import React, {PropTypes} from 'react';

class CourseRow extends React.Component {
    render(){
        return (          
            <table className="table">
                <div>{this.props.course.title}</div>              
            </table>  
        );
    }
}

CourseRow.propTypes = {
    course: PropTypes.object.isRequired
};

export default CourseRow;