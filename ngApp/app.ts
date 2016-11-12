namespace photoalbum {

    angular.module('photoalbum', ['ui.router', 'ngResource', 'ui.bootstrap', 'ngMaterial']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider,
        $mdThemingProvider: ng.material.IThemingProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',                
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: photoalbum.Controllers.AccountController,
                controllerAs: 'controller'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: photoalbum.Controllers.AccountController,
                controllerAs: 'controller'
            })
            .state('main', {
              url: '/main',
              templateUrl: '/ngApp/views/main.html',
              controller: photoalbum.Controllers.MainController,
              controllerAs: 'controller'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/home');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);

        //config theming
        $mdThemingProvider.theme('default')
          .primaryPalette('grey',{
            default: '800'
          })
          .accentPalette('yellow');
    });



}
