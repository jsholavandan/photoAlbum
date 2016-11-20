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

    export class AccountController{
      public userCredentials = {};
      public user = {};
      public errorMsg;

      public setToken(data){
        this.$window.localStorage.setItem('token', JSON.stringify(data.token));
      }

      public getToken(){
        return this.$window.localStorage.getItem('token');
      }

      public isLoggedIn(){
        let token = this.getToken();
        if(token){
          let payLoad = JSON.parse(this.$window.atob(token.split('.')[1]));
          return payLoad;
        }else{
          return false;
        }
      }

      public loginUser(){
        this.errorMsg = "";
        this.accountService.login(this.userCredentials).then((res) => {
          this.setToken(res);
          this.$rootScope.currentUser = this.isLoggedIn();
          this.$rootScope.username = this.userCredentials.username;
          this.$state.go('main');
        }).catch((err) => {
            this.errorMsg = "Invalid User Name or Password.";
        });
      }

      public register(){
      //  console.log(this.user);
        this.accountService.signUp(this.user).then((data) => {
          //console.log(data);
          this.$state.go('login');
        })
      }

      constructor(
        private accountService:photoalbum.Services.AccountService,
        private $window:ng.IWindowService,
        private $state:ng.ui.IStateService,
        private $rootScope:ng.IRootScopeService
      ){

      }
    }

    export class PhotosController{
      public photos;
      public panel;

      public startSlideShow(){
          let position = this.$mdPanel.newPanelPosition()
                          .absolute()
                          .center()
          let config = {
            attachTo: angular.element(document.body),
            controller: PanelDialogCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'ngApp/views/panel.tmpl.html',
            hasBackdrop: true,
            panelClass: 'demo-dialog-example',
            position: position,
            trapFocus: true,
            zIndex: 150,
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: true
          };

          this.$mdPanel.open(config);
        }

        public menuOptions(){
          return [
            ['Edit', function($itemScope, $event, modelValue, text, $li){

            }],
            null,
            ['Delete', ($itemScope, $event, modelValue, text, $li) => {
              let photoId = $itemScope.photo._id;
              let photoUrl = $itemScope.photo.fileUrl;
              console.log(photoId);
              this.photoAlbumService.removePhoto(photoId).then((res) => {
                this.filepickerService.remove(photoUrl, () => {
                  console.log("photo removed");                  
                });
              });
            }],
            null,
            ['Add to album', function($itemScope, $event, modelValue, text, $li){

            }]
          ];
        }


      constructor(private photoAlbumService: photoalbum.Services.PhotoAlbumService,
                  private $rootScope: ng.IRootScopeService,
                  private $scope:ng.IScope,
                  private $mdPanel,
                  private filepickerService,
                  private $state:ng.ui.IStateService){
          this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
          //console.log(this.photos);
      }
    }

    angular.module("photoalbum").controller("PhotosController", PhotosController);

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


    export class SidenavController{

      public photos(){
        this.$state.go('photos');
      //  this.$scope.$apply();
      }

      public pickFile(){
        this.filepickerService.pick(
          { mimetype: 'image/*'},
          this.fileUploaded.bind(this)
        );
      }

      public fileUploaded(file){
        let photoObj = {
          username: this.$rootScope.username,
          fileName : file.filename,
          fileUrl: file.url
        }

      //  console.log(phtotoObj);

        this.photoAlbumService.savePhoto(photoObj).then((data) => {
           console.log("photo saved");
        }).catch((err) => {
          console.log(err);
        });


      }

      constructor(private filepickerService,
                  private photoAlbumService: photoalbum.Services.PhotoAlbumService,
                  private $rootScope:ng.IRootScopeService,
                  private $state: ng.ui.IStateService,
                  private $scope:ng.IScope){

      }
    }

    angular.module('photoalbum').controller("SidenavController", SidenavController);

}
