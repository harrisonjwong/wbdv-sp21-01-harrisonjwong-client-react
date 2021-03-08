import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const EditableItem = ({
                        to, deleteItem, updateItem, item = {title: 'fake title', _id: '1234'}, active, highlight
                      }) => {
  const [editing, setEditing] = useState(false);
  const [cachedItem, setCachedItem] = useState(item);
  return (
    <div>
      {
        !editing &&
        <span className={`nav-link ${active ? 'active' : ''}`}>
          <Link className={`d-inline-block ${highlight}`}
                to={to}>
            {item.title}
          </Link>
          <i className='d-inline-block float-right btn fas fa-edit' onClick={() => setEditing(true)}/>
        </span>
      }
      {
        editing &&
        <div className={`nav-link ${active ? 'active' : ''}`}>
          <input className='d-inline-block' onChange={(e) =>
            setCachedItem({
              ...cachedItem,
              title: e.target.value
            })}
                 value={cachedItem.title}/>
          <div className='d-inline-block float-right'>
            <i className='fas fa-check wbdv-clickable'
               onClick={() => {
                 setEditing(false)
                 updateItem(cachedItem)
               }}/>
            <i className='fas fa-times wbdv-clickable'
               onClick={() => {
                 setEditing(false)
                 deleteItem(item)
               }}/>
          </div>
        </div>
      }
    </div>
  );
}

export default EditableItem;