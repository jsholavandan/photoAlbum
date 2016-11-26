namespace photoalbum.Services {

    export class AccountService {
      private LoginResource;
      private RegisterResource;

      public login(userInfo){
      //  console.log(userInfo);
        return this.LoginResource.save(userInfo).$promise;
      }

      public signUp(user){
        console.log("here");
        console.log(user);
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

      //Photo service
      public listPhotos(username){
        return this.PhotoResource.query({username:username});
      }

      public getPhoto(id){
        return this.PhotoResource.get({id:id});
      }

      public savePhoto(photoObj){
        //console.log(photoObj);
        return this.PhotoResource.save({id:photoObj._id}, photoObj).$promise;
      }

      public removePhoto(photoId){
        return this.PhotoResource.remove({id:photoId}).$promise;
      }

      //Album service
      public listAlbums(username){
        return this.AlbumResource.query({username:username});
      }

      public getAlbum(id){
        return this.AlbumResource.get({id:id});
      }

      public saveAlbum(albumObj){
        return this.AlbumResource.save({id:albumObj._id}, albumObj).$promise;
      }

      public removeAlbum(albumId){
        return this.AlbumResource.remove({id:albumId}).$promise;
      }


      constructor(private $resource: ng.resource.IResourceService){
        this.PhotoResource = $resource('/api/photos/:id');
        this.AlbumResource = $resource('/api/albums/:id');
      }
    }
    angular.module('photoalbum').service("photoAlbumService", PhotoAlbumService);
}
