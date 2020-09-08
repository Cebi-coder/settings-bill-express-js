const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const billSettings = require('./settings-bill');

const app = express();
const settingsBill = billSettings();

app.engine('handlebars', exphbs({ layoutsDir: 'views/layouts/' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', function (req, res) {

    res.render('index', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        color: settingsBill.totalClassName()

    });
})


app.post('/settings', function (req, res) {
    console.log(req.body);

    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel,

    });


    res.redirect('/');
});

app.post('/action', function (req, res) {

    console.log(req.body.actionType);

    settingsBill.recordAction(req.body.actionType)

    res.redirect('/');
});


app.get('/actions', function (req, res) {

    res.render('actions', { actions: settingsBill.actions() });
});

app.get('/actions/:actionType', function (req, res) {
    const actionType = req.params.actionType;
    res.render('actions', { actions: settingsBill.actionFor(actionType) });

});

const PORT = process.env.PORT || 3011;

app.listen(PORT, function () {
    console.log("App started at port", PORT)

});