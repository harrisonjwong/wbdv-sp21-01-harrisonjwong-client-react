import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './course-card';

const CourseGrid = ({courses, deleteCourse, updateCourse}) => {
  return (
    <div className='container-fluid'>
      <h1>Course Grid</h1>
      
      <div className='row justify-content-end'>
        <div className='col-4 d-none d-md-block font-weight-bold text-left'>
          Recent Documents
        </div>
        <div className='col-4 d-none d-md-block font-weight-bold text-center'>
          Owned by me
          <i className='fas fa-chevron-down'/>
        </div>
        <div className='col-4 d-block text-right float-right'>
          <i className='fas fa-folder fa-2x mr-2'/>
          <i className='fas fa-sort-alpha-up-alt fa-2x mr-2'/>
          <Link to='/courses/table'>
            <i className='fas fa-2x fa-table'/>
          </Link>
        </div>
      </div>

      <br/>

      <div className='row'>
        {
          courses.map(course =>
            <CourseCard
              key={course._id}
              course={course}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}
            />)
        }
      </div>
    </div>
  );
}

export default CourseGrid;