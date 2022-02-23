const express = require('express');
const path = require('path');
const wmic = require('ms-wmic');

const app = express();

const urlencodedParser = express.urlencoded({extended:false});

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')));

app.post('/',urlencodedParser, (req, res) => {   
    if (!req.body) {
        return res.sendStatus(400);
    } 

    wmic.execute('useraccount where name="' + req.body.text + '"', function(err, stdOut) {
        if (err) {
            console.error(err);
            res.redirect('/no');
        } else {
            console.log(stdOut);
            res.redirect('/yes');
        }
    });
});

app.get('/yes', (req, res) => res.sendFile(path.join(__dirname+'/yes.html')));
app.get('/no', (req, res) => res.sendFile(path.join(__dirname+'/no.html')));
app.post('/no', (req, res) => {    
    res.redirect('/');
});

app.post('/yes', (req, res) => {    
    res.redirect('/');
});

app.listen(3000, () => console.log("Listening on port 3000"));

