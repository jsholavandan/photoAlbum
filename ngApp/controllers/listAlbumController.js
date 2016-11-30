var photoalbum;
(function (photoalbum) {
    var Controllers;
    (function (Controllers) {
        var ListAlbumsController = (function () {
            function ListAlbumsController(photoIdArr, photoAlbumService, $rootScope, $mdDialog) {
                this.photoIdArr = photoIdArr;
                this.photoAlbumService = photoAlbumService;
                this.$rootScope = $rootScope;
                this.$mdDialog = $mdDialog;
                this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
                this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
            }
            ListAlbumsController.prototype.pickTheAlbum = function (id) {
                this.selectedAlbum = id;
            };
            ListAlbumsController.prototype.checkIfPhotoExists = function (album, photoId) {
                for (var i = 0; i < album.photos.length; i++) {
                    if (album.photos[i]._id === photoId) {
                        return true;
                    }
                }
                return false;
            };
            ListAlbumsController.prototype.updateAlbum = function () {
                var _this = this;
                this.photoAlbumService.getAlbum(this.selectedAlbum).$promise.then(function (album) {
                    for (var i = 0; i < _this.photoIdArr.length; i++) {
                        var photoExists = _this.checkIfPhotoExists(album, _this.photoIdArr[i]);
                        if (!photoExists) {
                            for (var j = 0; j < _this.photos.length; j++) {
                                if (_this.photos[j]._id === _this.photoIdArr[i]) {
                                    album.photos.push(_this.photos[j]);
                                }
                            }
                        }
                    }
                    _this.photoAlbumService.saveAlbum(album).then(function () {
                        console.log("photos added to album");
                        _this.$mdDialog.hide();
                    });
                }).catch(function (err) {
                    console.log("error occured");
                    console.log(err);
                });
                this.$mdDialog.hide();
            };
            ListAlbumsController.prototype.dialogClose = function () {
                this.$mdDialog.hide();
            };
            ListAlbumsController.prototype.dialogCancel = function () {
                this.$mdDialog.cancel();
            };
            return ListAlbumsController;
        }());
        Controllers.ListAlbumsController = ListAlbumsController;
        angular.module("photoalbum").controller("ListAlbumsController", ListAlbumsController);
    })(Controllers = photoalbum.Controllers || (photoalbum.Controllers = {}));
})(photoalbum || (photoalbum = {}));
