import { Component, Fragment } from 'react';
import Navbar from '../shared/components/Navbar'
import {
    Button,
    Input,
    Col,
    Row,
    FormGroup,
    FormFeedback
} from 'reactstrap';
import ArtList from './components/ArtList';
import MetaTags from 'react-meta-tags';
import { getDoc, doc } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const BG_COLOR = "#fff"
const TEXT_COLOR = "#000"

class Admin extends Component {
    constructor(props) {
        super(props)

        this.collections = [{
            name: "Art",
            value: "art"
        }, {
            name: "Other",
            value: "other"
        }]

        this.state = {
            email: null,
            password: null,
            user: null,
            activeTab: "1",
            invalidLogin: false,
            collection: this.collections[0].value,
            accessKey: "",
            secretKey: ""
        }

        this.auth = this.props.auth
        this.db = this.props.db
    }

    componentDidMount() {
        this.signOut()
        this.auth.onAuthStateChanged(this.updateUserState)
    }

    updateUserState = (user) => {
        this.setState({ user: user })
    }

    getCredentials = async () => {
        let accessKeyRef = doc(this.db, "secrets", "accessKey")
        let secretKeyRef = doc(this.db, "secrets", "secretKey")
        let accessKeySnap = await getDoc(accessKeyRef)
        let secretKeySnap = await getDoc(secretKeyRef)
        let accessKey = accessKeySnap.data().key
        let secretKey = secretKeySnap.data().key

        this.setState({
            accessKey: accessKey,
            secretKey: secretKey
        })
    }

    signIn = () => {
        let email = this.state.email
        let password = this.state.password

        signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                //const user = userCredential.user;
                this.getCredentials()
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                this.setState({ invalidLogin: true })
            });
    }

    signOut = async () => {
        signOut(this.auth).then(() => {
        }).catch((error) => {
            console.log(error)
        });
    }

    emailChanged = (e) => {
        let email = e.target.value
        this.setState({ email: email, invalidLogin: false })
    }

    passwordChanged = (e) => {
        let password = e.target.value
        this.setState({ password: password, invalidLogin: false })
    }

    switchTab = (id) => {
        this.setState({ activeTab: id })
    }

    validField = (field) => {
        return field !== null && field !== ""
    }

    validData = () => {
        return this.validField(this.state.email) && this.validField(this.state.password)
    }

    onKeyPress = (event) => {
        if (event.charCode === 13 && this.validData()) {
            this.signIn()
        }
    }

    collectionChanged = (collection) => {
        this.setState({ collection: collection })
        console.log(collection)
    }

    render() {
        document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
        document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);

        if (this.state.user == null) {
            let valid = this.validData()
            let invalidLogin = this.state.invalidLogin

            return (
                <Col>
                    <MetaTags>
                        <meta name="theme-color" content="#ffffff" />
                    </MetaTags>

                    <Navbar />

                    <h1 className="mx-4">Admin</h1>

                    <Row className="justify-content-center align-content-center">
                        <Col className="mx-4" xs={6}>
                            <FormGroup>
                                <Input
                                    className="m-2"
                                    type="text"
                                    placeholder="Email"
                                    invalid={invalidLogin}
                                    onKeyPress={this.onKeyPress}
                                    onChange={this.emailChanged} />

                                <Input
                                    className="m-2"
                                    type="password"
                                    placeholder="Password"
                                    invalid={invalidLogin}
                                    onKeyPress={this.onKeyPress}
                                    onChange={this.passwordChanged} />

                                <FormFeedback>
                                    Invalid username or password
                                </FormFeedback>
                            </FormGroup>

                            <Button
                                onClick={this.signIn}
                                color="primary"
                                disabled={!valid}
                                className="mx-2">
                                Sign In
                            </Button>
                        </Col>
                    </Row>
                </Col>
            )
        } else {
            return (
                <Fragment>
                    <MetaTags>
                        <meta name="theme-color" content="#ffffff" />
                    </MetaTags>

                    <Navbar />

                    <h1 className="mx-4">Admin</h1>
                    <Button onClick={this.signOut} className="mx-4 mt-2 mb-4">Sign Out</Button>

                    <ArtList
                        db={this.db}
                        collection={this.state.collection}
                        collectionChanged={this.collectionChanged}
                        collections={this.collections}
                        awsAccessKey={this.state.accessKey}
                        awsSecretKey={this.state.secretKey}
                    />

                </Fragment>
            )
        }
    }
}

export default Admin;