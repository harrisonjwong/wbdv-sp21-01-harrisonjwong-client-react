import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({course, deleteCourse, updateCourse}) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const saveName = () => {
    setEditing(false);
    const newCourse = {
      ...course,
      name: newName,
    };
    updateCourse(newCourse);
  }

  React.useEffect(() => {
    setNewName(course.name);
  }, [course])

  const handleChange = (event) => setNewName(event.target.value);

  return (
    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div className="card">
        <img src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png" className="card-img-top" alt="..."/>
        <div className="card-body">
          {!editing && <h5 className="card-title">{course.name}</h5>}
          {editing && <input onChange={handleChange}
                             value={newName}
                             className='form-control'
          />}
          <p className="card-text">Some description</p>
          <Link to="/editor" className="btn btn-primary">
            {course.name}
          </Link>
          { editing && <i className="wbdv-clickable fas fa-check float-right wbdv-save" onClick={() => saveName()}/>}
          {
            editing && <i className='wbdv-clickable fas fa-times float-right wbdv-delete'
                          onClick={() => deleteCourse(course)}/>
          }
          { !editing && <i className="wbdv-clickable fas fa-edit float-right" onClick={() => setEditing(true)}/>}

        </div>
      </div>
    </div>
  );
}

export default CourseCard;