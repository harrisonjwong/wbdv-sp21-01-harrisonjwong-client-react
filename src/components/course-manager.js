import React from 'react';
import CourseTable from './course-table/course-table';
import CourseGrid from './course-grid/course-grid';
import CourseService from '../services/course-service';
import {Route, Link} from 'react-router-dom';

export default class CourseManager extends React.Component {
  state = {
    courses: [],
    newName: '',
  };

  componentDidMount() {
    CourseService.findAllCourses()
      .then(courses => this.setState({courses}));
  }

  addCourse = () => {
    const newCourse = {
      name: this.state.newName || 'New Course',
      owner: 'me',
      modified: '2021-02-17'
    };
    CourseService.createCourse(newCourse)
      .then(actualCourse => {
        this.setState((old) => ({
          ...old,
          courses: [...old.courses, actualCourse],
          newName: '',
        }));
      });
  };

  deleteCourse = (course) => {
    CourseService.deleteCourse(course._id)
      .then(status => {
        this.setState((old) => ({
          courses: old.courses.filter(c => c._id !== course._id)
        }));
      });
  };

  updateCourse = (course) => {
    CourseService.updateCourse(course._id, course)
      .then(status => {
        this.setState((old) => {
          let nextState = {...old};
          nextState.courses = old.courses.map(c => {
            if (c._id === course._id) {
              return course;
            } else {
              return c;
            }
          });
          return nextState;
        });
      });
  }

  render() {
    return (
      <div>
        <div className="wbdv-navbar">
          <div className="row">
            <div className="col-1">
              <Link to="/">
                <i className="fas fa-bars fa-2x"/>
              </Link>
            </div>
            <div className="col-2 d-none d-lg-block wbdv-navbar-title">
              Course Manager
            </div>
            <div className="col-8">
              <input className="form-control"
                     onChange={
                       (event) => this.setState({newName: event.target.value})
                     }
                     value={this.state.newName}/>
            </div>
            <div className="col-1 float">
              <i className="wbdv-clickable fas fa-plus-circle fa-2x wbdv-create" onClick={this.addCourse}/>
            </div>
          </div>
        </div>
        <i className="wbdv-clickable fas fa-plus-circle fa-3x wbdv-create wbdv-floating-create"
           onClick={this.addCourse}/>

        <Route path='/courses/table'>
          <CourseTable
            courses={this.state.courses}
            deleteCourse={this.deleteCourse}
            updateCourse={this.updateCourse}
          />
        </Route>
        <Route path='/courses/grid'>
          <CourseGrid courses={this.state.courses}
                      deleteCourse={this.deleteCourse}
                      updateCourse={this.updateCourse}
          />
        </Route>
      </div>
    );
  }
}