import './style/App.css';
import { Component } from 'react';
import Art from './pages/Art';
import Sketchbook from './pages/Sketchbook';
import Contact from './pages/Contact';
import Admin from './admin/Admin';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ref, getDownloadURL, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1O3ZZUuxv0-PGJPZI9UffooMkAHdyjZw",
  authDomain: "fir-2e91f.firebaseapp.com",
  databaseURL: "https://fir-2e91f.firebaseio.com",
  projectId: "fir-2e91f",
  storageBucket: "fir-2e91f.appspot.com",
  messagingSenderId: "352914266642",
  appId: "1:352914266642:web:7b8ee0cd82b397e3c296cb"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: []
    }
  }

  sortByOrder = () => {
    let images = this.state.images

    images.sort((first, second) => {
      if (first.order < second.order) {
        return -1
      } else if (first.order > second.order) {
        return 1
      } else {
        return 0
      }
    })

    this.setState({ images: images })
  }

  getArt = async () => {
    console.log("Retrieving art...")
    this.setState({ files: [] })
    const querySnapshot = await getDocs(collection(db, "art"));

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      let filename = data.filename;
      let title = data.title
      let year = data.year;
      let description = data.description;
      let type = data.type;
      let order = data.order;

      getDownloadURL(ref(storage, filename))
        .then((url) => {
          let images = this.state.images;

          let current = {
            url: url,
            title: title,
            year: year,
            description: description,
            order: order,
            type: type
          }

          let numImages = images.length;

          if (numImages > 0) {
            // Insert sorted
            let i = 0;
            let indexFound = false;

            while (i < numImages && !indexFound) {
              let currentOrder = images[i].order

              if (currentOrder >= order) {
                indexFound = true
              } else {
                i += 1
              }
            }

            images.splice(i, 0, current)
          } else {
            images.push(current)
          }

          this.setState({ images: images })
        })
        .catch((error) => {
          console.log(error)
        });
    })
  }

  componentDidMount() {
    this.getArt()
  }

  render() {
    return (
      <Router>
        <Routes> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path='/' element={<Art db={db} storage={storage} />} />
          <Route exact path='/art' element={<Art db={db} storage={storage} images={this.state.images} />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/sketchbook' element={<Sketchbook />} />
          <Route exact path='/admin' element={<Admin db={db} storage={storage} auth={auth} />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
