namespace photoalbum.Controllers {

    export class MainController{


      constructor(){

      }
    }


    export class HomeController {
      public login(){
        this.$state.go('login');
      }

      public register(){
        this.$state.go('register');
      }

      public logout(){
        this.$rootScope.currentUser = false;
        this.$window.localStorage.removeItem('token');
        console.log('over');
        this.$state.go('home');
      }


      constructor(private $state:ng.ui.IStateService, private $rootScope: ng.IRootScopeService, private $window:ng.IWindowService) {
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
          this.$state.go('main');
        });
      }

      public register(){
        console.log(this.user);
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

    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
