namespace photoalbum.Controllers {


    export class ListAlbumsController{
      public albums;
      public selectedAlbum;
      public photo;


      public pickTheAlbum(id){
        this.selectedAlbum = id;
      }

      public checkIfPhotoExists(album){
        for(let i=0;i<album.photos.length;i++){
          if(album.photos[i]._id === this.photo._id){
            return true;
          }
        }
        return false;
      }


      public updateAlbum(){
        this.photoAlbumService.getAlbum(this.selectedAlbum).$promise.then((album) =>{
          let photoExists = this.checkIfPhotoExists(album);
          console.log(photoExists);
          if(!photoExists){
            album.photos.push(this.photo);
            this.photoAlbumService.saveAlbum(album).then(() => {
                console.log("photo added to album");
                this.$mdDialog.hide();
            });
          }
        });

        this.$mdDialog.hide();
      }

      public dialogClose(){
        this.$mdDialog.hide();
      }

      public dialogCancel(){
        this.$mdDialog.cancel();
      }

      constructor(private photoId,
                  private photoAlbumService: photoalbum.Services.PhotoAlbumService,
                  private $rootScope:ng.IRootScopeService,
                  private $mdDialog: angular.material.IDialogService){
        this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
        this.photo = this.photoAlbumService.getPhoto(this.photoId);
      }
    }

    angular.module("photoalbum").controller("ListAlbumsController", ListAlbumsController);
}
