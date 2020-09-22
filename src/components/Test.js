import React, { useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(90),
        alignContent: 'center',
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(2),
        },
    }
}))

function Test() {

    const classes = useStyles()

    const [list, setList] = useState([
        { id: 1, name: 'Robert', count: 5 },
        { id: 2, name: 'Paul', count: 3 },
        { id: 3, name: 'Peach', count: 10 }
    ]);

    const [search, setSearch] = useState('')

    function addToList() {
        setList([
            ...list,
            {
                id: uuidv4(),
                name: search,
                count: 0
            }
        ]);
        setSearch("");
    }

    const filteredUsers = useMemo(
        () =>
            list.filter((user) => {
                return user.name.toLowerCase().startsWith(search.toLowerCase());
            }),
        [list, search]
    );


    return (

        <div className={classes.root}>
            <TextField label="Type something" value={search} onChange={e => { setSearch(e.target.value) }}></TextField>
            <ul>
                {filteredUsers.map((item) => (
                    <li key={item.id}>
                        <Chip label={item.name + " " + item.count} variant="outlined" />
                    </li>
                ))}
            </ul>
            <Button variant="contained" onClick={addToList}>Add Element</Button>
        </div>
    );
}

export default Test;