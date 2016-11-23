namespace photoalbum.Controllers {

    export class MainController{


      constructor(){

      }
    }


    export class HomeController {
      public login(){
        this.$state.go('login');
      }

      public toggleMenu(id){
        this.$mdSidenav(id).toggle();
      }

      public register(){
        this.$state.go('register');
      }

      public home(){
        this.$state.go('home');
      }

      public logout(){
        this.$rootScope.currentUser = false;
        this.$rootScope.username = null;
        this.$window.localStorage.removeItem('token');
        console.log('over');
        this.$state.go('home');
      }


      constructor(private $state:ng.ui.IStateService, private $rootScope: ng.IRootScopeService, private $window:ng.IWindowService, private $mdSidenav:angular.material.ISidenavService) {
          this.$rootScope.currentUser = false;
      }

    }

    angular.module("photoalbum").controller('HomeController', HomeController);





    export class PanelDialogCtrl{

      public closeDialog(){
        this.mdPanelRef && this.mdPanelRef.close().then(() => {
          angular.element(document.querySelector('.demo-dialog-open-button')).focus();
          this.mdPanelRef.destroy();
        });
      }
      constructor(private mdPanelRef){

      }
    }

    angular.module("photoalbum").controller("PanelDialogCtrl", PanelDialogCtrl);

    export class DialogController{
      public photo;

      public dialogClose(){
        this.$mdDialog.hide();
      }

      public dialogCancel(){
        this.$mdDialog.cancel();
      }

      public savePhoto(){
        console.log(this.photo.caption);
        this.photoAlbumService.savePhoto(this.photo).then(() =>{
          console.log("photo edited");
        });
        this.$mdDialog.hide();
      }

      constructor(private photoId, private $mdDialog: angular.material.IDialogService, private photoAlbumService: photoalbum.Services.PhotoAlbumService){
        this.photo = this.photoAlbumService.getPhoto(this.photoId);
      }
    }

    angular.module("photoalbum").controller("DialogController", DialogController);
    

}
