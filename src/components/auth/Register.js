import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 1),
    },
    remember: {
        width: '100%'
    }
}));

function Register() {
    const classes = useStyles();

    const history = useHistory()
    const { setUserData } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [displayName, setDisplayName] = useState("");

    const onSignUp = async (event) => {
        event.preventDefault();
        const newUser = {
            email,
            password,
            passwordCheck,
            displayName
        }

        await Axios.post("http://localhost:5000/users/register", newUser);
        const loginRes = await Axios.post(
            "http://localhost:5000/users/login", {
            email,
            password
        });

        setUserData({
            user: loginRes.data.user,
            token: loginRes.data.token
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">Sign in</Typography>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoFocus
                        onChange={e => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="passwordCheck"
                        label="Repeat Password"
                        type="password"
                        name="passwordCheck"
                        autoFocus
                        onChange={e => setPasswordCheck(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="displayName"
                        label="User"
                        name="displayName"
                        autoFocus
                        onChange={e => setDisplayName(e.target.value)}
                    />
                    <Button
                        fullWidth
                        name="signup"
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSignUp}
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default Register;