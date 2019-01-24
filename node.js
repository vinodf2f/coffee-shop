const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const body_parser = require('body-parser');
const { User, Coffee } = require('./db/mongodb');
const {mailing} = require("./mailing/nodemailer");



const app = express();
app.use(body_parser.json());

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile(`\index.html`)
});

app.get('/getUsers', (req, res) => {

    let users;
    User.find({}, function (err, docs) {
        if (!err) {

            // console.log(docs);
           users = docs;

        } else { throw err; }
    });
   

    Coffee.find().sort( { 'timestamp': -1 } ).limit(10).then((recent) => {
        // console.log(recent);
        res.send({users,recent});
    }, (err)=> {
        console.log(err)
    })


});

app.post('/pay', (req, res) => {


    let name = req.body.userName;
    let email = req.body.userEmail;
    let mobile = req.body.userMobile;
    let items = req.body.items;
    let timestamp = req.body.timestamp;
    let total = req.body.total;
    console.log(total);
    
    let user;


    User.find({name}).then((doc) => {
        if (doc.length > 0) {
            console.log(typeof(doc));
            
            console.log('User existed');

        } else {

             user = new User({
                name,
                email,
                mobile,
                timestamp
            });

            user.save().then((doc) => {
                console.log('User saved sucessfully', doc);

            });
        }
    });

    var coffee = new Coffee({
        name,
        items,
        total,
        timestamp
    })

    coffee.save().then((doc) => {
        console.log('coffee saved sucessfully', doc);

    });


console.log(`user ......    ${email}`);
   mailing(coffee,email);


    res.send('got it')
});







app.listen(3000, () => {
    console.log('on 3000');

})