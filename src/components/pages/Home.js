import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserContext from '../../context/UserContext';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

function Home() {
    const classes = useStyles();

    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();
    const onLogin = () => {
        history.push("/login")
    };
    const onLogout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    };
    const onRegister = () => {
        history.push("/register")
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Container component="main" className={classes.main} maxWidth="sm">
                <Typography variant="h2" component="h1" gutterBottom>
                    Home
                </Typography>
                {userData.user ? (
                    <>
                        <Button
                            name="logout"
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onLogout}
                        >
                            Log Out
                        </Button>
                    </>
                ) : (
                        <>
                            <Button
                                name="signin"
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={onLogin}
                            >
                                Sign In
                            </Button>
                            <Button
                                name="signup"
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={onRegister}
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
            </Container>
        </div >
    );
}

export default Home;