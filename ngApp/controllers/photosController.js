var photoalbum;
(function (photoalbum) {
    var Controllers;
    (function (Controllers) {
        var PhotosController = (function () {
            function PhotosController(photoAlbumService, $rootScope, $scope, $mdPanel, filepickerService, $state, $mdDialog, $window, $element) {
                var _this = this;
                this.photoAlbumService = photoAlbumService;
                this.$rootScope = $rootScope;
                this.$scope = $scope;
                this.$mdPanel = $mdPanel;
                this.filepickerService = filepickerService;
                this.$state = $state;
                this.$mdDialog = $mdDialog;
                this.$window = $window;
                this.$element = $element;
                this.selectedPhotos = [];
                this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
                this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
                this.$scope.$on("NewPhoto", function () {
                    _this.refreshData();
                });
            }
            PhotosController.prototype.addSelectedPhotos = function (id, selected) {
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
            PhotosController.prototype.startSlideShow = function () {
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
                    locals: { photos: this.photos }
                };
                console.log(this.photos);
                this.$mdPanel.open(config);
            };
            PhotosController.prototype.menuOptions = function () {
                var _this = this;
                return [
                    ['Delete', function ($itemScope, $event, modelValue, text, $li) {
                            var photoId = $itemScope.photo._id;
                            var photoUrl = $itemScope.photo.fileUrl;
                            _this.photoAlbumService.removePhoto(photoId).then(function (res) {
                                _this.filepickerService.remove(photoUrl, function () {
                                    _this.$window.alert("photo removed");
                                    _this.photos = _this.photoAlbumService.listPhotos(_this.$rootScope.username);
                                });
                            });
                        }],
                    null,
                    ['Add Caption', function ($itemScope, $event, modelValue, text, $li) {
                            var photoId = $itemScope.photo._id;
                            _this.editPhoto(photoId, $event);
                        }],
                    null,
                    ['Add to album', function ($itemScope, $event, modelValue, text, $li) {
                            var photoId = $itemScope.photo._id;
                            _this.addToAlbum(photoId, $event);
                        }]
                ];
            };
            PhotosController.prototype.addToAlbum = function (photoId, event) {
                var photoIdArr = [];
                if (photoId !== null) {
                    photoIdArr.push(photoId);
                }
                else {
                    photoIdArr = this.selectedPhotos;
                }
                if (photoIdArr.length > 0) {
                    this.$mdDialog.show({
                        locals: { photoIdArr: photoIdArr },
                        controller: Controllers.ListAlbumsController,
                        templateUrl: 'ngApp/views/listAlbumsDialog.html',
                        parent: angular.element(document.body),
                        targetEvent: event,
                        controllerAs: 'controller',
                        clickOutsideToClose: true
                    });
                    this.selectedPhotos = [];
                }
                else {
                    this.$window.alert("Please select photos to add to album.");
                }
            };
            PhotosController.prototype.editPhoto = function (photoId, event) {
                this.$mdDialog.show({
                    locals: { photoId: photoId },
                    controller: Controllers.DialogController,
                    templateUrl: 'ngApp/views/dialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    controllerAs: 'controller',
                    clickOutsideToClose: true
                });
            };
            PhotosController.prototype.refreshData = function () {
                console.log("refresh data");
                this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
            };
            return PhotosController;
        }());
        Controllers.PhotosController = PhotosController;
        angular.module("photoalbum").controller("PhotosController", PhotosController);
    })(Controllers = photoalbum.Controllers || (photoalbum.Controllers = {}));
})(photoalbum || (photoalbum = {}));
