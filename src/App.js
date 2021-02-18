import './App.css';
import CourseManager from './components/course-manager';
import CourseEditor from './components/course-editor/course-editor';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/home';

function App() {
  return (
    <div className='container-fluid'>
      <BrowserRouter>
        <Route path='/' exact={true}>
          <Home/>
        </Route>
        <Route path='/courses'>
          <CourseManager/>
        </Route>
        <Route path='/editor' exact={true} render={(props) => <CourseEditor {...props}/>}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
