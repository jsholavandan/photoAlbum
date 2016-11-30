var photoalbum;
(function (photoalbum) {
    var Controllers;
    (function (Controllers) {
        var AccountController = (function () {
            function AccountController(accountService, $window, $state, $rootScope, Flash) {
                this.accountService = accountService;
                this.$window = $window;
                this.$state = $state;
                this.$rootScope = $rootScope;
                this.Flash = Flash;
                this.userCredentials = {};
                this.user = {};
                this.alert = {};
            }
            AccountController.prototype.setToken = function (data) {
                this.$window.localStorage.setItem('token', JSON.stringify(data.token));
            };
            AccountController.prototype.getToken = function () {
                return this.$window.localStorage.getItem('token');
            };
            AccountController.prototype.isLoggedIn = function () {
                var token = this.getToken();
                if (token) {
                    var payLoad = JSON.parse(this.$window.atob(token.split('.')[1]));
                    return payLoad;
                }
                else {
                    return false;
                }
            };
            AccountController.prototype.loginUser = function () {
                var _this = this;
                this.errorMsg = "";
                this.accountService.login(this.userCredentials).then(function (res) {
                    _this.setToken(res);
                    _this.$rootScope.currentUser = _this.isLoggedIn();
                    _this.$rootScope.username = _this.userCredentials.username;
                    _this.$state.go('main');
                }).catch(function (err) {
                    _this.errorMsg = "Invalid User Name or Password.";
                });
            };
            AccountController.prototype.register = function () {
                var _this = this;
                this.errorMsg = "";
                this.accountService.signUp(this.user).then(function (data) {
                    console.log(data);
                    _this.$state.go('login');
                }).catch(function (err) {
                    _this.Flash.create('danger', "Error occured. Please try again.");
                });
            };
            AccountController.prototype.closeAlert = function () {
                this.alert = {};
            };
            return AccountController;
        }());
        Controllers.AccountController = AccountController;
    })(Controllers = photoalbum.Controllers || (photoalbum.Controllers = {}));
})(photoalbum || (photoalbum = {}));
