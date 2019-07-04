
var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("GetProductsController", function ($scope) {

    $scope.ProductsListModel = [];
    $scope.ProductModel = {
        'ProductID': '',
        'ProductName': '',
        'ProductDescription': '',
        'Status': '',
        'CreatedOn': '',
        'CreatedBy': '',
        'UpdatedOn': '',
        'UpdatedBy': ''
    };

    CheckSession();
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

        var list_Url = $("#GetAllProducts").val();
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
                        $scope.sortpropertyName = 'ProductName';
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

    $scope.InsertProductClick = function () {
        var createProductUrl = $("#InsertProduct").val();
        if (createProductUrl != undefined) {
            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                if (ProductValidation()) {
                    $.ajax({
                        type: "POST",
                        url: createProductUrl,
                        data: "{'ProductDataArray':'" + escape($.param($scope.ProductModel)) + "'}",
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (data) {
                            if (data == "Success") {
                                alert("Product Saved Successfully");
                                $('#addnew_product').modal('close');
                                $('#edit_product').modal('close');
                                GetAllProducts();
                                ModelEmpty();

                            }
                            else if (data == "Failed") {
                                alert("Product Already Exist");
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

    function ProductValidation() {

        var productFlag = true;
        var productName = $scope.ProductModel.ProductName;

        if (productName == "" || productName == null || productName == undefined) {
            alert("Please Enter Product Name");
            productFlag = false;
            return productFlag;
        }

        return productFlag;

    }

    $scope.EditProductByID = function (index, products) {
        $scope.ProductModel.ProductID = products.ProductID;
        $scope.ProductModel.ProductName = products.ProductName;
        $scope.ProductModel.ProductDescription = products.ProductDescription;
        if (products.Status == 1) {
            $scope.ProductModel.Status = true;
        }
        else {
            $scope.ProductModel.Status = false;
        }
    }

    function ModelEmpty() {
        $scope.ProductModel.ProductID = "";
        $scope.ProductModel.ProductName = "";
        $scope.ProductModel.ProductDescription = "";
        $scope.ProductModel.Status = "";
    }

    $scope.CancelClick = function () {
        ModelEmpty();
    };

    $scope.AddNewProductClick = function () {
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
