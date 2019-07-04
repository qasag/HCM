var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);

HCMWebApp.controller("LoginController", function ($scope) {

    $scope.LoginUserModel = {
        'Email': '',
        'Password': ''
    };

    $scope.LoginUserClick = function () {

        var login_url = $("#LoginUser").val();
        if (login_url != undefined) {

            if (ValidateUserLogin()) {

                $.ajax({
                    type: "POST",
                    url: login_url,
                    data: "{'login_User_ArrayData': '" + escape($.param($scope.LoginUserModel)) + "'}",
                    contentType: "application/json;charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                      
                        if (data.UserID == 0) {
                            alert("Invalid login credentials. Please try again.");
                            return false;
                        }
                        else {
                            $scope.LoginUserModel = data;
                            $scope.$apply();

                            if ($scope.LoginUserModel.UserType == "ClientAdmin" || $scope.LoginUserModel.UserType == "SuperAdmin") {
                                window.location.href = $("#DashboardIndex").val();
                            }
                            else if ($scope.LoginUserModel.UserType == "Business" || $scope.LoginUserModel.UserType == "Technology") {
                                window.location.href = $("#QuestionnaireIndex").val();
                            }
                            else {
                                window.location.href = $("#DashboardIndex").val();
                            }
                        }

                    }, error: function (res) {
                        alert(res.responseText);
                    }

                });
            }
        }
    };

    function ValidateUserLogin() {

        var login_user_flag = true;
        var Email = $scope.LoginUserModel.Email;
        var Password = $scope.LoginUserModel.Password;
        var re = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (Email == '' || Email == undefined || Email == null) {
            alert('Please Enter Email');
            login_user_flag = false;
            return login_user_flag;
        }

        if (Email.length > 0) {
            if (!re.test(Email)) {
                alert('Please Enter Valid Email Address.');
                login_user_flag = false;
                return login_user_flag;
            }
        }
        if (Password == '' || Password == undefined || Password == null) {
            alert('Please Enter Password');
            login_user_flag = false;
            return login_user_flag;
        }


        return login_user_flag;

    }


});