namespace photoalbum.Controllers {

  export class PhotosController{
    public photos;
    public albums;
    public panel;
    public selectedPhotos= [];


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
          ['Delete', ($itemScope, $event, modelValue, text, $li) => {
            let photoId = $itemScope.photo._id;
            let photoUrl = $itemScope.photo.fileUrl;
            this.photoAlbumService.removePhoto(photoId).then((res) => {
              this.filepickerService.remove(photoUrl, () => {
                this.$window.alert("photo removed");
                this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
              });
            });
          }],
          null,
          ['Add Caption', ($itemScope, $event, modelValue, text, $li) => {
            let photoId = $itemScope.photo._id;
            this.editPhoto(photoId, $event);
          }],
          null,
          ['Add to album', ($itemScope, $event, modelValue, text, $li) => {
            let photoId = $itemScope.photo._id;
            this.addToAlbum(photoId, $event);
          }]
        ];
      }


      public addToAlbum(photoId, event){
        let photoIdArr = [];
        if(photoId !== null){
          photoIdArr.push(photoId);
        }else{
          photoIdArr = this.selectedPhotos;
        }
        if(photoIdArr.length > 0){
          this.$mdDialog.show({
            locals:{photoIdArr:photoIdArr},
            controller: ListAlbumsController,
            templateUrl: 'ngApp/views/listAlbumsDialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            controllerAs: 'controller',
            clickOutsideToClose:true
          });
          this.selectedPhotos = [];
        }else{
          this.$window.alert("Please select photos to add to album.");
        }
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

      public refreshData(){
        console.log("refresh data");
        this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
      }


    constructor(private photoAlbumService: photoalbum.Services.PhotoAlbumService,
                private $rootScope: ng.IRootScopeService,
                private $scope:ng.IScope,
                private $mdPanel: angular.material.IPanelService,
                private filepickerService,
                private $state:ng.ui.IStateService,
                private $mdDialog: angular.material.IDialogService,
                private $window: ng.IWindowService,
              private $element:ng.IRootElementService){
        this.photos = this.photoAlbumService.listPhotos(this.$rootScope.username);
        this.albums = this.photoAlbumService.listAlbums(this.$rootScope.username);
        this.$scope.$on("NewPhoto", () =>{
          this.refreshData();
        });
        //console.log(this.photos);
    }
  }

  angular.module("photoalbum").controller("PhotosController", PhotosController);

}
