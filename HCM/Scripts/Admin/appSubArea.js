var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("GetSubAreaController", function ($scope) {

    $scope.ProductsListModel = [];
    $scope.SubAreaListModel = [];
    $scope.ModulesListModel = [];
    $scope.AreaListModel = [];
    $scope.SubAreaModel = {
        'ModuleID': '',
        'AreaID': '',
        'SubAreaName': '',
        'SubAreaDescription': '',
        'Status': false,
        'ProductID':''
    };

    CheckSession();
    GetSubAreaList();
    GetAllProducts();
   // GetAllModulesList();

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

    function GetSubAreaList() {

        var Url = $("#GetSubAreaList").val();
        if (Url != undefined) {

            // $("#loadingDiv").show();

            $.ajax({
                type: "POST",
                url: Url,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                async: false,
                success: function (data) {
                    $scope.SubAreaListModel = data;
                    $scope.sortpropertyName = 'SubAreaName';
                    $scope.sortorder = false;
                    //$("#loadingDiv").hide();
                },
                error: function (result) {
                    alert(result.responseText);
                    // $("#loadingDiv").hide();
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

    function GetAllModulesList() {

        var list_Url = $("#GetModulesByProductID").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{'ProductID':'" +$scope.SubAreaModel.ProductID + "'}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {

                        $scope.ModulesListModel = data;
                        $scope.$apply();

                    }, error: function (data) {
                        alert(data.responseText);
                    }
                });
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    }

    $scope.GetAreaByModuleID = function (moduleID) {

        var list_Url = $("#GetAreaByModuleID").val();
        if (list_Url != undefined && moduleID!=undefined && moduleID!=null && moduleID!="") {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $scope.SubAreaModel.AreaID = '';

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{'ModuleID':" + moduleID + "}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {

                        $scope.AreaListModel = data;
                        $scope.$apply();

                    }, error: function (data) {
                        alert(data.responseText);
                    }
                });
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }

    };

    $scope.SubAreaSaveClick = function () {

        var save_Url = $("#InsertAndUpdateSubArea").val();
        if (save_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (ValidateSubArea()) {

                    $.ajax({
                        type: "POST",
                        url: save_Url,
                        data: "{'subAreaDataArray':'" + escape($.param($scope.SubAreaModel)) + "'}",
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (data) {
                            if (data == "Success") {
                                alert("Sub-Area Saved Successfully");
                                EmptySubAreaModel();
                                $("#addnew_subarea").modal('close');
                                $("#Edit_subarea").modal('close');
                                GetSubAreaList();
                                $scope.$apply();
                            }
                        }, error: function (data) {
                            alert(data.responseText);
                        }
                    });
                }
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    };

    $scope.EditSubArea = function (index, SubArea_Obj) {

        if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

            var productID = SubArea_Obj.Product.ProductID;
            $scope.SubAreaModel.ProductID = SubArea_Obj.Product.ProductID;
            GetAllModulesList(productID);
            $scope.SubAreaModel.ModuleID = SubArea_Obj.Area.Module.ModuleID;
            $scope.GetAreaByModuleID(SubArea_Obj.Area.Module.ModuleID);
            $scope.SubAreaModel.AreaID = SubArea_Obj.Area.AreaID;
            $scope.SubAreaModel.SubAreaID = SubArea_Obj.SubAreaID;
            $scope.SubAreaModel.SubAreaName = SubArea_Obj.SubAreaName;
            $scope.SubAreaModel.SubAreaDescription = SubArea_Obj.SubAreaDescription;
            $scope.SubAreaModel.Status = SubArea_Obj.Status
        }
        else {
            window.location.href = $("#Logout").val();
        }
    };

    $scope.SubAreaCancelClick = function () {
        EmptySubAreaModel();
    };

    $scope.AddNewSubAreaClick = function () {
        EmptySubAreaModel();
    };

    function ValidateSubArea() {

        var subarea_flag = true;

        var Module = $scope.SubAreaModel.ModuleID;
        var Area = $scope.SubAreaModel.AreaID;
        var SubAreaName = $scope.SubAreaModel.SubAreaName;
        var Status = $scope.SubAreaModel.Status;
        var ProductID = $scope.SubAreaModel.ProductID;

        if (ProductID == "" || ProductID == null || ProductID == undefined) {
            alert("Please Choose Product");
            subarea_flag = false;
            return subarea_flag;
        }

        if (Module == "" || Module == null || Module == undefined) {
            alert("Please Choose Module");
            subarea_flag = false;
            return subarea_flag;
        }
        if (Area == "" || Area == null || Area == undefined) {
            alert("Please Choose Area");
            subarea_flag = false;
            return subarea_flag;
        }
        if (SubAreaName == "" || SubAreaName == null || SubAreaName == undefined) {
            alert("Please Enter SubArea Name");
            subarea_flag = false;
            return subarea_flag;
        }
        return subarea_flag;
    }

    function EmptySubAreaModel() {
        $scope.SubAreaModel.ModuleID = null;
        $scope.SubAreaModel.AreaID = null;
        $scope.SubAreaModel.SubAreaName = '';
        $scope.SubAreaModel.SubAreaDescription = '';
        $scope.SubAreaModel.Status = false;
        $scope.SubAreaModel.ProductID = '';
        $scope.ModulesListModel = [];
        $scope.AreaListModel = [];
    }

    $scope.sortBy = function (propertyName) {
        $scope.sortorder = ($scope.sortpropertyName === propertyName) ? !$scope.sortorder : false;
        $scope.sortpropertyName = propertyName;
    };

    $scope.GetModulesBasedOnProductID = function (ProductID) {
        GetAllModulesList();
        $scope.ModulesListModel = [];
        $scope.AreaListModel = [];

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

