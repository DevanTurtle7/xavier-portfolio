import '../style/LightStyle.css';
import { Component, Fragment } from 'react';
import Navbar from '../components/Navbar'
import {
    Button,
    Input,
    Col,
    Row,
    FormGroup,
    FormFeedback
} from 'reactstrap';
import ArtList from './components/ArtList';

import { signInWithEmailAndPassword, signOut } from "firebase/auth";

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
            collection: this.collections[0].value
        }

        this.auth = this.props.auth
        this.storage = this.props.storage
        this.db = this.props.db
    }

    componentDidMount() {
        this.signOut()
        this.auth.onAuthStateChanged(this.updateUserState)
    }

    updateUserState = (user) => {
        this.setState({ user: user })
    }

    signIn = () => {
        let email = this.state.email
        let password = this.state.password

        signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                //const user = userCredential.user;
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
        if (this.state.user == null) {
            let valid = this.validData()
            let invalidLogin = this.state.invalidLogin

            return (
                <Col>
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
                    <Navbar />

                    <h1 className="mx-4">Admin</h1>
                    <Button onClick={this.signOut} className="mx-4 mt-2 mb-4">Sign Out</Button>

                    <ArtList
                        storage={this.storage}
                        db={this.db}
                        collection={this.state.collection}
                        collectionChanged={this.collectionChanged}
                        collections={this.collections}
                    />

                </Fragment>
            )
        }
    }
}

export default Admin;