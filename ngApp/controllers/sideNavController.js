var photoalbum;
(function (photoalbum) {
    var Controllers;
    (function (Controllers) {
        var SidenavController = (function () {
            function SidenavController(filepickerService, photoAlbumService, $rootScope, $state, $scope) {
                this.filepickerService = filepickerService;
                this.photoAlbumService = photoAlbumService;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$scope = $scope;
            }
            SidenavController.prototype.photos = function () {
                this.$state.go('photos');
            };
            SidenavController.prototype.albums = function () {
                this.$state.go('albums');
            };
            SidenavController.prototype.pickFile = function () {
                this.filepickerService.pick({ mimetype: 'image/*' }, this.fileUploaded.bind(this));
            };
            SidenavController.prototype.fileUploaded = function (file) {
                var _this = this;
                var photoObj = {
                    username: this.$rootScope.username,
                    fileName: file.filename,
                    fileUrl: file.url
                };
                this.photoAlbumService.savePhoto(photoObj).then(function (data) {
                    console.log("photo saved");
                    _this.$scope.$broadcast("NewPhoto");
                    _this.$state.go('photos');
                }).catch(function (err) {
                    console.log(err);
                });
            };
            return SidenavController;
        }());
        Controllers.SidenavController = SidenavController;
        angular.module('photoalbum').controller("SidenavController", SidenavController);
    })(Controllers = photoalbum.Controllers || (photoalbum.Controllers = {}));
})(photoalbum || (photoalbum = {}));
