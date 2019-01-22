const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const body_parser = require('body-parser');
const { User, Coffee } = require('./db/mongodb');



const app = express();
app.use(body_parser.json());

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
    res.sendFile(`\index.html`)
});

app.get('/get', (req, res) => {
    Coffee.find({ name: 'nsn' }, function (err, docs) {
        if (!err) {
            console.log(docs);
            process.exit();
        } else { throw err; }
    });
    res.send('sent');

})

app.post('/pay', (req, res) => {


    User.find({ name: req.body.userName }).then((doc) => {
        if (doc.length >0) {
            console.log('User existed');

        } else {

            var user = new User({
                name: req.body.userName,
                email: req.body.userEmail,
                mobile: req.body.userMobile,
                timestamp: req.body.timeStamp
            });

            user.save().then((doc) => {
                console.log('User saved sucessfully', doc);

            });
        }
    });

    var coffee = new Coffee({
        name: req.body.userName,
        items: req.body.items,
        timestamp: req.body.timeStamp
    })

    coffee.save().then((doc) => {
        console.log('coffee saved sucessfully', doc);

    })


    res.send('got it')
})
app.listen(3000, () => {
    console.log('on 3000');

})