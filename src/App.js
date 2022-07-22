/**
 * The main page of the site. Routes to other pages
 * 
 * Props:
 *  NONE
 * 
 * @author Devan Kavalchek
 */

import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

import Art from './pages/Art';
import Archive from './pages/Archive';
import Contact from './pages/Contact';
import Credits from './pages/Credits';
import Admin from './admin/Admin';
import PageNotFound from './pages/PageNotFound';

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

function App(props) {
    const [dataGotten, setDataGotten] = useState(false)
    const [artData, setArtData] = useState([])
    const [archiveData, setArchiveData] = useState([])

    /**
     * Gets all of the data from a given collection in the database
     * 
     * @param {*} collectionName The name of the collection
     * @param {*} onEachLoad  A function that runs after each document is retrieved
     * @returns An array of JSON objets
     */
    const getData = async (collectionName, onEachLoad) => {
        console.log("Retrieving data...")

        // Get all docs from collection
        const querySnapshot = await getDocs(collection(db, collectionName));
        const media = []

        // Iterate over all of the documents in the collection
        for (let i = 0; i < querySnapshot.docs.length; i++) {
            const doc = querySnapshot.docs[i]
            const data = doc.data();
            const type = data.type;
            const order = data.order;
            let current;

            if (type === "media") {
                const description = data.description;
                const currentContent = []
                const content = data.content;

                // Iterate over the content
                for (let i = 0; i < content.length; i++) {
                    const fileInfo = content[i]
                    const fileName = fileInfo.filename
                    const fileType = fileInfo.type

                    const url = IMG_URL + fileName

                    // Save the content to the array
                    currentContent.push({ url: url, type: fileType })
                }

                // Create a JSON object from this document
                current = {
                    description: description,
                    order: order,
                    content: currentContent,
                    type: "media",
                    link: data.link
                }
            } else if (type === "text") {
                let content = data.content
                const size = data.size

                content = content.replaceAll("$[n]", "\n")

                // Create a JSON object from this document
                current = {
                    content: content,
                    order: order,
                    type: "text",
                    size: size,
                    link: data.link
                }
            } else if (type === "folder") {
                console.log(data)
                let content = data.content
                let description = data.description
                let currentContent = []

                for (let i = 0; i < content.length; i++) {
                    const info = content[i]
                    const currentType = info.type

                    if (currentType === "image" || currentType === "video") {
                        const fileName = info.filename
                        const url = IMG_URL + fileName

                        // Save the content to the array
                        currentContent.push({ url: url, type: currentType })
                    } else if (currentType === "text") {
                        currentContent.push({ content: info.content, type: currentType, size: info.size })
                    }
                }

                current = {
                    content: currentContent,
                    order: order,
                    type: "folder",
                    description: description,
                }
            } else {
                console.log("Invalid type: " + type)
            }

            if (current !== undefined) {
                // Insert the current object into the list of media in a sorted manner
                const mediaCount = media.length;

                if (mediaCount > 0) {
                    // Insert sorted
                    let i = 0;
                    let indexFound = false;

                    // Linear search
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

    /**
     * Updates the media that is displayed on the art page
     */
    const updateArtData = useCallback(async () => {
        await getData("art", (media) => {
            setArtData([...media])
        })
    }, [])

    /**
     * Updates the media that is displayed on the other page
     */
    const updateArchiveData = useCallback(async () => {
        await getData("other", (media) => {
            setArchiveData([...media])
        })
    }, [])

    useEffect(() => {
        if (!dataGotten) {
            updateArtData()
            updateArchiveData()
            setDataGotten(true)
        }
    }, [updateArtData, updateArchiveData, dataGotten])

    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Art media={artData} />} />
                <Route exact path='/art' element={<Art media={artData} />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/credits' element={<Credits />} />
                <Route exact path='/archive' element={<Archive media={archiveData} />} />
                <Route exact path='/admin' element={<Admin db={db} auth={auth} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
