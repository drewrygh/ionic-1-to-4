angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

  $scope.showToast = async function() {

    const toastController = document.querySelector('ion-toast-controller');
     await toastController.componentOnReady();

     const toast = await toastController.create({
       message: 'This is a toast with a close button.',
       showCloseButton: true,
       closeButtonText: "Close",
       position: 'bottom',
       duration: 5000
     });
     return await toast.present();
  };

  $scope.showV4Modal = async function presentModal() {
    // initialize controller
    const modalController = document.querySelector('ion-modal-controller');
    await modalController.componentOnReady();

    // create component to open
    const element = document.createElement('div');
    element.innerHTML = `
    <ion-header>
      <ion-toolbar>
        <ion-title>Super Modal</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <h1>Content of doom</h1>
      <div>Here's some more content</div>
      <ion-button class="dismiss">Dismiss Modal</ion-button>
    </ion-content>
    `;

    // listen for close event
    const button = element.querySelector('ion-button');
    button.addEventListener('click', () => {
      modalController.dismiss();
    });

    // present the modal
    const modalElement = await modalController.create({
      component: element
    });
    modalElement.present();
  };

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
