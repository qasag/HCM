
var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("GetVersionsController", function ($scope) {

    $scope.VersionListModel = [];
    $scope.GetAllVersionsListModel = [];
    $scope.VersionModel = {};

    CheckSession();
    GetAllVersions();
    GetActiveVersionsList();

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

    function GetAllVersions() {

        var list_Url = $("#GetAllVersions").val();
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

                        $scope.VersionListModel = data;
                        $scope.sortpropertyName = 'VersionName';
                        $scope.sortorder = false;

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

    $scope.sortBy = function (propertyName) {
        $scope.sortorder = ($scope.sortpropertyName === propertyName) ? !$scope.sortorder : false;
        $scope.sortpropertyName = propertyName;
    };

    $scope.InsertAndUpdateVersionClick = function () {

        var Url = $("#InsertAndUpdateVersion").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (ValidateVersion()) {
                
                    $.ajax({
                        type: "POST",
                        url: Url,
                        data: "{'VersionDataArray':'" + escape($.param($scope.VersionModel)) + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {

                            if (data == "Success") {
                                alert("Version Saved Successfully");
                                $('#addnew_Version').modal('close');
                                $('#edit_Version').modal('close');
                                EmptyVersionModel();
                                GetAllVersions();
                                GetActiveVersionsList();
                                $scope.$apply();
                            }
                        },
                        error: function (result) {
                            alert(result.responseText);
                        }
                    });
                }
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }

    };

    function ValidateVersion() {

        var Version_flag = true;

        var VersionName = $scope.VersionModel.VersionName;
        var FromVersion = $scope.VersionModel.FromVersionID;
        var VersionID = $scope.VersionModel.VersionID;

        if (VersionName == "" || VersionName == null || VersionName == undefined) {
            alert("Please Enter Version Name");
            Version_flag = false;
            return Version_flag
        }

        if (VersionID == 0 || VersionID == "" || VersionID == null || VersionID == undefined || isNaN(VersionID)) {

            if (FromVersion == "" || FromVersion == null || FromVersion == undefined) {
                alert("Please Select From Version");
                Version_flag = false;
                return Version_flag;
            }
        }


        return Version_flag;
    }

    function EmptyVersionModel() {

        $scope.VersionModel.VersionID = 0;
        $scope.VersionModel.VersionName = "";
        $scope.VersionModel.VersionDescription = "";
        $scope.VersionModel.FromVersionID = null;

    }

    $scope.VersionCancelClick = function () {
        EmptyVersionModel();
        GetAllVersions();
        GetActiveVersionsList();
    };

    $scope.AddNewVersionClick = function () {
        EmptyVersionModel();

    };

    $scope.EditVersionByID = function (index, Version) {

        if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

            $scope.VersionModel.VersionID = Version.VersionID;
            $scope.VersionModel.FromVersionID = Version.FromVersionID
            $scope.VersionModel.VersionName = Version.VersionName;
            $scope.VersionModel.VersionDescription = Version.VersionDescription;
            $scope.VersionModel.Status = Version.Status;
        }
        else {
            window.location.href = $("#Logout").val();
        }
    };

    $scope.SetAsDefaultVersionClick = function (index, Version) {

        var Url = $("#UpdateVersionToDefault").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{'VersionID':'" + Version.VersionID + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {

                        if (data == "Success") {
                            alert("Version Set To Default Successfully");
                            window.location.href = $("#GetVersions").val();
                            $scope.$apply();
                        }
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
                        //  window.location.href = $("#DashboardIndex").val();
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