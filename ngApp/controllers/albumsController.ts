namespace photoalbum.Controllers {
  export class AlbumsController{
    public albums;
    public selectedAlbums = [];

    public createAlbum(){
      this.$state.go('createAlbum');
    }

    public addSelectedAlbums(id, selected){
      if(selected){
        if(this.selectedAlbums.indexOf(id) === -1){
          this.selectedAlbums.push(id);
        }
      }else{
        let idx = this.selectedAlbums.indexOf(id);
        if(idx > -1){
          this.selectedAlbums.splice(idx, 1);
        }
      }
    }

    public deleteAlbum(){
      if(this.selectedAlbums.length > 0){
        for(let i=0;i<this.selectedAlbums.length;i++){
          this.photoAlbumService.removeAlbum(this.selectedAlbums[i]).then(() => {
          }).catch((err) =>{
            console.log(err);
          });
        }
        this.$window.alert("Album removed.");
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
