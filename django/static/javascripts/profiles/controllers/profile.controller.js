/**
 * ProfileController
 * @namespace thinkster.profiles.controllers
 */
(function () {
    'use strict';

    angular
        .module('thinkster.profiles.controllers')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$location', '$routeParams', 'Posts', 'Profile', 'Snackbar'];

    /**
     * @namespace ProfileController
     */
    function ProfileController($location, $routeParams, Posts, Profile, Snackbar) {
        var vm = this;

        vm.profile = undefined;
        vm.posts = [];

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf thinkster.profiles.controllers.ProfileController
         */
        function activate() {
            var username = $routeParams.username.substr(1);
			var param1 = $routeParams.param1;
            Profile.get(username).then(profileSuccessFn, profileErrorFn);
            Posts.get(username).then(postsSuccessFn, postsErrorFn);

            /**
             * @name profileSuccessProfile
             * @desc Update `profile` on viewmodel
             */
            function profileSuccessFn(data, status, headers, config) {
                vm.profile = data.data;
            }


            /**
             * @name profileErrorFn
             * @desc Redirect to index and show error Snackbar
             */
            function profileErrorFn(data, status, headers, config) {
                $location.url('/');
				Materialize.toast('That user does not exist.', 4000)
            }


            /**
             * @name postsSucessFn
             * @desc Update `posts` on viewmodel
             */
            function postsSuccessFn(data, status, headers, config) {
                vm.posts = data.data;
            }


            /**
             * @name postsErrorFn
             * @desc Show error snackbar
             */
            function postsErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.error);
            }
        }
    }
})();