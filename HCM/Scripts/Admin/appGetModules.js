var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("GetModulesController", function ($scope) {

    $scope.ModuleListModel = [];
    $scope.ProductsListModel = [];
    $scope.ModuleModel = {
        'ProductID':'',
        'ModuleID': '',
        'ModuleName': '',
        'ModuleDescription': '',
        'Status': '',
        'CreatedOn': '',
        'CreatedBy': '',
        'UpdatedOn': '',
        'UpdatedBy': ''
    };

    CheckSession();
    GetAllProducts();
    GetAllModules();

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

    function GetAllModules() {

        var list_Url = $("#GetAllModules").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.ModuleListModel = data;
                        $scope.sortpropertyName = 'ModuleName';
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

    $scope.InsertModuleClick = function () {
        var createModuleUrl = $("#InsertModule").val();
        if (createModuleUrl != undefined) {
            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                if (ModuleValidation()) {
                    $.ajax({
                        type: "POST",
                        url: createModuleUrl,
                        data: "{'ModuleDataArray':'" + escape($.param($scope.ModuleModel)) + "'}",
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (data) {
                            if (data == "Success") {
                                alert("Module Saved Successfully");
                                $('#addnew_module').modal('close');
                                $('#edit_module').modal('close');
                                GetAllModules();
                                ModelEmpty();

                            }
                            else if (data == "Failed") {
                                alert("Module Already Exist");
                                return false;
                            }
                        },
                        error: function (data) {
                            alert(data.responseText);
                            return false;
                        }

                    });
                }
            }
        }
        else {
            window.location.href = $("#Logout").val();
        }
    };

    function ModuleValidation() {

        var moduleFlag = true;
        var productID = $scope.ModuleModel.ProductID;
        var moduleName = $scope.ModuleModel.ModuleName;
        
        if (productID == "" || productID == null || productID == undefined) {
            alert("Please Select Product");
            moduleFlag = false;
            return moduleFlag;
        }

        if (moduleName == "" || moduleName == null || moduleName == undefined) {
            alert("Please Enter Module Name");
            moduleFlag = false;
            return moduleFlag;
        }

        return moduleFlag;

    }

    $scope.EditModuleByID = function (index, module) {
        $scope.ModuleModel.ProductID = module.Product.ProductID;
        $scope.ModuleModel.ModuleID = module.ModuleID;
        $scope.ModuleModel.ModuleName = module.ModuleName;
        $scope.ModuleModel.ModuleDescription = module.ModuleDescription;
        if (module.Status == 1) {
            $scope.ModuleModel.Status = true;
        }
        else {
            $scope.ModuleModel.Status = false;
        }
    }

    function ModelEmpty() {
        $scope.ModuleModel.ProductID = "";
        $scope.ModuleModel.ModuleID = "";
        $scope.ModuleModel.ModuleName = "";
        $scope.ModuleModel.ModuleDescription = "";
        $scope.ModuleModel.Status = "";
    }

    $scope.CancelClick = function () {
        ModelEmpty();
    };

    $scope.AddNewUserClick = function () {
        ModelEmpty();
    }

    $scope.sortBy = function (propertyName) {
        $scope.sortorder = ($scope.sortpropertyName === propertyName) ? !$scope.sortorder : false;
        $scope.sortpropertyName = propertyName;
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
