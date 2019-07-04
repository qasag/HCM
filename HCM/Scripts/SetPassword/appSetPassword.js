var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);

HCMWebApp.controller("SetPasswordController", function ($scope) {

    $scope.SetPasswordModel = {
        'Email': '',
        'NewPassword': '',
        'ConfirmPassword': ''
    };

    $scope.SetPasswordModel.Email = $("#hdnEmailID").val();

    $scope.UpdateSetPasswordUser = function () {
      
        var UpdtPswd_Url = $("#UpdateSetPassword").val();
        if (UpdtPswd_Url != undefined) {

            if (ValidateUser()) {
             
                $.ajax({
                    type: "POST",
                    url: UpdtPswd_Url,
                    data: "{'EmailID':'" + $scope.SetPasswordModel.Email + "','Password':'" + $scope.SetPasswordModel.NewPassword + "'}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        if (data == "Success") {
                            alert("Password Updated Successfully");
                            window.location.href = $("#LoginIndex").val();
                        }
                    },
                    error: function (data) {
                        alert(data.responseText);
                        return false;
                    }
                });
            }
        }
    };

    function ValidateUser() {
     
        var SetPswd_flag = true;

        var NewPswd = $scope.SetPasswordModel.NewPassword;
        var CnfrmPswd = $scope.SetPasswordModel.ConfirmPassword;

        if (NewPswd == "" || NewPswd == null || NewPswd == undefined) {
            alert("Please Enter New Password");
            SetPswd_flag = false;
            return SetPswd_flag;
        }

        if (CnfrmPswd == "" || CnfrmPswd == null || CnfrmPswd == undefined) {
            alert("Please Enter Confirm Password");
            SetPswd_flag = false;
            return SetPswd_flag;
        }

        if (NewPswd != CnfrmPswd) {
            alert("New Password And Confirm Password Must Match");
            SetPswd_flag = false;
            return SetPswd_flag;
        }

        return SetPswd_flag;

    }

});