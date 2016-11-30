var photoalbum;
(function (photoalbum) {
    var Controllers;
    (function (Controllers) {
        var MainController = (function () {
            function MainController() {
            }
            return MainController;
        }());
        Controllers.MainController = MainController;
        var HomeController = (function () {
            function HomeController($state, $rootScope, $window, $mdSidenav) {
                this.$state = $state;
                this.$rootScope = $rootScope;
                this.$window = $window;
                this.$mdSidenav = $mdSidenav;
                this.$rootScope.currentUser = false;
            }
            HomeController.prototype.login = function () {
                this.$state.go('login');
            };
            HomeController.prototype.toggleMenu = function (id) {
                this.$mdSidenav(id).toggle();
            };
            HomeController.prototype.register = function () {
                this.$state.go('register');
            };
            HomeController.prototype.home = function () {
                this.$state.go('home');
            };
            HomeController.prototype.logout = function () {
                this.$rootScope.currentUser = false;
                this.$rootScope.username = null;
                this.$window.localStorage.removeItem('token');
                console.log('over');
                this.$state.go('home');
            };
            return HomeController;
        }());
        Controllers.HomeController = HomeController;
        angular.module("photoalbum").controller('HomeController', HomeController);
        var PanelDialogCtrl = (function () {
            function PanelDialogCtrl(mdPanelRef) {
                this.mdPanelRef = mdPanelRef;
            }
            PanelDialogCtrl.prototype.closeDialog = function () {
                var _this = this;
                this.mdPanelRef && this.mdPanelRef.close().then(function () {
                    angular.element(document.querySelector('.demo-dialog-open-button')).focus();
                    _this.mdPanelRef.destroy();
                });
            };
            return PanelDialogCtrl;
        }());
        Controllers.PanelDialogCtrl = PanelDialogCtrl;
        angular.module("photoalbum").controller("PanelDialogCtrl", PanelDialogCtrl);
        var DialogController = (function () {
            function DialogController(photoId, $mdDialog, photoAlbumService) {
                this.photoId = photoId;
                this.$mdDialog = $mdDialog;
                this.photoAlbumService = photoAlbumService;
                this.photo = this.photoAlbumService.getPhoto(this.photoId);
            }
            DialogController.prototype.dialogClose = function () {
                this.$mdDialog.hide();
            };
            DialogController.prototype.dialogCancel = function () {
                this.$mdDialog.cancel();
            };
            DialogController.prototype.savePhoto = function () {
                console.log(this.photo.caption);
                this.photoAlbumService.savePhoto(this.photo).then(function () {
                    console.log("photo edited");
                });
                this.$mdDialog.hide();
            };
            return DialogController;
        }());
        Controllers.DialogController = DialogController;
        angular.module("photoalbum").controller("DialogController", DialogController);
    })(Controllers = photoalbum.Controllers || (photoalbum.Controllers = {}));
})(photoalbum || (photoalbum = {}));
