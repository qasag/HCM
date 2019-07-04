var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("GetWorkStreamController", function ($scope) {

    $scope.ProductsListModel = [];
    $scope.WorkStreamListModel = [];
    $scope.ModulesListModel = [];


    $scope.WorkStreamModel = {
        'WorkStreamID': '',
        'ModuleID': '',
        'WorkStreamName': '',
        'WorkStreamDescription': '',
        'Status': '',
        'CreatedOn': '',
        'CreatedBy': '',
        'UpdatedOn': '',
        'UpdatedBy': '',
        'ProductID':''
    };

    CheckSession();
    GetAllWorkStreams();
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

    function GetAllWorkStreams() {

        var list_Url = $("#GetAllWorkStreams").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.WorkStreamListModel = data;
                        $scope.sortpropertyName = 'WorkStreamName';
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

    function GetModule() {
        var list_Url = $("#GetModulesByProductID").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{'ProductID':'" +$scope.WorkStreamModel.ProductID + "'}",
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

    $scope.SaveWorkStream = function () {
        var workStreamUrl = $("#WorkStreamInsertion").val();
        if (workStreamUrl != undefined) {
            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                if (WorkStreamValidation()) {

                    $.ajax({
                        type: "POST",
                        url: workStreamUrl,
                        data: "{'WorkStreamDataArray':'" + escape($.param($scope.WorkStreamModel)) + "'}",
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (data) {
                            if (data == "Success") {
                                alert("WorkStream  Saved Successfully");
                                $('#addnew_workstream').modal('close');
                                $('#edit_workstream').modal('close');
                                GetAllWorkStreams();
                                ModelEmpty();
                            }
                            else if (data == "Failed") {
                                alert("WorkStream Name Already Exist");
                                return false;
                            }
                            $scope.$apply();
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

    function WorkStreamValidation() {

        var workStreamFlag = true;
        var moduleName = $scope.WorkStreamModel.ModuleID;
        var workStreamName = $scope.WorkStreamModel.WorkStreamName;
        var productID = $scope.WorkStreamModel.ProductID;

        if (productID == "" || productID == null || productID == undefined) {
            alert("Please Choose Product");
            workStreamFlag = false;
            return workStreamFlag;
        }

        if (moduleName == "" || moduleName == null || moduleName == undefined) {
            alert("Please Choose Module");
            workStreamFlag = false;
            return workStreamFlag;
        }

        if (workStreamName == "" || workStreamName == null || workStreamName == undefined) {
            alert("Please Enter Work Stream Name");
            workStreamFlag = false;
            return workStreamFlag;
        }
        return workStreamFlag;
    }

    $scope.EditWorkStreamByID = function (index, workStream) {
        var productID = workStream.Product.ProductID;
        $scope.WorkStreamModel.WorkStreamID = workStream.WorkStreamID
        $scope.WorkStreamModel.ProductID = workStream.Product.ProductID;
        $scope.WorkStreamModel.ModuleID = workStream.Module.ModuleID;
        GetModule(productID);
        $scope.WorkStreamModel.WorkStreamName = workStream.WorkStreamName;
        $scope.WorkStreamModel.WorkStreamDescription = workStream.WorkStreamDescription;
        if (workStream.Status == 1) {
            $scope.WorkStreamModel.Status = true;
        }
        else {
            $scope.WorkStreamModel.Status = false;
        }
    }

    function ModelEmpty() {
        $scope.WorkStreamModel.ProductID = "";
        $scope.WorkStreamModel.WorkStreamID = "";
        $scope.WorkStreamModel.ModuleID = null;
        $scope.WorkStreamModel.WorkStreamName = "";
        $scope.WorkStreamModel.WorkStreamDescription = "";
        $scope.WorkStreamModel.Status = "";
        $scope.ModulesListModel = [];
    }

    $scope.CancelClick = function () {
        ModelEmpty();
    };

    $scope.AddNewClick = function () {
        ModelEmpty();
    };

    $scope.sortBy = function (propertyName) {
        $scope.sortorder = ($scope.sortpropertyName === propertyName) ? !$scope.sortorder : false;
        $scope.sortpropertyName = propertyName;
    };

    $scope.GetModulesBasedOnProductID = function (ProductID) {
        GetModule();
        $scope.ModulesListModel = [];
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
                        // window.location.href = $("#DashboardIndex").val();
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

