var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("ProjectCostController", function ($scope) {

    $scope.FinancialProjectCostListModel = [];
    $scope.FinancialProjectCostListSummaryModel = [];

    $scope.PC_PrjectCostChartModel = [];
    $scope.PC_ProjectCostAreaModel = [];
    $scope.PC_ProjectManagementModel = [];
    $scope.PC_ChangeManagementModel = [];
    $scope.PC_BusinessAnalystModel = [];
    $scope.PC_ConfigurationModel = [];
    $scope.PC_TestingModel = [];
    $scope.PC_TrainingModel = [];

    CheckSession();
    GetDashBoardFinancialProjectCost();
    GetProjectCost_ChartData();

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

    function GetDashBoardFinancialProjectCost() {

        var list_Url = $("#GetDashBoardFinancialProjectCost").val();
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

                        $scope.FinancialProjectCostListModel = data.slice(0, data.length - 1);
                        $scope.FinancialProjectCostListSummaryModel = data.slice(data.length - 1, data.length);

                        $scope.sortpropertyNamePC = "Module.ModuleName";
                        $scope.sortorderPC = false;

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

    $scope.sortByPC = function (propertyName) {
        $scope.sortorderPC = ($scope.sortpropertyNamePC === propertyName) ? !$scope.sortorderPC : false;
        $scope.sortpropertyNamePC = propertyName;
    };

    function GetProjectCost_ChartData() {

        var list_Url = $("#GetDashBoardFinancialProjectCost").val();
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
                        debugger;

                        $scope.PC_PrjectCostChartModel = data.slice(0, data.length - 1);

                        if ($scope.PC_PrjectCostChartModel.length > 0) {

                            for (var i = 0; i < $scope.PC_PrjectCostChartModel.length; i++) {

                                $scope.PC_ProjectCostAreaModel.push($scope.PC_PrjectCostChartModel[i].Area.AreaName);
                                $scope.PC_ProjectManagementModel.push($scope.PC_PrjectCostChartModel[i].ProjectManagement);
                                $scope.PC_ChangeManagementModel.push($scope.PC_PrjectCostChartModel[i].ChangeManagement);
                                $scope.PC_BusinessAnalystModel.push($scope.PC_PrjectCostChartModel[i].BusinessAnalyst);
                                $scope.PC_ConfigurationModel.push($scope.PC_PrjectCostChartModel[i].Configuration);
                                $scope.PC_TestingModel.push($scope.PC_PrjectCostChartModel[i].Testing);
                                $scope.PC_TrainingModel.push($scope.PC_PrjectCostChartModel[i].Training);
                            }
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
    }

    Highcharts.chart('ProjectCost', {

        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: $scope.PC_ProjectCostAreaModel
        },
        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>'
            }
        },
        series: [{
            name: 'Project Management',
            data: $scope.PC_ProjectManagementModel
        }, {
            name: 'Change Management',
            data: $scope.PC_ChangeManagementModel
        }, {
            name: 'Business Analyst',
            data: $scope.PC_BusinessAnalystModel
        }, {
            name: 'Configuration',
            data: $scope.PC_ConfigurationModel

        }, {
            name: 'Testing',
            data: $scope.PC_TestingModel

        }, {
            name: 'Training',
            data: $scope.PC_TrainingModel

        }]

    });

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