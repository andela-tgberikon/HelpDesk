'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var tickets = require('../../app/controllers/tickets');

	// Tickets Routes
	app.route('/tickets')
		.get(tickets.list)
		.post(users.requiresLogin, tickets.create);

	app.route('/tickets/:ticketId')
		.get(tickets.read)
		.put(users.requiresLogin, tickets.hasAuthorization, tickets.update)
		.delete(users.requiresLogin, tickets.hasAuthorization, tickets.delete);

	app.route('/tickets/:ticketId/comment')
		.put(users.requiresLogin, tickets.hasAuthorization, tickets.addComment);

	app.route('/tickets/category/:category')
		.get(tickets.getByCategory);
	// 	.put(users.requiresLogin, tickets.hasAuthorization, tickets.update)
	// 	.delete(users.requiresLogin, tickets.hasAuthorization, tickets.delete);
	// app.route('/tickets/users/:userId')
	// 	.get(tickets.byUserId);
	// app.route('/tickets/:ticketId/comment')
	// 	.post(tickets.ticketComment);

	// Finish by binding the Ticket middleware
	app.param('ticketId', tickets.ticketByID);
};
