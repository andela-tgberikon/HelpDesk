'use strict';

//Ticketcomments service used to communicate Ticketcomments REST endpoints
angular.module('ticketcomments').factory('Ticketcomments', ['$resource',
	function($resource) {
<<<<<<< HEAD
		return $resource('ticketcomments/:ticketcommentId', { ticketcommentId: '@_id'
=======
		return $resource('tickets/:ticketId/comments/:commentId', { commentId: '@_id'
>>>>>>> devMean
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
<<<<<<< HEAD
]);
=======
]);

>>>>>>> devMean
