var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("PrjectSummaryController", function ($scope) {

    $scope.ProjectSummaryListModel = [];
    $scope.ProjectInitiationModel = [];
    $scope.RequirementGatheringModel = [];
    $scope.DevelopmentModel = [];
    $scope.TestingModel = [];
    $scope.TrainingModel = [];
    $scope.RolloutModel = [];

    $scope.ProjectPhase_HorizontalModel = [];
    $scope.Week_HorizontalModel = [];
    $scope.Hours_HorizontalModel = [];
    $scope.FTE_HorizontalModel = [];
    $scope.DurationInMonths_HorizontalModel = [];
    $scope.PeopleByPhases_HorizontalModel = [];

    CheckSession();
    GetProjectSummaryData();
    GetProjectSummary_Chart_Data();

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

    function GetProjectSummaryData() {

        var Sumry_Url = $("#GetProjectSummaryData").val();
        if (Sumry_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Sumry_Url,
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        $scope.ProjectSummaryListModel = data;
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

    function GetProjectSummary_Chart_Data() {

        var Sumry_Url = $("#GetProjectSummaryData").val();
        if (Sumry_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Sumry_Url,
                    data: "{}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        debugger;

                        if (data.length > 0) {

                            $scope.ProjectPhase_HorizontalModel.push(data[0].ProjectInitiation);
                            $scope.ProjectPhase_HorizontalModel.push(data[0].RequirementGathering);
                            $scope.ProjectPhase_HorizontalModel.push(data[0].Development);
                            $scope.ProjectPhase_HorizontalModel.push(data[0].Testing);
                            $scope.ProjectPhase_HorizontalModel.push(data[0].Training);
                            $scope.ProjectPhase_HorizontalModel.push(data[0].RollOut);

                            $scope.Week_HorizontalModel.push(data[1].ProjectInitiation);
                            $scope.Week_HorizontalModel.push(data[1].RequirementGathering);
                            $scope.Week_HorizontalModel.push(data[1].Development);
                            $scope.Week_HorizontalModel.push(data[1].Testing);
                            $scope.Week_HorizontalModel.push(data[1].Training);
                            $scope.Week_HorizontalModel.push(data[1].RollOut);

                            $scope.Hours_HorizontalModel.push(data[2].ProjectInitiation);
                            $scope.Hours_HorizontalModel.push(data[2].RequirementGathering);
                            $scope.Hours_HorizontalModel.push(data[2].Development);
                            $scope.Hours_HorizontalModel.push(data[2].Testing);
                            $scope.Hours_HorizontalModel.push(data[2].Training);
                            $scope.Hours_HorizontalModel.push(data[2].RollOut);

                            $scope.FTE_HorizontalModel.push(data[3].ProjectInitiation);
                            $scope.FTE_HorizontalModel.push(data[3].RequirementGathering);
                            $scope.FTE_HorizontalModel.push(data[3].Development);
                            $scope.FTE_HorizontalModel.push(data[3].Testing);
                            $scope.FTE_HorizontalModel.push(data[3].Training);
                            $scope.FTE_HorizontalModel.push(data[3].RollOut);

                            $scope.DurationInMonths_HorizontalModel.push(data[4].ProjectInitiation);
                            $scope.DurationInMonths_HorizontalModel.push(data[4].RequirementGathering);
                            $scope.DurationInMonths_HorizontalModel.push(data[4].Development);
                            $scope.DurationInMonths_HorizontalModel.push(data[4].Testing);
                            $scope.DurationInMonths_HorizontalModel.push(data[4].Training);
                            $scope.DurationInMonths_HorizontalModel.push(data[4].RollOut);

                            $scope.PeopleByPhases_HorizontalModel.push(data[5].ProjectInitiation);
                            $scope.PeopleByPhases_HorizontalModel.push(data[5].RequirementGathering);
                            $scope.PeopleByPhases_HorizontalModel.push(data[5].Development);
                            $scope.PeopleByPhases_HorizontalModel.push(data[5].Testing);
                            $scope.PeopleByPhases_HorizontalModel.push(data[5].Training);
                            $scope.PeopleByPhases_HorizontalModel.push(data[5].RollOut);

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

    Highcharts.chart('ProjectSummary', {

        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Project Initiation', 'Requirement Gathering', 'Development', 'Testing', 'Training', 'Rollout']
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
            name: 'Project Phase',
            data: $scope.ProjectPhase_HorizontalModel
        }, {
            name: 'Week',
            data: $scope.Week_HorizontalModel
        }, {
            name: 'Hours',
            data: $scope.Hours_HorizontalModel
        }, {
            name: 'FTE',
            data: $scope.FTE_HorizontalModel
        }, {
            name: 'Duration In Months',
            data: $scope.DurationInMonths_HorizontalModel

        }, {
            name: 'People By Phases',
            data: $scope.PeopleByPhases_HorizontalModel

        }]

    });


    ///////////////----Stacked Chart example-----------/////////////////////////////////////


    //function GetProjectSummary_Chart_Data() {

    //    var Sumry_Url = $("#GetProjectSummaryData").val();
    //    if (Sumry_Url != undefined) {

    //        if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

    //            $.ajax({
    //                type: "POST",
    //                url: Sumry_Url,
    //                data: "{}",
    //                contentType: "application/json; charset=utf-8",
    //                dataType: "json",
    //                async: false,
    //                success: function (data) {

    //                    // $scope.ProjectSummaryListModel = data;
    //                    if (data.length > 0) {
    //                        //  debugger;
    //                        for (var i = 0; i < data.length; i++) {

    //                            $scope.ProjectInitiationModel.push(data[i].ProjectInitiation);
    //                            $scope.RequirementGatheringModel.push(data[i].RequirementGathering);
    //                            $scope.DevelopmentModel.push(data[i].Development);
    //                            $scope.TestingModel.push(data[i].Testing);
    //                            $scope.TrainingModel.push(data[i].Training);
    //                            $scope.RolloutModel.push(data[i].RollOut);
    //                        }
    //                    }
    //                },
    //                error: function (result) {
    //                    alert(result.responseText);
    //                }
    //            });
    //        }
    //        else {
    //            window.location.href = $("#Logout").val();
    //        }
    //    }
    //}




    // ----------------------------------------------------------------------

    //Highcharts.chart('ProjectSummary', {

    //    chart: {
    //        type: 'column'
    //    },
    //    title: {
    //        text: ''
    //    },
    //    xAxis: {
    //        categories: ['Project Phase', 'Week', 'Hours', 'FTE', 'Duration In Months', 'People By Phases']
    //    },
    //    yAxis: {
    //        allowDecimals: false,
    //        min: 0,
    //        title: {
    //            text: ''
    //        }
    //    },
    //    tooltip: {
    //        formatter: function () {
    //            return '<b>' + this.x + '</b><br/>' +
    //                this.series.name + ': ' + this.y + '<br/>'
    //        }
    //    },
    //    plotOptions: {
    //        column: {
    //            stacking: 'normal'
    //        }
    //    },
    //    series: [{
    //        name: 'Project Initiation',
    //        data: $scope.ProjectInitiationModel
    //    }, {
    //        name: 'Requirement Gathering',
    //        data: $scope.RequirementGatheringModel
    //    }, {
    //        name: 'Development',
    //        data: $scope.DevelopmentModel

    //    }, {
    //        name: 'Testing',
    //        data: $scope.TestingModel
    //    }, {
    //        name: 'Training',
    //        data: $scope.TrainingModel

    //    }, {
    //        name: 'Rollout',
    //        data: $scope.RolloutModel

    //    }]
    //});

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