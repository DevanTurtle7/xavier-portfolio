import './style/App.css';
import { Component } from 'react';
import Art from './pages/Art';
import Sketchbook from './pages/Sketchbook';
import Contact from './pages/Contact';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path='/' element={<Art />} />
          <Route exact path='/art' element={<Art />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/sketchbook' element={<Sketchbook />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
