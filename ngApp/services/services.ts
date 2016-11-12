namespace photoalbum.Services {

    export class AccountService {
      private LoginResource;
      private RegisterResource;

      public login(userInfo){
      //  console.log(userInfo);
        return this.LoginResource.save(userInfo).$promise;
      }

      public signUp(user){
        return this.RegisterResource.save(user).$promise;
      }

      constructor($resource: ng.resource.IResourceService){
        this.LoginResource = $resource('/routes/users/login');
        this.RegisterResource = $resource('/routes/register/register');
      }

    }
    angular.module('photoalbum').service('accountService', AccountService);
    }
