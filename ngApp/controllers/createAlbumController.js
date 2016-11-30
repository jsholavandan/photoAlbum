var photoalbum;
(function (photoalbum) {
    var Controllers;
    (function (Controllers) {
        var CreateAlbumController = (function () {
            function CreateAlbumController(photoAlbumService, $rootScope, $state) {
                this.photoAlbumService = photoAlbumService;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.selectedPhotos = [];
                this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
            }
            CreateAlbumController.prototype.addSelectedPhotos = function (id, selected) {
                if (selected) {
                    if (this.selectedPhotos.indexOf(id) === -1) {
                        this.selectedPhotos.push(id);
                    }
                }
                else {
                    var idx = this.selectedPhotos.indexOf(id);
                    if (idx > -1) {
                        this.selectedPhotos.splice(idx, 1);
                    }
                }
            };
            CreateAlbumController.prototype.createAlbum = function () {
                var _this = this;
                this.album.username = this.$rootScope.username;
                this.album.albumCover = "ngApp/images/album.jpg";
                console.log(this.album);
                this.photoAlbumService.saveAlbum(this.album).then(function (newAlbum) {
                    console.log("inside save album");
                    for (var i = 0; i < _this.selectedPhotos.length; i++) {
                        for (var j = 0; j < _this.photos.length; j++) {
                            if (_this.photos[j]._id === _this.selectedPhotos[i]) {
                                newAlbum.photos.push(_this.photos[j]);
                            }
                        }
                    }
                    console.log(newAlbum);
                    _this.photoAlbumService.saveAlbum(newAlbum).then(function (updatedAlbum) {
                        console.log("album created");
                        _this.selectedPhotos = [];
                        _this.$state.go('albums');
                    });
                });
            };
            return CreateAlbumController;
        }());
        Controllers.CreateAlbumController = CreateAlbumController;
        angular.module("photoalbum").controller("CreateAlbumController", CreateAlbumController);
    })(Controllers = photoalbum.Controllers || (photoalbum.Controllers = {}));
})(photoalbum || (photoalbum = {}));
