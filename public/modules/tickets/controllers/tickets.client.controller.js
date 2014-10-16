'use strict';

// Tickets controller
angular.module('tickets').controller('TicketsController', ['$scope',  '$stateParams', '$location', 'Authentication', 'TicketsByCategory','Tickets', 'Ticketcategories',
    function($scope, $stateParams, $location, Authentication, TicketsByCategory, Tickets, Ticketcategories) {
        $scope.authentication = Authentication;
        $scope.ticketcategories = Ticketcategories.query();
        console.log($scope.ticketcategories);
        // Create new Ticket
        $scope.create = function() {
            // Create new Ticket object
            var ticket = new TicketsByCategory({
                name: this.name,
                description: this.description,
                due: this.due
            });

            // Redirect after save
            ticket.$save({ticketCategoryId:$scope.ticketcategory}, function(response) {
                $location.path('tickets/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        // Remove existing Ticket
        $scope.remove = function(ticket) {
            if (ticket) {
                ticket.$remove();

                for (var i in $scope.tickets) {
                    if ($scope.tickets[i] === ticket) {
                        $scope.tickets.splice(i, 1);
                    }
                }
            } else {
                $scope.ticket.$remove(function() {
                    $location.path('tickets');
                });
            }
        };

        // Update existing Ticket
        $scope.update = function() {
            var ticket = $scope.ticket;

            ticket.$update(function() {
                $location.path('tickets/' + ticket._id);
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
                console.log($scope.recentTickets);
            });
        };


        // Find existing Ticket
        $scope.findOne = function() {
            $scope.ticket = Tickets.get({
                ticketId: $stateParams.ticketId
            });
            console.log($scope.ticket);
        };




        /**********************************************************/
        /*						DATE PICKER STUFF				  */
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
