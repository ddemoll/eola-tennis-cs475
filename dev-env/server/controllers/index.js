var express = require('express');
var app = express.Router();

app.use('/announcements', require('./AnnouncementsController'));
app.use('/featured', require('./FeaturedController'));
app.use('/events', require('./EventsController'));
app.use('/contacts', require('./ContactsController'));
app.use('/rankings', require('./RankingsController'));
app.use('/store', require('./StoreController'));
app.use('/classes', require('./ClassesController'));

module.exports = app
