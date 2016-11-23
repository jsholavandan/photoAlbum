namespace photoalbum.Controllers{
  //Album controller
  export class AlbumController{
    public album;
    public selectedPhotos = [];

    public addSelectedPhotos(id){
      this.selectedPhotos.push(id);
    }

    public startSlideShow(){
      let position = this.$mdPanel.newPanelPosition()
                      .absolute()
                      .center()
      let config = {
        attachTo: angular.element(document.body),
        controller: PanelDialogCtrl,
        controllerAs: 'ctrl',
        templateUrl: 'ngApp/views/panel.tmpl.html',
        hasBackdrop: true,
        panelClass: 'demo-dialog-example',
        position: position,
        trapFocus: true,
        zIndex: 150,
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true,
        locals:{photos: this.album.photos}
      };

      this.$mdPanel.open(config);
    }

    public addCoverToAlbum(){
      if(this.selectedPhotos.length > 0) {
        for(let i=0;i<this.album.photos.length;i++){
          if(this.album.photos[i]._id === this.selectedPhotos[0]){
            this.album.albumCover = this.album.photos[i].fileUrl;
          }
        }

        console.log(this.album);

        this.photoAlbumService.saveAlbum(this.album).then(() => {
          console.log("new cover added");
        });
      }

    }

    public deletePhotos(){
      for(let i=0;i<this.selectedPhotos.length;i++){
        for(let j=this.album.photos.length-1;j>=0;j--){
          if(this.selectedPhotos[i] === this.album.photos[j]._id){
            this.album.photos.splice(j, 1);
          }
        }
      }
      this.photoAlbumService.saveAlbum(this.album).then(()=>{
        console.log("Album updated");
        this.selectedPhotos = [];
      });
    }

    constructor(private photoAlbumService:photoalbum.Services.PhotoAlbumService,
                private $rootScope:ng.IRootScopeService,
                private $stateParams:ng.ui.IStateParamsService,
                private $mdPanel:angular.material.IPanelService){
      let albumId = this.$stateParams["id"];
      console.log(albumId);
      this.album = this.photoAlbumService.getAlbum(albumId);
    }
  }

  angular.module('photoalbum').controller('AlbumController', AlbumController);
}