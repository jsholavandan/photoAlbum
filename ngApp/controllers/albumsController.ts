namespace photoalbum.Controllers {
  export class AlbumsController{
    public albums;
    public selectedAlbums = [];

    public createAlbum(){
      this.$state.go('createAlbum');
    }

    public addSelectedAlbums(id){
      this.selectedAlbums.push(id);
    }

    public deleteAlbum(){
      for(let i=0;i<this.selectedAlbums.length;i++){
        this.photoAlbumService.removeAlbum(this.selectedAlbums[i]).then(() => {
          console.log("Album removed.");
        }).catch((err) =>{
          console.log(err);
        });
      }
      this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
    }

    constructor(private photoAlbumService: photoalbum.Services.PhotoAlbumService,
                private $rootScope:ng.IRootScopeService,
                private $state: ng.ui.IStateService){
      this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
    }

  }

  angular.module('photoalbum').controller('AlbumsController', AlbumsController);

}
