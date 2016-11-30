var photoalbum;
(function (photoalbum) {
    var Controllers;
    (function (Controllers) {
        var AlbumController = (function () {
            function AlbumController(photoAlbumService, $rootScope, $stateParams, $mdPanel, $window) {
                this.photoAlbumService = photoAlbumService;
                this.$rootScope = $rootScope;
                this.$stateParams = $stateParams;
                this.$mdPanel = $mdPanel;
                this.$window = $window;
                this.selectedPhotos = [];
                var albumId = this.$stateParams["id"];
                console.log(albumId);
                this.album = this.photoAlbumService.getAlbum(albumId);
            }
            AlbumController.prototype.addSelectedPhotos = function (id, selected) {
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
            AlbumController.prototype.startSlideShow = function () {
                var position = this.$mdPanel.newPanelPosition()
                    .absolute()
                    .center();
                var config = {
                    attachTo: angular.element(document.body),
                    controller: Controllers.PanelDialogCtrl,
                    controllerAs: 'ctrl',
                    templateUrl: 'ngApp/views/panel.tmpl.html',
                    hasBackdrop: true,
                    panelClass: 'demo-dialog-example',
                    position: position,
                    trapFocus: true,
                    zIndex: 150,
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    focusOnOpen: true,
                    locals: { photos: this.album.photos }
                };
                this.$mdPanel.open(config);
            };
            AlbumController.prototype.addCoverToAlbum = function (photoId) {
                if (photoId === null && this.selectedPhotos.length > 0) {
                    photoId = this.selectedPhotos[0];
                }
                if (photoId !== null) {
                    for (var i = 0; i < this.album.photos.length; i++) {
                        if (this.album.photos[i]._id === photoId) {
                            this.album.albumCover = this.album.photos[i].fileUrl;
                        }
                    }
                    this.photoAlbumService.saveAlbum(this.album).then(function () {
                        console.log("new cover added");
                    });
                }
                else {
                    this.$window.alert("Please select a Photo to add as a cover.");
                }
            };
            AlbumController.prototype.menuOptions = function () {
                var _this = this;
                return [
                    ['Delete', function ($itemScope, $event, modelValue, text, $li) {
                            _this.deletePhotos($itemScope.photo._id);
                        }],
                    null,
                    ['Add as Album Cover', function ($itemScope, $event, modelValue, text, $li) {
                            var photoId = $itemScope.photo._id;
                            _this.addCoverToAlbum(photoId);
                        }],
                ];
            };
            AlbumController.prototype.deletePhotos = function (id) {
                var _this = this;
                var photoArray = [];
                if (id !== null) {
                    photoArray.push(id);
                }
                else {
                    photoArray = this.selectedPhotos;
                }
                if (photoArray.length > 0) {
                    for (var i = 0; i < photoArray.length; i++) {
                        for (var j = this.album.photos.length - 1; j >= 0; j--) {
                            if (photoArray[i] === this.album.photos[j]._id) {
                                if (this.album.albumCover === this.album.photos[j].fileUrl) {
                                    this.album.albumCover = "ngApp/images/album.jpg";
                                }
                                this.album.photos.splice(j, 1);
                            }
                        }
                    }
                    this.photoAlbumService.saveAlbum(this.album).then(function () {
                        console.log("Album updated");
                        _this.selectedPhotos = [];
                    });
                }
                else {
                    this.$window.alert("Please select photos to delete.");
                }
            };
            return AlbumController;
        }());
        Controllers.AlbumController = AlbumController;
        angular.module('photoalbum').controller('AlbumController', AlbumController);
    })(Controllers = photoalbum.Controllers || (photoalbum.Controllers = {}));
})(photoalbum || (photoalbum = {}));
