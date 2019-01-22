var myApp = angular.module('myApp', []);

myApp.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.userName;
  $scope.userEmail;
  $scope.userMobile;


  $scope.users ;

   $scope.getUsers = () => {
    $http({
      url: './getUsers',
      method: "GET"
    })
      .then((res) => {
       

        $scope.users = Object.values(res.data);
        console.log(typeof($scope.users))
        console.log(Object.values(res.data));
        
        console.log(res.data);
        console.log($scope.users);

      });

  }
$scope.getUsers();



  $scope.invoice = {
    userName: '',
    userEmail: '',
    items: [
      {
        name: '',
        description: '',
        qty: '',
        price: ''
      }
    ]
  };


  $scope.add = function () {
    $scope.invoice.items.push({
      name: '',
      description: '',
      qty: 1,
      price: 0
    });
  };


  $scope.remove = function (index) {
    $scope.invoice.items.splice(index, 1);
  },
    $scope.total = function () {
      var total = 0;

      total = $scope.invoice.items.map((item) => item.price * item.qty).reduce((acc, val) => acc + val, 0);

      // angular.forEach($scope.invoice.items, function(item){
      //   total += item.qty * item.price;
      // })
      return total;
    }

  $scope.pay = () => {
    var dateTime = new Date();
    dateTime = moment(dateTime).format("MMMM Do YYYY, h:mm a");

    $scope.invoice.timeStamp = dateTime;
    $scope.invoice.userName = $scope.userName;
    $scope.invoice.userEmail = $scope.userEmail;
    $scope.invoice.userMobile = $scope.userMobile;


    $http({
      url: './pay',
      method: "POST",
      data: $scope.invoice
    })
      .then(function (response) {
        console.log('client sent to server');
        swal(`${$scope.total()}`, ` Paid successfully thank u ${$scope.userName}`, "success");

        $scope.invoice = {
          userName: '',
          userEmail: '',
          items: [
            {
              name: '',
              description: '',
              qty: '',
              price: ''
            }
          ]
        };

        $scope.userName = '';
        $scope.userEmail = '';
        $scope.userMobile = '';
        $scope.getUsers();

      },
        function (response) { // optional
          console.log('client could not sent to server');
        });
    console.log($scope.invoice)

  }



  $scope.getDetails = (user) => {
    $scope.userName = user.name;
    $scope.userEmail = user.email;
    $scope.userMobile = user.mobile;
  }

}]);





