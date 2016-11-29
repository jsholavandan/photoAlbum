namespace photoalbum.Controllers {


    export class ListAlbumsController{
      public albums;
      public selectedAlbum;
      public photos;


      public pickTheAlbum(id){
        this.selectedAlbum = id;
      }

      public checkIfPhotoExists(album, photoId){
        for(let i=0;i<album.photos.length;i++){
          if(album.photos[i]._id === photoId){
            return true;
          }
        }
        return false;
      }


      public updateAlbum(){
        this.photoAlbumService.getAlbum(this.selectedAlbum).$promise.then((album) =>{
          for(let i=0;i<this.photoIdArr.length;i++){
            let photoExists = this.checkIfPhotoExists(album, this.photoIdArr[i]);
            if(!photoExists){
              for(let j=0;j<this.photos.length;j++){
                if(this.photos[j]._id === this.photoIdArr[i]){
                  album.photos.push(this.photos[j]);                  
                }
              }
            }
          }
          this.photoAlbumService.saveAlbum(album).then(() => {
              console.log("photos added to album");
              this.$mdDialog.hide();
          });

        }).catch((err) => {
          console.log("error occured");
          console.log(err);
        });

        this.$mdDialog.hide();
      }

      public dialogClose(){
        this.$mdDialog.hide();
      }

      public dialogCancel(){
        this.$mdDialog.cancel();
      }

      constructor(private photoIdArr,
                  private photoAlbumService: photoalbum.Services.PhotoAlbumService,
                  private $rootScope:ng.IRootScopeService,
                  private $mdDialog: angular.material.IDialogService){
        this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
        this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
      }
    }

    angular.module("photoalbum").controller("ListAlbumsController", ListAlbumsController);
}
