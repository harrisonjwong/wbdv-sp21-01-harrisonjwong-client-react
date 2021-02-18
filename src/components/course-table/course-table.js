import React from 'react';
import {Link} from 'react-router-dom';
import CourseRow from './course-row';

export default class CourseTable extends React.Component {
  render() {
    return (
      <div className='container-fluid'>
        <h1>Course Table</h1>

        <table className='table'>
          <thead>
          <tr>
            <th>Course Name</th>
            <th className='d-none d-md-table-cell'>Owned By</th>
            <th className='d-none d-lg-table-cell'>Last Modified</th>
            <th>
              <div className='float-right'>
                <i className='fas fa-folder fa-2x mr-2'/>
                <i className='fas fa-sort-alpha-up-alt fa-2x mr-2'/>
                <Link to='/courses/grid'>
                  <i className='fas fa-2x fa-th'/>
                </Link>
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.courses.map(course =>
              <CourseRow key={course._id}
                         course={course}
                         deleteCourse={this.props.deleteCourse}
                         updateCourse={this.props.updateCourse}

              />)
          }
          </tbody>
        </table>
      </div>
    );
  }
}