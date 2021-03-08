import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import EditableItem from './editable-item';
import moduleService from '../../services/module-service'

const ModuleList =
  ({
     modules = [],
     createModule,
     deleteModule,
     updateModule,
     findModulesForCourse
  }) => {
    const {layout, courseId, moduleId} = useParams();
    useEffect(() => {
      if (courseId !== 'undefined' && typeof courseId !== undefined) {
        findModulesForCourse(courseId);
      }
    }, [moduleId, courseId, findModulesForCourse]);
    return (
      <div>
        <ul className='list-group'>
          {
            modules.map(module =>
              <li className={`list-group-item ${module._id === moduleId ? 'active' : ''}`} key={module._id}>
                <EditableItem to={`/courses/${layout}/edit/${courseId}/modules/${module._id}`}
                              updateItem={updateModule}
                              deleteItem={deleteModule}
                              active={module._id === moduleId}
                              item={module}
                              highlight={`${module._id === moduleId ? 'wbdv-link-white' : ''}`}
                />
              </li>
            )
          }
          <li className='list-group-item fas fa-plus fa-2x wbdv-clickable wbdv-add-item
                       d-inline-block text-center'
              onClick={() => createModule(courseId)}/>
        </ul>
      </div>
    );
  };

const stpm = (state) => {
  return {
    modules: state.moduleReducer.modules
  };
}

const dtpm = (dispatch) => {
  return {
    createModule: (courseId) => {
      moduleService.createModule(courseId, {title: 'New Module'})
        .then(moduleFromServer => dispatch({
          type: 'CREATE_MODULE',
          module: moduleFromServer
        }));
    },
    findModulesForCourse: (courseId) => {
      moduleService.findModulesForCourse(courseId)
        .then(modulesFromServer => dispatch({
          type: 'FIND_MODULES_FOR_COURSE',
          modules: modulesFromServer
        }));
    },
    updateModule: (module) => {
      moduleService.updateModule(module._id, module)
        .then(status => dispatch({
          type: 'UPDATE_MODULE',
          moduleToUpdate: module
        }));
    },
    deleteModule: (module) => {
      moduleService.deleteModule(module._id)
        .then(status => dispatch({
          type: 'DELETE_MODULE',
          moduleToDelete: module
        }));
    }
  }
}

export default connect(stpm, dtpm)(ModuleList);