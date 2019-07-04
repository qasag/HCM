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

HCMWebApp.controller("GetFinancialConfigController", function ($scope) {

    $scope.FinancialConfigListModel = [];
    $scope.ProductsListModel = [];
    $scope.ModuleListModel = [];
    $scope.WorkStreamListModel = [];
    $scope.AreaListModel = [];

    $scope.FinancialConfigModel = {
        'FinancialConfigurationID': '',
        'ProductID':'',
        'ModuleID': '',
        'ModuleName': '',
        'WorkStreamID': '',
        'WorkStreamName': '',
        'AreaID': '',
        'AreaName': '',
        'Questions': '',
        'BusinessAnalyst': '',
        'Configuration': '',
        'Testing': '',
        'Training': '',
        'ProductName':''
    };

    CheckSession();
    GetAllFinancialConfigurations();
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

    function GetAllModules() {

        var Url = $("#GetModulesByProductID").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{'ProductID':'" + $scope.FinancialConfigModel.ProductID + "'}",
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

    function GetWorkStreamByModuleID(ModuleID) {
        var list_Url = $("#GetWorkStreamByModuleID").val();
        if (list_Url != undefined && ModuleID != "" && ModuleID != null && ModuleID != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{'ModuleID':'" + ModuleID + "'}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.WorkStreamListModel = data;
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

    function GetAreaByModuleID(ModuleID) {
        var list_Url = $("#GetAreaByModuleID").val();
        if (list_Url != undefined && ModuleID != undefined && ModuleID != "" && ModuleID != null) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{'ModuleID':" + ModuleID + "}",
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
    }


    function GetAllFinancialConfigurations() {

        var List_Url = $("#GetAllFinancialConfigs").val();
        if (List_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: List_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.FinancialConfigListModel = data;
                        $scope.sortpropertyName = 'Module.ModuleName';
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

    $scope.EditFinancialConfig = function (index, FincalConfig_Obj) {

        if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

            $scope.FinancialConfigModel.FinancialConfigurationID = FincalConfig_Obj.FinancialConfigurationID;
            $scope.FinancialConfigModel.ProductID = FincalConfig_Obj.Product.ProductID;
            $scope.FinancialConfigModel.ProductName = FincalConfig_Obj.Product.ProductName.toString();
            $scope.FinancialConfigModel.ModuleID = FincalConfig_Obj.Module.ModuleID;
            $scope.FinancialConfigModel.ModuleName = FincalConfig_Obj.Module.ModuleName;

            $scope.FinancialConfigModel.WorkStreamID = FincalConfig_Obj.WorkStream.WorkStreamID;
            $scope.FinancialConfigModel.WorkStreamName = FincalConfig_Obj.WorkStream.WorkStreamName;

            $scope.FinancialConfigModel.AreaID = FincalConfig_Obj.Area.AreaID;
            $scope.FinancialConfigModel.AreaName = FincalConfig_Obj.Area.AreaName;

            $scope.FinancialConfigModel.Questions = FincalConfig_Obj.Questions;

            $scope.FinancialConfigModel.BusinessAnalyst = FincalConfig_Obj.BusinessAnalyst;
            $scope.FinancialConfigModel.Configuration = FincalConfig_Obj.Configuration;

            $scope.FinancialConfigModel.Testing = FincalConfig_Obj.Testing;
            $scope.FinancialConfigModel.Training = FincalConfig_Obj.Training;

        }
        else {
            window.location.href = $("#Logout").val();
        }
    };

    $scope.FincalConfigCancelClick = function () {
        EmptyFincalConfigModel();
    };

    function EmptyFincalConfigModel() {
        $scope.FinancialConfigModel.FinancialConfigurationID = "";
        $scope.FinancialConfigModel.ProductID = "";
        $scope.FinancialConfigModel.ModuleID = "";
        $scope.FinancialConfigModel.ModuleName = "";
        $scope.FinancialConfigModel.WorkStreamID = "";
        $scope.FinancialConfigModel.WorkStreamName = "";
        $scope.FinancialConfigModel.AreaID = "";
        $scope.FinancialConfigModel.AreaName = "";
        $scope.FinancialConfigModel.Questions = "";
        $scope.FinancialConfigModel.BusinessAnalyst = "";
        $scope.FinancialConfigModel.Configuration = "";
        $scope.FinancialConfigModel.Testing = "";
        $scope.FinancialConfigModel.Training = "";
        $scope.ModuleListModel = [];
        $scope.WorkStreamListModel = [];
        $scope.AreaListModel = [];

    }

    $scope.UpdateFincalConfigClick = function () {

        var Updt_Url = $("#InsertFincalConfig").val();
        if (Updt_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (ValidateFincalConfig()) {

                    $.ajax({
                        type: "POST",
                        url: Updt_Url,
                        data: "{'FincalConfigDataArray':'" + escape($.param($scope.FinancialConfigModel)) + "'}",
                        contentType: "application/json;",
                        dataType: "json",
                        async: false,
                        success: function (data) {

                            if (data == "Success") {
                                alert("Financial Configuration Saved Successfully");
                                $("#add_FincalConfig").modal('close');
                                $("#Edit_FincalConfig").modal('close');
                                GetAllFinancialConfigurations();
                                EmptyFincalConfigModel();


                            }
                            else {
                                alert("Alerady Exist This Combination");
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
            else {
                window.location.href = $("#Logout").val();
            }
        }

    };

    function ValidateFincalConfig() {

        var FincalConfig_Flag = true;

        var ProductID = $scope.FinancialConfigModel.ProductID;
        var ModuleID = $scope.FinancialConfigModel.ModuleID;
        var AreaID = $scope.FinancialConfigModel.AreaID;
        var BusinessAnalyst = $scope.FinancialConfigModel.BusinessAnalyst;
        var Configuration = $scope.FinancialConfigModel.Configuration;
        var Testing = $scope.FinancialConfigModel.Testing;
        var Training = $scope.FinancialConfigModel.Training;
        
        if (ProductID == "" || ProductID == null || ProductID == undefined) {
            alert("Please Select Product");
            FincalConfig_Flag = false;
            return FincalConfig_Flag;
        }

        if (ModuleID == "" || ModuleID == null || ModuleID == undefined) {
            alert("Please Select Module");
            FincalConfig_Flag = false;
            return FincalConfig_Flag;
        }

        if (AreaID == "" || AreaID == null || AreaID == undefined) {
            alert("Please Select Area");
            FincalConfig_Flag = false;
            return FincalConfig_Flag;
        }


        if (BusinessAnalyst == "" || BusinessAnalyst == null || BusinessAnalyst == undefined || BusinessAnalyst == 0 || isNaN(BusinessAnalyst)) {
            alert("Please Enter Business Analyst");
            FincalConfig_Flag = false;
            return FincalConfig_Flag;
        }

        if (Configuration == "" || Configuration == null || Configuration == undefined || Configuration == 0 || isNaN(Configuration)) {
            alert("Please Enter Configuration");
            FincalConfig_Flag = false;
            return FincalConfig_Flag;
        }

        if (Testing == "" || Testing == null || Testing == undefined || Testing == 0 || isNaN(Testing)) {
            alert("Please Enter Testing");
            FincalConfig_Flag = false;
            return FincalConfig_Flag;
        }

        if (Training == "" || Training == null || Training == undefined || Training == 0 || isNaN(Training)) {
            alert("Please Enter Training");
            FincalConfig_Flag = false;
            return FincalConfig_Flag;
        }

        return FincalConfig_Flag;

    };

    $scope.GetModulesBasedOnProductID = function (ProductID) {

        GetAllModules();
    }

    $scope.GetWorkStreamAndAreaByModuleID = function (ModuleID) {
        $scope.WorkStreamListModel = [];
        $scope.AreaListModel = [];

        if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
            if (ModuleID != "" || ModuleID != null || ModuleID != undefined) {
                GetWorkStreamByModuleID(ModuleID);
                GetAreaByModuleID(ModuleID);
            }
        }
        else {
            window.location.href = $("#Logout").val();
        }
    };

    $scope.AddNewFinancialConfigurationClick = function () {
        EmptyFincalConfigModel();
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
