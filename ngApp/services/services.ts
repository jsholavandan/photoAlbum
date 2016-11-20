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

    export class PhotoAlbumService{
      private PhotoResource;
      private AlbumResource;

      public listPhotos(username){
        return this.PhotoResource.query({username:username});
      }

      public savePhoto(photoObj){
        //console.log(photoObj);
        return this.PhotoResource.save(photoObj).$promise;
      }

      public removePhoto(photoId){
        return this.PhotoResource.remove({id:photoId}).$promise;
      }


      constructor(private $resource: ng.resource.IResourceService){
        this.PhotoResource = $resource('/api/photos/:id');
        this.AlbumResource = $resource('/api/albums');
      }
    }
    angular.module('photoalbum').service("photoAlbumService", PhotoAlbumService);
}
