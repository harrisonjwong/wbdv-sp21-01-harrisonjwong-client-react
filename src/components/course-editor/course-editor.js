import React from 'react';

const CourseEditor = ({history}) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-4'>
                <span>
                  <i className='fas fa-arrow-left fa-2x wbdv-close-editor-button wbdv-clickable'
                     onClick={() => history.goBack()}/>

                     <span className='wbdv-course-title'>CS5610 - WebDev</span>
                </span>
          <ul className='list-group'>
            <li className='list-group-item'>
              Module 1 - jQuery
              <i className='fas fa-times-circle float-right'/>
            </li>
            <li className='list-group-item'>
              Module 2 - React
              <i className='fas fa-times-circle float-right'/>
            </li>
            <li className='list-group-item'>
              Module 3 - Redux
              <i className='fas fa-times-circle float-right'/>
            </li>
            <li className='list-group-item'>
              Module 4 - Native
              <i className='fas fa-times-circle float-right'/>
            </li>
            <li className='list-group-item'>
              Module 5 - Angular
              <i className='fas fa-times-circle float-right'/>
            </li>
            <li className='list-group-item'>
              Module 6 - Node
              <i className='fas fa-times-circle float-right'/>
            </li>
            <li className='list-group-item'>
              Module 7 - Mongo
              <i className='fas fa-times-circle float-right'/>
            </li>
          </ul>
          <i className='fas fa-plus-circle fa-2x float-right wbdv-add-module-button'/>
        </div>

        <div className='col-8'>

          <div className='wbdv-tabs-bar'>
            <ul className='nav nav-tabs'>
              <li className='nav-item'>
                <button className='btn nav-link'>Build</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link active'>Pages</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>Theme</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>Store</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>Apps</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>Settings</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>+</button>
              </li>
            </ul>
          </div>

          <div className='wbdv-pills-bar'>
            <ul className='nav nav-pills'>
              <li className='nav-item'>
                <button className='btn nav-link'>Topic 1</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link active'>Topic 2</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>Topic 3</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>Topic 4</button>
              </li>
              <li className='nav-item'>
                <button className='btn nav-link'>+</button>
              </li>
            </ul>
          </div>
          <div className='block wbdv-widgets'>
            Widgets space intentionally left blank
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseEditor;