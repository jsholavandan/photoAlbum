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

    public addCoverToAlbum(photoId){
      if(photoId === null && this.selectedPhotos.length > 0){
        photoId = this.selectedPhotos[0];
      }

      if(photoId !== null) {
        for(let i=0;i<this.album.photos.length;i++){
          if(this.album.photos[i]._id === this.selectedPhotos[0]){
            this.album.albumCover = this.album.photos[i].fileUrl;
          }
        }
        this.photoAlbumService.saveAlbum(this.album).then(() => {
          console.log("new cover added");
        });
      }else{
        this.$window.alert("Please select a Photo to add as a cover.");
      }
    }

    public menuOptions(){
      return [
        ['Delete', ($itemScope, $event, modelValue, text, $li) => {
          this.deletePhotos($itemScope.photo._id);
        }],
        null,
        ['Add as Album Cover', ($itemScope, $event, modelValue, text, $li) => {
          let photoId = $itemScope.photo._id;
          this.addCoverToAlbum(photoId);
        }],
      ];
    }

    public deletePhotos(id){
      if(id !== null){
        for(let j=this.album.photos.length-1;j>=0;j--){
          if(id === this.album.photos[j]._id){
            if(this.album.albumCover === this.album.photos[j].fileUrl){
              this.album.albumCover = "ngApp/images/album.jpg";
            }
            this.album.photos.splice(j, 1);
          }
        }
      }else{
        for(let i=0;i<this.selectedPhotos.length;i++){
          for(let j=this.album.photos.length-1;j>=0;j--){
            if(this.selectedPhotos[i] === this.album.photos[j]._id){
              if(this.album.albumCover === this.album.photos[j].fileUrl){
                this.album.albumCover = "ngApp/images/album.jpg";
              }
              this.album.photos.splice(j, 1);
            }
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
                private $mdPanel:angular.material.IPanelService,
                private $window:ng.IWindowService){
      let albumId = this.$stateParams["id"];
      console.log(albumId);
      this.album = this.photoAlbumService.getAlbum(albumId);
    }
  }

  angular.module('photoalbum').controller('AlbumController', AlbumController);
}
