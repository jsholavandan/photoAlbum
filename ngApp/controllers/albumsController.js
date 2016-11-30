var photoalbum;
(function (photoalbum) {
    var Controllers;
    (function (Controllers) {
        var AlbumsController = (function () {
            function AlbumsController(photoAlbumService, $rootScope, $state, $window) {
                this.photoAlbumService = photoAlbumService;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$window = $window;
                this.selectedAlbums = [];
                this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
            }
            AlbumsController.prototype.createAlbum = function () {
                this.$state.go('createAlbum');
            };
            AlbumsController.prototype.addSelectedAlbums = function (id, selected) {
                if (selected) {
                    if (this.selectedAlbums.indexOf(id) === -1) {
                        this.selectedAlbums.push(id);
                    }
                }
                else {
                    var idx = this.selectedAlbums.indexOf(id);
                    if (idx > -1) {
                        this.selectedAlbums.splice(idx, 1);
                    }
                }
            };
            AlbumsController.prototype.deleteAlbum = function () {
                if (this.selectedAlbums.length > 0) {
                    for (var i = 0; i < this.selectedAlbums.length; i++) {
                        this.photoAlbumService.removeAlbum(this.selectedAlbums[i]).then(function () {
                        }).catch(function (err) {
                            console.log(err);
                        });
                    }
                    this.$window.alert("Album removed.");
                    this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
                }
                else {
                    this.$window.alert("please choose an album to delete");
                }
            };
            return AlbumsController;
        }());
        Controllers.AlbumsController = AlbumsController;
        angular.module('photoalbum').controller('AlbumsController', AlbumsController);
    })(Controllers = photoalbum.Controllers || (photoalbum.Controllers = {}));
})(photoalbum || (photoalbum = {}));
