import React from 'react';
import CourseTable from './course-table/course-table';
import CourseGrid from './course-grid/course-grid';
import CourseService from '../services/course-service';
import {Route} from 'react-router-dom';
import CourseEditor from './course-editor/course-editor';
import Navbar from './navbar';
import Quizzes from './quizzes/quizzes';
import Quiz from './quizzes/quiz';
import QuizResults from './quizzes/quiz-results';

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
        <Route path='/courses/table' exact={true}>
          <div>
            <Navbar addCourse={this.addCourse}
                    nameOnChange={(event) => this.setState({newName: event.target.value})}
                    newName={this.state.newName}/>
            <CourseTable
              courses={this.state.courses}
              deleteCourse={this.deleteCourse}
              updateCourse={this.updateCourse}
            />
          </div>
        </Route>
        <Route path='/courses/grid' exact={true}>
          <div>
            <Navbar addCourse={this.addCourse}
                    nameOnChange={(event) => this.setState({newName: event.target.value})}
                    newName={this.state.newName}/>
            <CourseGrid courses={this.state.courses}
                        deleteCourse={this.deleteCourse}
                        updateCourse={this.updateCourse}
            />
          </div>
        </Route>
        <Route path={['/courses/:layout/edit/:courseId',
                      '/courses/:layout/edit/:courseId/modules/:moduleId',
                      '/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId',
                      '/courses/:layout/edit/:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId']}
               exact={true}
               render={(props) => <CourseEditor {...props}/>}/>
        <Route path='/courses/:courseId/quizzes' exact={true}>
          <Quizzes/>
        </Route>
        <Route path='/courses/:courseId/quizzes/:quizId' exact={true}>
          <Quiz/>
        </Route>
        <Route path='/courses/:courseId/quizzes/:quizId/results' exact={true}>
          <QuizResults/>
        </Route>
      </div>
    );
  }
}