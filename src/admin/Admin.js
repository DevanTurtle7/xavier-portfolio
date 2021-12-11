import { Component, Fragment } from 'react';
import Navbar from '../components/Navbar'
import { Button, Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import GalleryList from './components/GalleryList';

import { signInWithEmailAndPassword, signOut } from "firebase/auth";

class Admin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            user: null,
            activeTab: "1"
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
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
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
        this.setState({ email: email })
    }

    passwordChanged = (e) => {
        let password = e.target.value
        this.setState({ password: password })
    }

    switchTab = (id) => {
        this.setState({ activeTab: id})
    }

    render() {
        if (this.state.user == null) {
            return (
                <Fragment>
                    <Navbar />

                    <h1>Admin</h1>
                    <Button onClick={this.signIn}>Sign In</Button>
                    <Input type="text" placeholder="Email" onChange={this.emailChanged}></Input>
                    <Input type="password" placeholder="Password" onChange={this.passwordChanged}></Input>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <Navbar />

                    <h1>Admin</h1>
                    <Button onClick={this.signOut} className="m-2">Sign Out</Button>

                    <Nav tabs>
                        <NavItem>
                            <NavLink active={this.state.activeTab === "1"} onClick={() => this.switchTab("1")}>
                                Art
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active={this.state.activeTab === "2"} onClick={() => this.switchTab("2")}>
                                Sketchbook
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <GalleryList storage={this.storage} db={this.db} />
                        </TabPane>
                        <TabPane tabId="2">
                            <h1>Sketchbook</h1>
                        </TabPane>
                    </TabContent>
                </Fragment>
            )
        }
    }
}

export default Admin;