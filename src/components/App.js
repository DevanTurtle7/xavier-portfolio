import '../style/App.css';
import { Component } from 'react';
import Gallery from './Gallery';
import Other from './Other';
import Contact from './Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path='/' element={<Gallery />} />
          <Route exact path='/gallery' element={<Gallery />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/other' element={<Other />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
