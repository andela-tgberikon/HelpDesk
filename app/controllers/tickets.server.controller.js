'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors'),
    Ticket = mongoose.model('Ticket'),
    Ticketcomment = mongoose.model('Ticketcomment'),
    Ticketstatus = mongoose.model('Ticketstatus'),
    Ticketcategory = mongoose.model('Ticketcategory'),
    _ = require('lodash');

/**
 * Create a Ticket
 */
exports.create = function(req, res) {
    var ticket = new Ticket(req.body);
    ticket.user = req.user;

    ticket.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(ticket);
        }
    });
};

/********************************************************/
/*                     Custom Functions                 */
/********************************************************/

// exports.byUserId = function (req, res){
//     console.log(req);
// },

exports.getByUserId = function(req, res) {
    Ticket.where('user').equals(req.profile._id).exec(function(err, tickets) {
        console.log(tickets);
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            var response = [{
                total_number_of_tickets: tickets.length,
                data: tickets
            }];
            res.jsonp(response);
        }

    });
};


exports.addComment = function(req, res) {
    // console.log(req.ticket);
    // console.log(req.body);
    // console.log(req);

    var comment = new Ticketcomment(req.body);

    // console.log(comment);
        comment.user = req.user;
        // comment.ticket = req.ticket;

        req.ticket.ticketcomment.push(comment);
        console.log(comment.content);
        comment.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } 
    });
        req.ticket.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(comment);
        }
    });
};

exports.getByCategory = function(req, res){
    Ticket.find().sort('-category')
        .populate('user', 'displayName')
        .exec(function(err, category){
            console.log(category);
        });
};
/*************************************************************?


/**
 * Show the current Ticket
 */
exports.read = function(req, res) {
    var response = [{
                    number_of_comments: req.ticket.ticketcomment.length,
                    data: req.ticket
                }];
                res.jsonp(response);
    // res.jsonp(req.ticket);
    // console.log(req.ticket.ticketcomment.length);
};


/**
 * Update a Ticket
 */
exports.update = function(req, res) {
    var ticket = req.ticket;

    ticket = _.extend(ticket, req.body);

    ticket.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(ticket);
        }
    });
};

/**
 * Delete an Ticket
 */
exports.delete = function(req, res) {
    var ticket = req.ticket;

    ticket.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(ticket);
        }
    });
};

/**
 * List of Tickets
 */
exports.list = function(req, res) {
    Ticket.find().sort('-created')
        .populate('user', 'displayName')
        .populate('ticketcategory', 'name')
        .exec(function(err, tickets) {
            // console.log(req);
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                var response = [{
                    total_number_of_tickets: tickets.length,
                    data: tickets
                }];
                res.jsonp(response);
            }
        });
    // Ticketstatus.find()
    //     .populate('user')
    //     .exec(function(err, Ticketstatuses){
    //         console.log(Ticketstatuses);
    //     });
};

/**
 * Ticket middleware
 */
exports.ticketByID = function(req, res, next, id) {
    Ticket.findById(id).populate('user', 'displayName')
    .populate('ticketcomment')
    .populate('ticketcategory', 'name')
    .exec(function(err, ticket) {
        if (err) return next(err);
        if (!ticket) return next(new Error('Failed to load Ticket ' + id));
        req.ticket = ticket;
        next();
    });
};

/**
 * Ticket authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.ticket.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};
