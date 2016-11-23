namespace photoalbum.Controllers {
  export class AccountController{
    public userCredentials = {
      username: 'sai',
      password:'baba'
    };
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
}
