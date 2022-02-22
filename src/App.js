import { Component } from 'react';
import Art from './pages/Art';
import Other from './pages/Other';
import Contact from './pages/Contact';
import Admin from './admin/Admin';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1O3ZZUuxv0-PGJPZI9UffooMkAHdyjZw",
    authDomain: "fir-2e91f.firebaseapp.com",
    databaseURL: "https://fir-2e91f.firebaseio.com",
    projectId: "fir-2e91f",
    storageBucket: "fir-2e91f.appspot.com",
    messagingSenderId: "352914266642",
    appId: "1:352914266642:web:7b8ee0cd82b397e3c296cb"
};

const IMG_URL = "https://xavier-portfolio.s3.us-east-2.amazonaws.com/";

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            artData: [],
            otherData: []
        }
    }

    getData = async (collectionName, onEachLoad) => {
        console.log("Retrieving data...")
        const querySnapshot = await getDocs(collection(db, collectionName));
        let media = []

        for (let i = 0; i < querySnapshot.docs.length; i++) {
            let doc = querySnapshot.docs[i]
            let data = doc.data();
            let type = data.type;
            let order = data.order;
            let current;

            if (type === "media") {
                let description = data.description;
                let currentContent = []
                let content = data.content;

                for (let i = 0; i < content.length; i++) {
                    let fileInfo = content[i]
                    let fileName = fileInfo.filename
                    let fileType = fileInfo.type

                    let url = IMG_URL + fileName

                    currentContent.push({ url: url, type: fileType })
                }

                current = {
                    description: description,
                    order: order,
                    content: currentContent,
                    type: "media",
                    link: "google.com"
                }
            } else if (type === "text") {
                let content = data.content
                let size = data.size

                content = content.replaceAll("$[n]", "\n")

                current = {
                    content: content,
                    order: order,
                    type: "text",
                    size: size
                }
            } else {
                console.log("Invalid type: " + type)
            }

            if (current !== undefined) {
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
                    onEachLoad(media)
                } else {
                    media.push(current)
                    onEachLoad(media)
                }
            }
        }

        console.log("Data retrieved")
        return media;
    }

    updateArtData = async () => {
        await this.getData("art", (media) => {
            this.setState({ artData: media })
        })
        //this.setState({artData: artData})
    }

    updateOtherData = async () => {
        await this.getData("other", (media) => {
            this.setState({ otherData: media })
        })
        //this.setState({otherData: otherData})
    }

    componentDidMount() {
        this.updateArtData()
        this.updateOtherData()
    }

    render() {
        let artData = this.state.artData
        let otherData = this.state.otherData

        return (
            <Router>
                <Routes> {/* The Switch decides which component to show based on the current URL.*/}
                    <Route exact path='/' element={<Art media={artData} />} />
                    <Route exact path='/art' element={<Art media={artData} />} />
                    <Route exact path='/contact' element={<Contact />} />
                    <Route exact path='/other' element={<Other media={otherData} />} />
                    <Route exact path='/admin' element={<Admin db={db} auth={auth} />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
