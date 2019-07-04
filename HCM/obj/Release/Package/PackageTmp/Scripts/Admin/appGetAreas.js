var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("GetAreasController", function ($scope) {

    $scope.ProductsListModel = [];
    $scope.AreaListModel = [];
    $scope.ModuleListModel = [];

    $scope.AreaModel = {
        'AreaID': '',
        'ModuleID': '',
        'ModuleName': '',
        'AreaName': '',
        'AreaDescription': '',
        'Status': '',
        'CreatedOn': '',
        'CreatedBy': '',
        'UpdatedOn': '',
        'UpdatedBy': '',
        'ProductID':''
    };
   
    CheckSession();
    GetAllAreas();
    GetAllProducts();
    
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

    function GetAllProducts() {

        var list_Url = $("#GetActiveProducts").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.ProductsListModel = data;
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

    function GetAllAreas() {
        var area_Url = $("#GetAllAreas").val();
        if (area_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: area_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.AreaListModel = data;
                        $scope.sortpropertyName = 'AreaName';
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

    function GetAllModules() {
        var Url = $("#GetModulesByProductID").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{'ProductID':'"+ $scope.AreaModel.ProductID +"'}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.ModuleListModel = data;
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

    $scope.CreateAreaClick = function () {

        var Url = $("#AreaCreation").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (AreaValidation()) {

                    var areaID = $scope.AreaModel.AreaID;

                    $.ajax({
                        type: "POST",
                        url: Url,
                        data: "{'areaDataArray':'" + escape($.param($scope.AreaModel)) + "'}",
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (data) {
                            if (data == "Success") {
                                alert("Area Created Successfully");
                                $('#addnew_area').modal('close');
                                GetAllAreas();
                                $scope.$apply();
                            }
                            else {
                                alert("AreaName with Module Already Exists.");
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
    }

    function AreaValidation() {

        var areaFlag = true;
        var areaName = $scope.AreaModel.AreaName;
        var modulename = $scope.AreaModel.ModuleID;
        var productID = $scope.AreaModel.ProductID;

        if (productID == "" || productID == null || productID == undefined) {
            alert("Please Choose Product");
            areaFlag = false;
            return areaFlag;
        }

        if (modulename == "" || modulename == null || modulename == undefined) {
            alert("Please Choose Module");
            areaFlag = false;
            return areaFlag;
        }

        if (areaName == "" || areaName == null || areaName == undefined) {
            alert("Please Enter Area Name");
            areaFlag = false;
            return areaFlag;
        }

        return areaFlag;
    }

    $scope.EditAreaByID = function (index, area) {

        if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
            var productID = area.Product.ProductID;
            $scope.AreaModel.AreaID = area.AreaID;
            $scope.AreaModel.ProductID = area.Product.ProductID;
            $scope.AreaModel.ModuleID = area.Module.ModuleID;
            GetAllModules(productID);
            $scope.AreaModel.ModuleName = area.Module.ModuleName;
            $scope.AreaModel.AreaName = area.AreaName;
            $scope.AreaModel.AreaDescription = area.AreaDescription;
            $scope.AreaModel.Status = area.Status;
        }
        else {
            window.location.href = $("#Logout").val();
        }
    };

    $scope.CancelClick = function () {
        EmptyAreaModel();
    };

    function EmptyAreaModel() {
        $scope.AreaModel.AreaID = '';
        $scope.AreaModel.ModuleID = null;
        $scope.AreaModel.ModuleName = null;
        $scope.AreaModel.AreaName = '';
        $scope.AreaModel.AreaDescription = '';
        $scope.AreaModel.Status = false;
        $scope.AreaModel.ProductID = '';
        $scope.ModuleListModel = [];
    }

    $scope.UpdateAreaClick = function () {

        var Url = $("#AreaCreation").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                if (AreaValidation()) {
                    $.ajax({
                        type: "POST",
                        url: Url,
                        data: "{'AreaDataArray':'" + escape($.param($scope.AreaModel)) + "'}",
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (data) {
                            if (data == "Success") {
                                alert("Area Updated Successfully");
                                $('#edit_area').modal('close');
                                EmptyAreaModel();
                                GetAllAreas();
                                $scope.$apply();
                            }
                            else {
                                alert("AreaName with Module Already Exists.");
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
    }



    $scope.AddAreaClick = function () {
        EmptyAreaModel();
    }

    $scope.sortBy = function (propertyName) {
        $scope.sortorder = ($scope.sortpropertyName === propertyName) ? !$scope.sortorder : false;
        $scope.sortpropertyName = propertyName;
    };

    $scope.GetModulesBasedOnProductID = function (ProductID) {
        GetAllModules();
        $scope.ModuleListModel = [];
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

