var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.directive('validDecimal', function () {

    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            // if (attrs.numeric == true) {
            //alert(scope.CurrentProductAssumptionModel.IsNumeric)
            if (!ngModelCtrl) {
                return;
            }

            ngModelCtrl.$parsers.push(function (val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }

                var clean = val.replace(/[^-0-9\.]/g, '');
                var negativeCheck = clean.split('-');
                var decimalCheck = clean.split('.');
                if (!angular.isUndefined(negativeCheck[1])) {
                    negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
                    clean = negativeCheck[0] + '-' + negativeCheck[1];
                    if (negativeCheck[0].length > 0) {
                        clean = negativeCheck[0];
                    }

                }

                if (!angular.isUndefined(decimalCheck[1])) {
                    decimalCheck[1] = decimalCheck[1].slice(0, 2);
                    clean = decimalCheck[0] + '.' + decimalCheck[1];
                }

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function (event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            });
        }
        // }
    };
});

HCMWebApp.controller("GetExternalRateController", function ($scope) {

    $scope.ExternalListModel = [];
    $scope.ExternalModel = {};

    CheckSession();
    GetAllExternalRates();

    function CheckSession() {

        var Url = $("#CheckSession").val();

        if (Url != undefined) {
            $.ajax({
                type: "POST",
                url: Url,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data == "" || data == null || data == undefined) {
                        alert("Your session has expired. Please log in again");
                        window.location.href = $("#Logout").val();
                        $scope.$apply();
                    }
                    else {
                        Session_UserID = data;
                    }
                },
                error: function (result) {
                    var responseTextCode = result.responseText;
                    if (result.status == 200 && responseTextCode == "") {
                        Session_UserID = "";
                        alert("Your session has expired. Please log in again");
                        window.location.href = $("#Logout").val();
                        $scope.$apply();
                    }
                }
            });
        }
    }

    function GetAllExternalRates() {

        var Extrnl_Url = $("#GetAllExternalRates").val();
        if (Extrnl_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Extrnl_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.ExternalListModel = data;
                        $scope.sortpropertyName = 'ExternalName';
                        $scope.sortorder = false;
                        $scope.$apply();
                    },
                    error: function (data) {
                        alert(data.responseText);
                        return false;
                    }
                });

            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    }

    $scope.sortBy = function (propertyName) {
        $scope.sortorder = ($scope.sortpropertyName === propertyName) ? !$scope.sortorder : false;
        $scope.sortpropertyName = propertyName;
    };

    $scope.EditExternalRte = function (index, Extrnl_Obj) {

        if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

            $scope.ExternalModel.ExternalRateID = Extrnl_Obj.ExternalRateID;
            $scope.ExternalModel.ExternalName = Extrnl_Obj.ExternalName;
            $scope.ExternalModel.ExternalRate = Extrnl_Obj.ExternalRate;
        }
        else {
            window.location.href = $("#Logout").val();
        }
    };

    $scope.UpdateExternalRateClick = function () {

        var edit_Url = $("#UpdateExternalRates").val();
        if (edit_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                var ExtrnlID = $scope.ExternalModel.ExternalRateID;
                var ExtrnlName = $scope.ExternalModel.ExternalName;
                var ExtrnlRte = $scope.ExternalModel.ExternalRate;

                if (ExtrnlRte == "" || ExtrnlRte == null || ExtrnlRte == undefined || isNaN(ExtrnlRte)) {
                    alert("Please Enter External Rate");
                    return false;
                }

                $.ajax({
                    type: "POST",
                    url: edit_Url,
                    data: "{'ExtrnlRteID':'" + ExtrnlID + "','ExtrnlName':'" + escape(ExtrnlName) + "', 'ExtrnlPercent':'" + ExtrnlRte + "'}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {

                        if (data == "Success") {
                            alert("External Saved Successfully");
                            $("#Edit_ExternalRte").modal('close');
                            GetAllExternalRates();
                            $scope.ExternalModel.ExternalRateID = 0;
                            $scope.ExternalModel.ExternalName = "";
                            $scope.ExternalModel.ExternalRate = "";
                            $scope.$apply();
                        }
                    },
                    error: function (data) {
                        alert(data.responseText);
                        return false;
                    }
                });

            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    };

    $scope.ExternalCancelClick = function () {

        $scope.ExternalModel.ExternalRateID = 0;
        $scope.ExternalModel.ExternalName = "";
        $scope.ExternalModel.ExternalRate = "";
    };

});

HCMWebApp.controller("GlobalClientController", function ($scope) {

    $scope.ClientListModel = [];
    $scope.EnableVersionDiv = false;

    CheckSession();
    GetClients();

    function CheckSession() {

        var Url = $("#CheckSession").val();

        if (Url != undefined) {
            $.ajax({
                type: "POST",
                url: Url,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data == "" || data == null || data == undefined) {
                        alert("Your session has expired. Please log in again");
                        window.location.href = $("#Logout").val();
                        $scope.$apply();
                    }
                    else {
                        Session_UserID = data;
                    }
                },
                error: function (result) {

                    var responseTextCode = result.responseText;
                    if (result.status == 200 && responseTextCode == "") {
                        Session_UserID = "";
                        alert("Your session has expired. Please log in again");
                        window.location.href = $("#Logout").val();
                        $scope.$apply();
                    }
                }
            });
        }
    }

    function GetClients() {

        var Url = $("#GetClients").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        $scope.ClientListModel = data;
                    },
                    error: function (result) {
                        alert(result.responseText);
                    }
                });
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    }

    $scope.OnChangeGetClientID = function (ClientID) {

        var Url = $("#AssignClient").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                $("#loadingDiv").show();

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{'ClientID':" + ClientID + "}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        //window.location.href = $("#DashboardIndex").val();
                        window.location.href = window.location.href;
                        $("#loadingDiv").hide();
                    },
                    error: function (result) {
                        $("#loadingDiv").hide();
                        alert(result.responseText);
                    }
                });
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }

    }


});

function IsNumeric(e, t) {

    try {

        if (window.event) {
            var charCode = window.event.keyCode;
        }
        else if (e) {
            var charCode = e.which;
        }
        else { return true; }

        //if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        //    return false;
        //}
        if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
    catch (err) {
        alert(err.Description);
    }
}
