import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { authToken } from './auth.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (username === "admin" && password === "1234") {
        const token = jwt.sign({
            userId: 1
        }, "secret", {
            expiresIn: "1h"
        });

        return res.status(200).send({
            token: token,
            user: {
                name: "Oğuzhan",
                email: "ogzCode@mail.com"
            }
        });
    }

    res.status(401).send({
        error: "Invalid login!"
    });
});

app.get('/user', authToken, (req, res) => {
    console.log(req.token);
    res.json({
        token: req.token,
        user: {
            name: "Oğuzhan",
            email: "ogzCode@mail.com"
        }
    });
}
);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})