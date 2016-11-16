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
        this.accountService.login(this.userCredentials).then((res) => {
          this.setToken(res);
          this.$rootScope.currentUser = this.isLoggedIn();
          this.$rootScope.username = this.userCredentials.username;
          this.$state.go('main');
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


      constructor(private photoAlbumService: photoalbum.Services.PhotoAlbumService, private $rootScope: ng.IRootScopeService, private $scope:ng.IScope){
          this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
          console.log(this.photos);
      }
    }

    angular.module("photoalbum").controller("PhotosController", PhotosController);

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
