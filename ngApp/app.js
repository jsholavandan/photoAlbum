var photoalbum;
(function (photoalbum) {
    angular.module('photoalbum', ['ngFlash', 'ngPassword', 'ngAnimate', 'ui.router', 'ngResource', 'ui.bootstrap', 'ngMaterial', 'ngMessages', 'angular-filepicker', 'ui.bootstrap.contextMenu']).config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, filepickerProvider) {
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
        })
            .state('photos', {
            url: '/photos',
            templateUrl: 'ngApp/views/photos.html',
            controller: photoalbum.Controllers.PhotosController,
            controllerAs: 'controller'
        })
            .state('albums', {
            url: '/albums',
            templateUrl: 'ngApp/views/albums.html',
            controller: photoalbum.Controllers.AlbumsController,
            controllerAs: 'controller'
        })
            .state("createAlbum", {
            url: "/createAlbum",
            templateUrl: "ngApp/views/createAlbum.html",
            controller: photoalbum.Controllers.CreateAlbumController,
            controllerAs: 'controller'
        })
            .state("album", {
            url: "/album/:id",
            templateUrl: 'ngApp/views/album.html',
            controller: photoalbum.Controllers.AlbumController,
            controllerAs: 'controller'
        });
        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode(true);
        $mdThemingProvider.theme('default')
            .primaryPalette('grey', {
            default: '800'
        })
            .accentPalette('yellow');
        filepickerProvider.setKey("Ad3JX9jbjQWKbZ0zA2PNvz");
    });
})(photoalbum || (photoalbum = {}));
