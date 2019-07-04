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

HCMWebApp.controller("GetDurationController", function ($scope) {

    $scope.DurationListModel = [];
    $scope.DurationModel = {
        'ProjectSummaryID': '',
        'ProjectSummaryName': '',
        'ProjectInitiation': '',
        'RequirementGathering': '',
        'Development': '',
        'Testing': '',
        'Training': '',
        'RollOut': ''
    };

    CheckSession();
    GetAllDurations();

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

    function GetAllDurations() {

        var durtn_Url = $("#GetAllDurations").val();
        if (durtn_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: durtn_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        $scope.DurationListModel = data;
                        $scope.sortpropertyName = 'ProjectSummaryName';
                        $scope.sortorder = false;
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

    $scope.EditDuration = function (index, duration_Obj) {

        if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

            $scope.DurationModel.ProjectSummaryID = duration_Obj.ProjectSummaryID;
            $scope.DurationModel.ProjectSummaryName = duration_Obj.ProjectSummaryName;

            $scope.DurationModel.ProjectInitiation = duration_Obj.ProjectInitiation;
            $scope.DurationModel.RequirementGathering = duration_Obj.RequirementGathering;
            $scope.DurationModel.Development = duration_Obj.Development;

            $scope.DurationModel.Testing = duration_Obj.Testing;
            $scope.DurationModel.Training = duration_Obj.Training;
            $scope.DurationModel.RollOut = duration_Obj.RollOut;

        }
        else {
            window.location.href = $("#Logout").val();
        }
    };

    $scope.UpdateDurationClick = function () {

        var updt_Url = $("#UpdateDuration").val();
        if (updt_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (ValidateDuration()) {

                    $.ajax({
                        type: "POST",
                        url: updt_Url,
                        data: "{'Duration_DataArray':'" + escape($.param($scope.DurationModel)) + "'}",
                        contentType: "application/json;",
                        dataType: "json",
                        async: false,
                        success: function (data) {

                            if (data == "Success") {
                                alert("Duration Updated Successfully");
                                $("#Edit_Duration").modal('close');
                                EmptyDurationModel();
                                GetAllDurations();
                            }
                        },
                        error: function (data) {
                            alert(data.responseText);
                            return false;
                        }
                    });
                }
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }

    };

    function ValidateDuration() {

        var durtn_flag = true;

        var PrjctInit = $scope.DurationModel.ProjectInitiation;
        var RequrmtGthr = $scope.DurationModel.RequirementGathering;
        var Develpmnt = $scope.DurationModel.Development;
        var Testing = $scope.DurationModel.Testing;
        var Training = $scope.DurationModel.Training;
        var Rollout = $scope.DurationModel.RollOut;

        if (PrjctInit == "" || PrjctInit == null || PrjctInit == undefined || isNaN(PrjctInit) || PrjctInit == 0 || PrjctInit == '0') {
            alert("Please Enter Project Initiation");
            durtn_flag = false;
            return durtn_flag;
        }

        if (RequrmtGthr == "" || RequrmtGthr == null || RequrmtGthr == undefined || isNaN(RequrmtGthr) || RequrmtGthr == 0 || RequrmtGthr == '0') {
            alert("Please Enter Requirement Gathering");
            durtn_flag = false;
            return durtn_flag;
        }

        if (Develpmnt == "" || Develpmnt == null || Develpmnt == undefined || isNaN(Develpmnt) || Develpmnt == 0 || Develpmnt == '0') {
            alert("Please Enter Development");
            durtn_flag = false;
            return durtn_flag;
        }

        if (Testing == "" || Testing == null || Testing == undefined || isNaN(Testing) || Testing == 0 || Testing == '0') {
            alert("Please Enter Testing");
            durtn_flag = false;
            return durtn_flag;
        }

        if (Training == "" || Training == null || Training == undefined || isNaN(Training) || Training == 0 || Training == '0') {
            alert("Please Enter Training");
            durtn_flag = false;
            return durtn_flag;
        }

        if (Rollout == "" || Rollout == null || Rollout == undefined || isNaN(Rollout) || Rollout == 0 || Rollout == '0') {
            alert("Please Enter Rollout");
            durtn_flag = false;
            return durtn_flag;
        }

        return durtn_flag;
    }

    $scope.DurationCancelClick = function () {
        EmptyDurationModel();
    };

    function EmptyDurationModel() {

        $scope.DurationModel.ProjectSummaryID = '';
        $scope.DurationModel.ProjectSummaryName = '';

        $scope.DurationModel.ProjectInitiation = '';
        $scope.DurationModel.RequirementGathering = '';
        $scope.DurationModel.Development = '';

        $scope.DurationModel.Testing = '';
        $scope.DurationModel.Training = '';
        $scope.DurationModel.RollOut = '';

    }

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
