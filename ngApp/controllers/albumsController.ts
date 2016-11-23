namespace photoalbum.Controllers {
  export class AlbumsController{
    public albums;

    public createAlbum(){
      this.$state.go('createAlbum');
    }

    constructor(private photoAlbumService: photoalbum.Services.PhotoAlbumService,
                private $rootScope:ng.IRootScopeService,
                private $state: ng.ui.IStateService){
      this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
    }

  }

  angular.module('photoalbum').controller('AlbumsController', AlbumsController);

}
