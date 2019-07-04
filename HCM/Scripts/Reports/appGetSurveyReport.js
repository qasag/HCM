var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("GetSurveyReportController", function ($scope) {

    $scope.ModulesListModel = [];
    $scope.SurveyReportDataListModel = [];
    $scope.ResponseTypeListModel = [{ 'name': 'Business' }, { 'name': 'Technology' }]

    CheckSession();
    GetAllModule();

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

    function GetAllModule() {
        var list_Url = $("#GetModule").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.ModulesListModel = data;
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

    $scope.GetSurveyReportsData = function () {

        var list_Url = $("#GetDashBoardInnerData").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (ValidateFields()) {
                    $("#loadingDiv").show();

                    var ModuleID = $scope.ModuleID;
                    var ResponseType = $scope.ResponseType;                   

                    $.ajax({
                        type: "POST",
                        url: list_Url,
                        data: "{'ModuleID':'" + ModuleID + "','UserType':'" + ResponseType + "'}",
                        contentType: "application/json;",
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            
                            if (data.length > 0) {
                                $('#SuveryReportExcelDiv').show();
                                $('#SurveyReportTableDiv').show();
                                $scope.SurveyReportDataListModel = data;
                                $scope.sortpropertyName = 'Questions';
                                $scope.sortorder = false;
                                $("#loadingDiv").hide();
                            }
                            else {
                                $('#SuveryReportExcelDiv').hide();
                                $('#SurveyReportTableDiv').hide();
                                alert('No Data Available');
                                $("#loadingDiv").hide();
                                return false;
                            }
                        },
                        error: function (data) {
                            alert(data.responseText);
                            $("#loadingDiv").hide();
                        }
                    });
                }
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    };

    function ValidateFields() {

        var valid_flag = true;
        var module = $scope.ModuleID;
        var ResponseType = $scope.ResponseType;

        if (module == "") {
            alert('Please Select Module');
            valid_flag = false;
            return valid_flag;
        }

        if (ResponseType == "" || ResponseType == null || ResponseType == undefined) {
            alert('Please Select Response Type');
            valid_flag = false;
            return valid_flag;
        }

        return valid_flag;
    }

    $scope.sortBy = function (propertyName) {
        $scope.sortorder = ($scope.sortpropertyName === propertyName) ? !$scope.sortorder : false;
        $scope.sortpropertyName = propertyName;
    };

    $scope.DownloadSurveyResultReport = function () {

        var dwnlod_Url = $("#GetSurveyResultInExcelFile").val();
        if (dwnlod_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (ValidateFields()) {

                    var ModuleID = $scope.ModuleID;
                    var ResponseType = $scope.ResponseType;

                    window.location.href = dwnlod_Url + "?ModuleID=" + ModuleID + '&ResponseType=' + ResponseType;
                }
            }
        }
    };


});

HCMWebApp.controller("GlobalClientController", function ($scope) {

    $scope.ClientListModel = [];
    $scope.GetAllVersionsListModel = [];
    $scope.GetActiveProductsListModel = [];

    $scope.EnableVersionDiv = true;
    $scope.EnableProductDiv = true;

    CheckSession();
    GetClients();
    GetActiveVersionsList();
    GetActiveProductsList();

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

    function GetActiveVersionsList() {
       
        var list_Url = $("#GetActiveVersions").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {                       
                        $scope.GetAllVersionsListModel = data;
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

    $scope.OnChangeGetVersionID = function (VersionID) {

        var Url = $("#AssignVersion").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $("#loadingDiv").show();

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{'VersionID':" + VersionID + "}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {
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

    function GetActiveProductsList() {

        var list_Url = $("#GetActiveProducts").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        $scope.GetActiveProductsListModel = data;
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

    $scope.OnChangeGetProduct = function (ProductID) {

        var Url = $("#AssignProduct").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                $("#loadingDiv").show();

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{'ProductID':" + ProductID + "}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {
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