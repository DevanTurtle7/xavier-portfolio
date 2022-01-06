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
import { MdContentCopy } from 'react-icons/md';

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
      media: []
    }
  }

  sortByOrder = () => {
    let media = this.state.media

    media.sort((first, second) => {
      if (first.order < second.order) {
        return -1
      } else if (first.order > second.order) {
        return 1
      } else {
        return 0
      }
    })

    this.setState({ media: media })
  }

  insertMediaSorted = (media) => {

  }

  getArt = async () => {
    console.log("Retrieving art...")
    this.setState({ files: [] })
    const querySnapshot = await getDocs(collection(db, "art"));

    querySnapshot.forEach(async (doc) => {
      let data = doc.data();
      let title = data.title
      let year = data.year;
      let description = data.description;
      let type = data.type;
      let order = data.order;
      let current;

      if (type === "carousel") {
        let currentContent = []
        let content = data.content;

        for (let i = 0; i < content.length; i++) {
          let fileInfo = content[i]
          let filename = fileInfo.filename
          let fileType = fileInfo.type

          await getDownloadURL(ref(storage, filename)).then((url) => {
            currentContent.push({ url: url, type: fileType })
          })
        }

        current = {
          title: title,
          year: year,
          description: description,
          order: order,
          type: type,
          content: currentContent
        }
      } else {
        let filename = data.filename;

        await getDownloadURL(ref(storage, filename))
          .then((url) => {
            current = {
              url: url,
              title: title,
              year: year,
              description: description,
              order: order,
              type: type
            }
          })
          .catch((error) => {
            console.log(error)
          });
      }

      if (current !== undefined) {
        let media = this.state.media;
        let mediaCount = media.length;

        if (mediaCount > 0) {
          // Insert sorted
          let i = 0;
          let indexFound = false;

          while (i < mediaCount && !indexFound) {
            let currentOrder = media[i].order

            if (currentOrder >= order) {
              indexFound = true
            } else {
              i += 1
            }
          }

          media.splice(i, 0, current)
        } else {
          media.push(current)
        }

        this.setState({ media: media })
      }
    })
    console.log(this.state.media)
  }

  componentDidMount() {
    this.getArt()
  }

  render() {
    return (
      <Router>
        <Routes> {/* The Switch decides which component to show based on the current URL.*/}
          <Route exact path='/' element={<Art media={this.state.media} />} />
          <Route exact path='/art' element={<Art media={this.state.media} />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/sketchbook' element={<Sketchbook />} />
          <Route exact path='/admin' element={<Admin db={db} storage={storage} auth={auth} />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
