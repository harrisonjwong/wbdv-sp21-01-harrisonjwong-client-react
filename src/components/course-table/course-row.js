import React from 'react';
import {Link} from 'react-router-dom';

export default class CourseRow extends React.Component {
  state = {
    editing: false,
    name: this.props.course.name || '',
  };

  saveName(course) {
    this.setState((old) => ({...old, editing: false}))
    const newCourse = {
      ...course,
      name: this.state.name
    };
    this.props.updateCourse(newCourse);
  }

  render() {
    return (
      <tr>
        <td>
          {
            !this.state.editing &&
            <Link to={`/courses/table/edit/${this.props.course._id}`}>
              {this.props.course.name}
            </Link>
          }
          {
            this.state.editing && <input onChange={
              (event) => this.setState({name: event.target.value})
            }
                                         value={this.state.name}
                                         className='form-control'/>
          }
        </td>
        <td className='d-none d-md-table-cell'>{this.props.course.owner}</td>
        <td className='d-none d-lg-table-cell'>{this.props.course.modified}</td>
        <td className='text-right'>
          {
            this.state.editing &&
            <i className='wbdv-clickable wbdv-delete fas fa-times'
               onClick={() => this.props.deleteCourse(this.props.course)}/>}
          {
            !this.state.editing &&
            <i className='wbdv-clickable fas fa-edit'
               onClick={() => this.setState((old) => ({...old, editing: true}))}/>
          }
          {
            this.state.editing &&
            <i className='wbdv-clickable fas fa-check wbdv-save'
               onClick={() => this.saveName(this.props.course)}
            />
          }
        </td>
      </tr>
    );
  }
}