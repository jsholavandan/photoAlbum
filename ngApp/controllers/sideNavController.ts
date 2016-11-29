namespace photoalbum.Controllers {

  export class SidenavController{

    public photos(){
      this.$state.go('photos');
    //  this.$scope.$apply();
    }

    public albums(){
      this.$state.go('albums');
    }

    public pickFile(){
      this.filepickerService.pick(
        { mimetype: 'image/*'},
        this.fileUploaded.bind(this)
      );
    }

    public fileUploaded(file){
      let photoObj = {
        username: this.$rootScope.username,
        fileName : file.filename,
        fileUrl: file.url
      }

    //  console.log(phtotoObj);

      this.photoAlbumService.savePhoto(photoObj).then((data) => {
         console.log("photo saved");
         this.$scope.$broadcast("NewPhoto");
         this.$state.go('photos');
      }).catch((err) => {
        console.log(err);
      });


    }

    constructor(private filepickerService,
                private photoAlbumService: photoalbum.Services.PhotoAlbumService,
                private $rootScope:ng.IRootScopeService,
                private $state: ng.ui.IStateService,
                private $scope:ng.IScope){

    }
  }

  angular.module('photoalbum').controller("SidenavController", SidenavController);
}
