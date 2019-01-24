var myApp = angular.module('myApp', []);

myApp.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.userName;
  $scope.userEmail;
  $scope.userMobile;


//  items
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

// adding new item

$scope.add = function () {
  $scope.invoice.items.push({
    name: '',
    description: '',
    qty: 1,
    price: 0
  });
};

//removng item

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



  //Get userList in left side of UI
  $scope.users ;
  $scope.recent;

   $scope.getUsers = () => {
    $http({
      url: './getUsers',
      method: "GET"
    })
      .then((res) => {
        $scope.users = res.data.users;
        $scope.recent = res.data.recent;
         console.log(res.data.recent);
      });

  }
$scope.getUsers();



//pay http request

  $scope.pay = () => {
    var dateTime = new Date();
    dateTime = moment(dateTime).format("MMMM Do YYYY, h:mm a");

    $scope.invoice.timestamp = dateTime;
    $scope.invoice.userName = $scope.userName;
    $scope.invoice.userEmail = $scope.userEmail;
    $scope.invoice.userMobile = $scope.userMobile;
    $scope.invoice.total = $scope.total();


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

//Get details

  $scope.getDetails = (user) => {
    $scope.userName = user.name;
    $scope.userEmail = user.email;
    $scope.userMobile = user.mobile;
  }






}]);





