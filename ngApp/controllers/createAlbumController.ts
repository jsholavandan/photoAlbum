namespace photoalbum.Controllers {
  export class CreateAlbumController{
    public photos;
    public album;
    public selectedPhotos = [];

    public addSelectedPhotos(id, selected){
      if(selected){
        if(this.selectedPhotos.indexOf(id) === -1){
          this.selectedPhotos.push(id);
        }
      }else{
        let idx = this.selectedPhotos.indexOf(id);
        if(idx > -1){
          this.selectedPhotos.splice(idx, 1);
        }
      }
    }

    public createAlbum(){
      this.album.username = this.$rootScope.username;
      this.album.albumCover = "ngApp/images/album.jpg";
      console.log(this.album);
      this.photoAlbumService.saveAlbum(this.album).then((newAlbum) => {
        console.log("inside save album");
        for(let i=0;i<this.selectedPhotos.length;i++){
          for(let j=0;j<this.photos.length;j++){
            if(this.photos[j]._id === this.selectedPhotos[i]){
              newAlbum.photos.push(this.photos[j]);
            }
          }
        }
        console.log(newAlbum);
        this.photoAlbumService.saveAlbum(newAlbum).then((updatedAlbum) =>{
          console.log("album created");
          this.selectedPhotos = [];
          this.$state.go('albums');
        });
      });
    }

    constructor(private photoAlbumService:photoalbum.Services.PhotoAlbumService,
                private $rootScope:ng.IRootScopeService,
                private $state:ng.ui.IStateService){
      this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
    }

  }

  angular.module("photoalbum").controller("CreateAlbumController", CreateAlbumController);

}
