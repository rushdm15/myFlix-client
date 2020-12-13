import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        props.onLoggedIn(username);
    };
    // registration-view.jsx
    axios.post(
        'https://flexnet91.herokuapp.com/users/:Username', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    },
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
            console.log('error updating the user')
        });

    axios.delete(
        'https://flexnet91.herokuapp.com/users/:Username', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    },
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
            console.log('error deleting the user')
        });
    // Deletes a movie from list of user's favorite movies
    app.delete("/users/:Username/movies/:_id",
        passport.authenticate("jwt", {
            session: false,
        }),
        (req, res) => {
            Users.findOneAndUpdate(
                {
                    Username: req.params.Username,
                },
                {
                    $pull: {
                        FavoriteMovies: req.params._id,
                    },
                },
                {
                    new: true,
                },
                // This line makes sure that the updated document is returned
                function (err, updatedUser) {
                    if (err) {
                        console.error(err);
                        res.status(500).send("Error: " + err);
                    } else {
                        res.json(updatedUser);
                    }
                }
            );
        }
    );
}