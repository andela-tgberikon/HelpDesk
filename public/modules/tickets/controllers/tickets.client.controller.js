'use strict';

// Tickets controller
<<<<<<< HEAD
angular.module('tickets').controller('TicketsController', ['$scope',  '$stateParams', '$location', 'Authentication', 'TicketsByCategory','Tickets', 'Ticketcategories',
    function($scope, $stateParams, $location, Authentication, TicketsByCategory, Tickets, Ticketcategories) {
        $scope.authentication = Authentication;
        $scope.ticketcategories = Ticketcategories.query();
        console.log($scope.ticketcategories);
=======
angular.module('tickets').controller('TicketsController', ['$scope', '$stateParams', '$location', 'Authentication', 'TicketsByCategory', 'Tickets', 'Ticketcategories', 'Ticketcomments',
    function($scope, $stateParams, $location, Authentication, TicketsByCategory, Tickets, Ticketcategories, Ticketcomments) {
        $scope.authentication = Authentication;
        $scope.ticketcategories = Ticketcategories.query();

>>>>>>> devMean
        // Create new Ticket
        $scope.create = function() {
            // Create new Ticket object
            var ticket = new TicketsByCategory({
                name: this.name,
                description: this.description,
                due: this.due
            });
<<<<<<< HEAD

            // Redirect after save
            ticket.$save({ticketCategoryId:$scope.ticketcategory}, function(response) {
                $location.path('tickets/' + response._id);

=======
            // Redirect after save
            ticket.$save({
                ticketCategoryId: $scope.ticketcategory
            }, function(response) {
                $location.path('tickets/' + response._id);
>>>>>>> devMean
                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
<<<<<<< HEAD
        // Remove existing Ticket
        $scope.remove = function(ticket) {
            if (ticket) {
                ticket.$remove();

=======

        // Post comment on Ticket
        $scope.postComment = function (){
            // Create new Comment Object
            var comment = new Ticketcomments({
                comment: this.ticketcomment
            });
            comment.$save({ticketId: $stateParams.ticketId}, function(resp){
                $scope.comments.push(resp);
            });
            $scope.ticketcomment = '';
        };


        // Remove existing Ticket
        $scope.remove = function(ticket) {
            if (ticket) {
                ticket.$remove({
                    ticketId:ticket.data._id
                });
>>>>>>> devMean
                for (var i in $scope.tickets) {
                    if ($scope.tickets[i] === ticket) {
                        $scope.tickets.splice(i, 1);
                    }
                }
            } else {
                $scope.ticket.$remove(function() {
<<<<<<< HEAD
                    $location.path('tickets');
=======
                    $location.path('tickets/' );
>>>>>>> devMean
                });
            }
        };

        // Update existing Ticket
        $scope.update = function() {
            var ticket = $scope.ticket;
<<<<<<< HEAD

            ticket.$update(function() {
                $location.path('tickets/' + ticket._id);
=======
            ticket.$update(function() {
                $location.path('tickets/' + ticket.data._id);
>>>>>>> devMean
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Tickets
        $scope.find = function() {
            Tickets.query({}, function(response) {
                $scope.tickets = response[0].data;
                $scope.recentTickets = [];
                for (var i = 0; i < 5; i++) {
                    $scope.recentTickets.push(response[0].data[i]);
                }
<<<<<<< HEAD
                console.log($scope.recentTickets);
=======
>>>>>>> devMean
            });
        };


        // Find existing Ticket
        $scope.findOne = function() {
            $scope.ticket = Tickets.get({
                ticketId: $stateParams.ticketId
            });
<<<<<<< HEAD
            console.log($scope.ticket);
=======
            $scope.comments = Ticketcomments.query({
                ticketId: $stateParams.ticketId
            });
>>>>>>> devMean
        };




        /**********************************************************/
<<<<<<< HEAD
        /*						DATE PICKER STUFF				  */
=======
        /*                      DATE PICKER STUFF                 */
>>>>>>> devMean
        /**********************************************************/

        $scope.today = function() {
            $scope.due = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.due = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'longDate'];
        $scope.format = $scope.formats[0];
    }
]);
