import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import UserContext from '../../context/UserContext';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

function Login() {
    const classes = useStyles();

    const history = useHistory()
    const { setUserData } = useContext(UserContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSignIn = async (event) => {
        event.preventDefault();
        const loginUser = {
            email: email,
            password: password
        };
        const resLogin = await Axios.post("http://localhost:5000/users/login", loginUser);

        setUserData({
            token: resLogin.data.token,
            user: resLogin.data.user
        })
        localStorage.setItem("auth-token", resLogin.data.token);

        if (resLogin.status === 200) history.push("/account");
        else {
            setEmail("");
            setPassword("");
        }
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
                    <FormControlLabel
                        className={classes.remember}
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        name="signin"
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSignIn}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default Login;