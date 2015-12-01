angular.module('starter.controllers', ['ngAnimate'])

// Appplication wide controller, regulates mostly globals like the side menu.
.controller('appCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('SplashCtrl', function($scope, $timeout, $state) {
  $timeout( function () { $state.go('login'); }, 2000);
})

.controller('LoginCtrl', function($scope, $timeout, $state, $ionicLoading, User) {

  // The valid test login credentials
  $scope.test = {
    username: 'test',
    password: 'test'
  };

  // Click for when the login button is clicked
  $scope.submit = function () {

    /**
    This entire code block is a test block only.
    It simulates the login procedure
    which may not match the final version at all.
    **/
    // Block input and place loading screen.
    $ionicLoading.show({
      templateUrl: 'templates/loading.html'
    });
    // Simulate a network latency.
    $timeout( function () {
      // Get rid of loading screen.
      $ionicLoading.hide();
      // If the user's credentials match the test credentials.
      if ($scope.login.username === $scope.test.username && $scope.login.password === $scope.test.password ) {
        // Save user login to test user service
        User.user = $scope.login;
        // Clear the error variable.
        $scope.error = false;
        // Go to the grantAccess activity.
        $state.go('grantAccess');
      } else {
        // Set the error variable. This will allow an error prompt to appear.
        $scope.error = true;
      }
    }, 2000);

  };
})

.controller('GrantAccessCtrl', function ($scope, $state, User) {

  // On Activity Enter, cached or new
  $scope.$on( '$ionicView.enter', function (scopes, states) {

    // By default, no access to outside services is granted.
    $scope.pearsonGranted = false;
    $scope.mozillaGranted = false;

    // Check if access to pearson has been granted using the test user service.
    if ( User.pearson.username !== '' && User.pearson.password !== '' ) {
      $scope.pearsonGranted = true;
    }
    // Check if access to pearson has been granted using the test user service.
    if ( User.mozilla.username !== '' && User.mozilla.password !== '' ) {
      $scope.mozillaGranted = true;
    }

    // Check if both access has been granted
    if ( $scope.mozillaGranted === true && $scope.pearsonGranted === true) {
      // Show the continue button
      $scope.granted = true;
    }

  });

  $scope.skip = function () {
    $state.go('streams');
  };
  $scope.mozilla = function () {
    $state.go('mozillaAccess');
  };
  $scope.pearson = function () {
    $state.go('pearsonAccess');
  };
  $scope.continue = function () {
    $state.go('streams');
  }

})

.controller('MozillaAccessCtrl', function ($scope, $ionicLoading, $timeout, $state, User, $ionicPopup) {

  // The valid test login credentials
  $scope.test = {
    username: 'test',
    password: 'test'
  };

  // Click for when the login button is clicked
  $scope.submit = function () {
    /**
    This entire code block is a test block only.
    It simulates the login procedure
    which may not match the final version at all.
    **/
    // Block input and place loading screen.
    $ionicLoading.show({
      templateUrl: 'templates/loading.html'
    });
    // Simulate a network latency.
    $timeout( function () {
      if ($scope.login.username === $scope.test.username && $scope.login.password === $scope.test.password ) {
        // Save entered information to User service
        User.mozilla = $scope.login;
        console.log(User.mozilla);
        // Get rid of loading screen.
        $ionicLoading.hide();
        // Go back to grant access activity
        $state.go('grantAccess');
      } else {
        // Get rid of loading screen.
        $ionicLoading.hide();

        // Opens an error pop up, only way to exit this ELSE code block is to click OK
        var error = $ionicPopup.show({
          templateUrl: 'templates/login-access-failed.html',
          title: 'Sign In Failed.',
          buttons: [
            {
              text: 'OK',
              type: 'button',
              onTap: function (e) {
                error.close();
              }
            }
          ]
        });

      }
    }, 2000);

  };

})

.controller('PearsonAccessCtrl', function ($scope, $ionicLoading, $timeout, $state, User, $ionicPopup) {

  // The valid test login credentials
  $scope.test = {
    username: 'test',
    password: 'test'
  };

  // Click for when the login button is clicked
  $scope.submit = function () {
    /**
    This entire code block is a test block only.
    It simulates the login procedure
    which may not match the final version at all.
    **/
    // Block input and place loading screen.
    $ionicLoading.show({
      templateUrl: 'templates/loading.html'
    });
    // Simulate a network latency.
    $timeout( function () {
      if ($scope.login.username === $scope.test.username && $scope.login.password === $scope.test.password ) {
        // Save entered information to User service
        User.pearson = $scope.login;
        // Get rid of loading screen.
        $ionicLoading.hide();
        // Go back to grant access activity
        $state.go('grantAccess');
      } else {

        // Get rid of loading screen.
        $ionicLoading.hide();

        // Opens an error pop up, only way to exit this ELSE code block is to click OK
        var error = $ionicPopup.show({
          templateUrl: 'templates/login-access-failed.html',
          title: 'Sign In Failed.',
          buttons: [
            {
              text: 'OK',
              type: 'button',
              onTap: function (e) {
                error.close();
              }
            }
          ]
        });

      }
    }, 2000);

  };

})

.controller('StreamsCtrl', function ($scope) {

})
.controller('DashCtrl', function($scope) {})

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
