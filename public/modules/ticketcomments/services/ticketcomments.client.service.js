'use strict';

//Ticketcomments service used to communicate Ticketcomments REST endpoints
angular.module('ticketcomments').factory('Ticketcomments', ['$resource',
	function($resource) {
		return $resource('ticketcomments/:ticketcommentId', { ticketcommentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);