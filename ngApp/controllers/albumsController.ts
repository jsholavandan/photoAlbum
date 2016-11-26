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
      if(this.selectedAlbums.length > 0){
        for(let i=0;i<this.selectedAlbums.length;i++){
          this.photoAlbumService.removeAlbum(this.selectedAlbums[i]).then(() => {
            this.$window.alert("Album removed.");
          }).catch((err) =>{
            console.log(err);
          });
        }
        this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
      }else{
        this.$window.alert("please choose an album to delete");
      }
    }



    constructor(private photoAlbumService: photoalbum.Services.PhotoAlbumService,
                private $rootScope:ng.IRootScopeService,
                private $state: ng.ui.IStateService,
                private $window:ng.IWindowService){
      this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
    }

  }

  angular.module('photoalbum').controller('AlbumsController', AlbumsController);
}
