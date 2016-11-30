var photoalbum;
(function (photoalbum) {
    var Services;
    (function (Services) {
        var AccountService = (function () {
            function AccountService($resource) {
                this.LoginResource = $resource('/routes/users/login');
                this.RegisterResource = $resource('/routes/register/register');
            }
            AccountService.prototype.login = function (userInfo) {
                return this.LoginResource.save(userInfo).$promise;
            };
            AccountService.prototype.signUp = function (user) {
                console.log("here");
                console.log(user);
                return this.RegisterResource.save(user).$promise;
            };
            return AccountService;
        }());
        Services.AccountService = AccountService;
        angular.module('photoalbum').service('accountService', AccountService);
        var PhotoAlbumService = (function () {
            function PhotoAlbumService($resource) {
                this.$resource = $resource;
                this.PhotoResource = $resource('/api/photos/:id');
                this.AlbumResource = $resource('/api/albums/:id');
            }
            PhotoAlbumService.prototype.listPhotos = function (username) {
                return this.PhotoResource.query({ username: username });
            };
            PhotoAlbumService.prototype.getPhoto = function (id) {
                return this.PhotoResource.get({ id: id });
            };
            PhotoAlbumService.prototype.savePhoto = function (photoObj) {
                return this.PhotoResource.save({ id: photoObj._id }, photoObj).$promise;
            };
            PhotoAlbumService.prototype.removePhoto = function (photoId) {
                return this.PhotoResource.remove({ id: photoId }).$promise;
            };
            PhotoAlbumService.prototype.listAlbums = function (username) {
                return this.AlbumResource.query({ username: username });
            };
            PhotoAlbumService.prototype.getAlbum = function (id) {
                console.log("from services " + id);
                return this.AlbumResource.get({ id: id });
            };
            PhotoAlbumService.prototype.saveAlbum = function (albumObj) {
                return this.AlbumResource.save({ id: albumObj._id }, albumObj).$promise;
            };
            PhotoAlbumService.prototype.removeAlbum = function (albumId) {
                return this.AlbumResource.remove({ id: albumId }).$promise;
            };
            return PhotoAlbumService;
        }());
        Services.PhotoAlbumService = PhotoAlbumService;
        angular.module('photoalbum').service("photoAlbumService", PhotoAlbumService);
    })(Services = photoalbum.Services || (photoalbum.Services = {}));
})(photoalbum || (photoalbum = {}));
