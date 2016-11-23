namespace photoalbum.Controllers {

  export class PhotosController{
    public photos;
    public albums;
    public panel;


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
          locals:{photos: this.photos}
        };

        console.log(this.photos);
        this.$mdPanel.open(config);
      }

      public menuOptions(){
        return [
          ['Edit', ($itemScope, $event, modelValue, text, $li) => {
            let photoId = $itemScope.photo._id;
            this.editPhoto(photoId, $event);
          }],
          null,
          ['Delete', ($itemScope, $event, modelValue, text, $li) => {
            let photoId = $itemScope.photo._id;
            let photoUrl = $itemScope.photo.fileUrl;
            this.photoAlbumService.removePhoto(photoId).then((res) => {
            //  this.checkAndDeleteInAlbums(photoId, photoUrl);
              this.filepickerService.remove(photoUrl, () => {
                console.log("photo removed");
              });
            });
          }],
          null,
          ['Add to album', ($itemScope, $event, modelValue, text, $li) => {
            let photoId = $itemScope.photo._id;
            this.addToAlbum(photoId, $event);
          }]
        ];
      }

      public addToAlbum(photoId, event){
        this.$mdDialog.show({
          locals:{photoId:photoId},
          controller: ListAlbumsController,
          templateUrl: 'ngApp/views/listAlbumsDialog.html',
          parent: angular.element(document.body),
          targetEvent: event,
          controllerAs: 'controller',
          clickOutsideToClose:true
        });
      }


      public editPhoto(photoId, event){
        this.$mdDialog.show({
          locals:{photoId:photoId},
          controller: DialogController,
          templateUrl: 'ngApp/views/dialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: event,
          controllerAs: 'controller',
          clickOutsideToClose:true
        });
      }


    constructor(private photoAlbumService: photoalbum.Services.PhotoAlbumService,
                private $rootScope: ng.IRootScopeService,
                private $scope:ng.IScope,
                private $mdPanel: angular.material.IPanelService,
                private filepickerService,
                private $state:ng.ui.IStateService,
                private $mdDialog: angular.material.IDialogService){
        this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
        this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
        //console.log(this.photos);
    }
  }

  angular.module("photoalbum").controller("PhotosController", PhotosController);

}
