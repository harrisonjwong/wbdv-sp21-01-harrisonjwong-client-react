import './App.css';
import CourseManager from './components/course-manager';
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
      </BrowserRouter>
    </div>
  );
}

export default App;
