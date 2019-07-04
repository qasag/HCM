var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("DashBoardController", function ($scope) {

    $scope.DashBoardDataListModel = [];
    $scope.OverallRiskScoreListModel = [];
    $scope.BusinessData = [];
    $scope.TechnologyData = [];

    $scope.OverallRiskScoreModel = {
        'ResponseType': '',
        'RiskFactor': '',
        'OverallRiskScoreInnerDataModel': []
    }
    $scope.RiskFactorModel = {};

    $scope.DashBoardInnerDataModel = {
        'ResponseType': '',
        'Module': '',
        'DashBoardInnerDataListModel': []
    }

    $scope.DashBoardModel = {};
    $scope.SecurityGuageData = [];
    $scope.AuditGuageData = [];
    $scope.ComplianceGuageData = [];
    $scope.OperationalGuageData = [];

    CheckSession();
    GetDashBoardData();
    GetOverallRiskScoreData();
    GetRiskFactorGuageData();

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

    function GetDashBoardData() {

        var list_Url = $("#GetDashBoardData").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    async: false,
                    success: function (data) {

                        $scope.DashBoardDataListModel = data;

                        if (data.length > 0) {
                            for (var i = 0; i < data.length; i++) {

                                $scope.DashBoardDataListModel[i].Business = parseFloat(data[i].Business, 10);
                                $scope.DashBoardDataListModel[i].Technology = parseFloat(data[i].Technology, 10);
                            }
                        }

                        $scope.sortpropertyName = "ModuleName";
                        $scope.sortorder = false;

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

    function GetOverallRiskScoreData() {

        var list_Url = $("#GetOverallRiskScoreData").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    async: false,
                    success: function (data) {

                        $scope.OverallRiskScoreModel
                        $scope.OverallRiskScoreListModel = data;

                        if (data.length > 0) {
                            for (var i = 0; i < data.length; i++) {

                                $scope.OverallRiskScoreListModel[i].Business = parseFloat(data[i].Business, 10);
                                $scope.OverallRiskScoreListModel[i].Technology = parseFloat(data[i].Technology, 10);
                            }
                        }

                        angular.forEach(data, function (value, key) {

                            var BusinessRiskdata = {};
                            var TechRiskdata = {};

                            BusinessRiskdata.name = value.RiskFactor;
                            BusinessRiskdata.y = parseFloat(value.Business);
                            BusinessRiskdata.color = value.RiskFactorColor;
                            $scope.BusinessData.push(BusinessRiskdata);

                            TechRiskdata.name = value.RiskFactor;
                            TechRiskdata.y = parseFloat(value.Technology);
                            TechRiskdata.color = value.RiskFactorColor;
                            $scope.TechnologyData.push(TechRiskdata);

                        });

                        $scope.sortpropertyNameRF = "RiskFactor";
                        $scope.sortorderRF = false;

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

    $scope.sortBy = function (propertyName) {
        $scope.sortorder = ($scope.sortpropertyName === propertyName) ? !$scope.sortorder : false;
        $scope.sortpropertyName = propertyName;
    };

    $scope.sortByRiskFactor = function (propertyName) {
        $scope.sortorderRF = ($scope.sortpropertyNameRF === propertyName) ? !$scope.sortorderRF : false;
        $scope.sortpropertyNameRF = propertyName;
    };

    function GetOverallRiskScoreInnerData(UserType, RiskFactor) {

        var list_Url = $("#GetOverallRiskScoreInnerData").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $scope.OverallRiskScoreInnerDataModel = [];

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{'UserType':'" + UserType + "', 'RiskFactor':'" + RiskFactor + "'}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {

                        $("#RiskFactorModalPopUp").modal('open');
                        $scope.OverallRiskScoreModel.ResponseType = UserType;
                        $scope.OverallRiskScoreModel.RiskFactor = RiskFactor;
                        $scope.OverallRiskScoreModel.OverallRiskScoreInnerDataModel = data;
                        $scope.sortpropertyName = 'Questions';
                        $scope.sortorder = false;
                        $scope.RiskFactorModel.UserType = UserType;
                        $scope.RiskFactorModel.ResponseType = RiskFactor;
                        $scope.$apply();
                    },error: function (data) {
                        alert(data.responseText);
                    }
                });
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    }

    $(function () {

        var options = {
            series: [{
                type: 'pie',
                name: 'Business',
                data: $scope.BusinessData,
                center: [150, 50],
                size: 150,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }, {
                type: 'pie',
                name: 'Technology',
                data: $scope.TechnologyData,
                center: [370, 50],
                size: 150,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }],
            tooltip: {
                valueSuffix: '',
                formatter: function () {
                    return '<span><b>' + this.series.name + '</b></span><br/>' +
                    '<span style="color:' + this.color + '">\u25CF</span><span style="margin-left:2px;"><b> ' + this.point.name + ' </span></b><strong>' + this.y + '</strong>';
                    $scope.$apply();
                }
            },
            plotOptions: {
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function () {
                                GetOverallRiskScoreInnerData(this.series.name, this.name);
                            }
                        }
                    }
                }
            }
        };

        $('#container').highcharts(options);
    });

    $scope.DownloadRiskFactorReport = function () {

        var dwnlod_Url = $("#GetRiskFactorExcelFile").val();
        if (dwnlod_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                var UserType = $scope.RiskFactorModel.UserType;
                var ResponseType = $scope.RiskFactorModel.ResponseType;

                window.location.href = dwnlod_Url + "?UserType=" + UserType + '&ResponseType=' + ResponseType;
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    };

    $scope.GetDashBoardInnerData = function (dashBrdModule, dashBoard_Obj) {

        var Url = $("#GetDashBoardInnerData").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $scope.DashBoardInnerDataListModel = [];

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{'ModuleID':'" + dashBrdModule.ModuleID + "','UserType':'" + dashBoard_Obj + "'}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {

                        $("#DashBoardInnerDataModalPopUp").modal('open');

                        $scope.DashBoardInnerDataModel.ResponseType = dashBoard_Obj;
                        $scope.DashBoardInnerDataModel.Module = dashBrdModule.ModuleName;
                        $scope.DashBoardInnerDataModel.DashBoardInnerDataListModel = data;
                        $scope.sortpropertyName = 'Questions';
                        $scope.sortorder = false;
                        $scope.DashBoardModel.ModuleID = dashBrdModule.ModuleID;
                        $scope.DashBoardModel.ResponseType = dashBoard_Obj;
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

    $scope.DownloadDashBoardDataReport = function () {

        var dwnlod_Url = $("#GetDashBoardDataInExcelFile").val();
        if (dwnlod_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                var ModuleID = $scope.DashBoardModel.ModuleID;
                var ResponseType = $scope.DashBoardModel.ResponseType;

                window.location.href = dwnlod_Url + "?ModuleID=" + ModuleID + '&ResponseType=' + ResponseType;
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    };

    function GetRiskFactorGuageData() {
       
        var Url = $("#GetRiskFactorGuageData").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    async: false,
                    success: function (data) {

                        if (data.length > 0) {

                            $scope.SecurityGuageData.push(parseFloat(data[0].Security));
                            $scope.AuditGuageData.push(parseFloat(data[0].Audit));
                            $scope.ComplianceGuageData.push(parseFloat(data[0].Compliance));
                            $scope.OperationalGuageData.push(parseFloat(data[0].Operational));
                        }

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

    $(function () {

        var AuditOptions = {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                renderTo: 'AuditGuage',
                marginTop: 25,
                marginBottom: 0
            },

            title: {
                text: 'Audit',
                margin:0
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 5,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 1,
                    color: '#4aa02e', // dark Green
                    events: {
                        mouseover: function (e) {
                            AuditChart.tooltip.refresh(AuditChart.series[1].points[2]);
                        }
                    }
                },
                {
                    from: 1,
                    to: 2,
                    color: '#55BF3B', // green
                    events: {
                        mouseover: function (e) {
                            AuditChart.tooltip.refresh(AuditChart.series[2].points[2]);
                        }
                    }
                }, {
                    from: 2,
                    to: 3,
                    color: '#DDDF0D', // yellow
                    events: {
                        mouseover: function (e) {
                            AuditChart.tooltip.refresh(AuditChart.series[3].points[2]);
                        }
                    }
                }, {
                    from: 3,
                    to: 4,
                    color: '#e57575', // red
                    events: {
                        mouseover: function (e) {
                            AuditChart.tooltip.refresh(AuditChart.series[4].points[2]);
                        }
                    }
                }, {
                    from: 4,
                    to: 5,
                    color: 'Red', // red
                    events: {
                        mouseover: function (e) {
                            AuditChart.tooltip.refresh(AuditChart.series[5].points[2]);
                        }
                    }
                }],
            },
            tooltip: {
                formatter: function () {
                    if (this.series.name == "Audit")
                        return 'Audit : ' + this.y;
                    else
                        return this.series.name;
                }
            },

            series: [{
                name: 'Audit',
                data: $scope.AuditGuageData,
                tooltip: {
                    valueSuffix: ''
                }
            },
            {
                name: "No Risk",
                visible: false,
                color: '#4aa02e',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Minor",
                visible: false,
                color: '#55BF3B',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Moderate",
                visible: false,
                color: '#DDDF0D',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Serious",
                visible: false,
                color: '#e57575',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "High Level",
                visible: false,
                color: 'Red',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            }]
        }

        //$('#AuditGuage').highcharts(AuditOptions);
        var AuditChart = new Highcharts.Chart(AuditOptions);


        var SecurityOptions = {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                renderTo: 'SecurityGuage',
                marginTop: 25,
                marginBottom: 0
            },

            title: {
                text: 'Security',
                margin: 0
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 5,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 1,
                    color: '#4aa02e', // dark Green
                    events: {
                        mouseover: function (e) {
                            SecurityChart.tooltip.refresh(SecurityChart.series[1].points[2]);
                        }
                    }
                },
                {
                    from: 1,
                    to: 2,
                    color: '#55BF3B', // green
                    events: {
                        mouseover: function (e) {
                            SecurityChart.tooltip.refresh(SecurityChart.series[2].points[2]);
                        }
                    }
                },
                {
                    from: 2,
                    to: 3,
                    color: '#DDDF0D', // yellow
                    events: {
                        mouseover: function (e) {
                            SecurityChart.tooltip.refresh(SecurityChart.series[3].points[2]);
                        }
                    }
                }, {
                    from: 3,
                    to: 4,
                    color: '#e57575', // light red
                    events: {
                        mouseover: function (e) {
                            SecurityChart.tooltip.refresh(SecurityChart.series[4].points[2]);
                        }
                    }
                }, {
                    from: 4,
                    to: 5,
                    color: 'Red', // red
                    events: {
                        mouseover: function (e) {
                            SecurityChart.tooltip.refresh(SecurityChart.series[5].points[2]);
                        }
                    }
                }]
            },

            tooltip: {
                formatter: function () {
                    if (this.series.name == "Security")
                        return 'Security : ' + this.y;
                    else
                        return this.series.name;
                }
            },

            series: [{
                name: 'Security',
                data: $scope.SecurityGuageData,
                tooltip: {
                    valueSuffix: ''
                }
            },
            {
                name: "No Risk",
                visible: false,
                color: '#4aa02e',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Minor",
                visible: false,
                color: '#55BF3B',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Moderate",
                visible: false,
                color: '#DDDF0D',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Serious",
                visible: false,
                color: '#e57575',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "High Level",
                visible: false,
                color: 'Red',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            }]
        }

        var SecurityChart = new Highcharts.Chart(SecurityOptions);
        // $('#SecurityGuage').highcharts(SecurityOptions);


        var ComplianceOptions = {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                renderTo: 'ComplianceGuage',
                marginTop: 25,
                marginBottom:0
            },

            title: {
                text: 'Compliance',
                margin: 0
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 5,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 1,
                    color: '#4aa02e', // dark green
                    events: {
                        mouseover: function (e) {
                            ComplianceChart.tooltip.refresh(ComplianceChart.series[1].points[2]);
                        }
                    }
                },
                {
                    from: 1,
                    to: 2,
                    color: '#55BF3B', // green
                    events: {
                        mouseover: function (e) {
                            ComplianceChart.tooltip.refresh(ComplianceChart.series[2].points[2]);
                        }
                    }
                },
                {
                    from: 2,
                    to: 3,
                    color: '#DDDF0D', // yellow
                    events: {
                        mouseover: function (e) {
                            ComplianceChart.tooltip.refresh(ComplianceChart.series[3].points[2]);
                        }
                    }
                }, {
                    from: 3,
                    to: 4,
                    color: '#e57575', // light red
                    events: {
                        mouseover: function (e) {
                            ComplianceChart.tooltip.refresh(ComplianceChart.series[4].points[2]);
                        }
                    }
                }, {
                    from: 4,
                    to: 5,
                    color: 'Red', // red
                    events: {
                        mouseover: function (e) {
                            ComplianceChart.tooltip.refresh(ComplianceChart.series[5].points[2]);
                        }
                    }
                }]
            },

            tooltip: {
                formatter: function () {
                    if (this.series.name == "Compliance")
                        return 'Compliance : ' + this.y;
                    else
                        return this.series.name;
                }
            },

            series: [{
                name: 'Compliance',
                data: $scope.ComplianceGuageData,
                tooltip: {
                    valueSuffix: ''
                }
            },
            {
                name: "No Risk",
                visible: false,
                color: '#4aa02e',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Minor",
                visible: false,
                color: '#55BF3B',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Moderate",
                visible: false,
                color: '#DDDF0D',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Serious",
                visible: false,
                color: '#e57575',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "High Level",
                visible: false,
                color: 'Red',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            }]
        }

        var ComplianceChart = new Highcharts.Chart(ComplianceOptions);
        // $('#ComplianceGuage').highcharts(ComplianceOptions);


        var OperationalOptions = {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                renderTo: 'OperationalGuage',
                marginTop: 25,
                marginBottom: 0
            },

            title: {
                text: 'Operational',
                margin: 0
            },

            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: '#DDD',
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 5,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: ''
                },
                plotBands: [{
                    from: 0,
                    to: 1,
                    color: '#4aa02e', // dark green
                    events: {
                        mouseover: function (e) {
                            OperationalChart.tooltip.refresh(OperationalChart.series[1].points[2]);
                        }
                    }
                },
                {
                    from: 1,
                    to: 2,
                    color: '#55BF3B', // green
                    events: {
                        mouseover: function (e) {
                            OperationalChart.tooltip.refresh(OperationalChart.series[2].points[2]);
                        }
                    }
                },
                {
                    from: 2,
                    to: 3,
                    color: '#DDDF0D', // yellow
                    events: {
                        mouseover: function (e) {
                            OperationalChart.tooltip.refresh(OperationalChart.series[3].points[2]);
                        }
                    }
                }, {
                    from: 3,
                    to: 4,
                    color: '#e57575', // red
                    events: {
                        mouseover: function (e) {
                            OperationalChart.tooltip.refresh(OperationalChart.series[4].points[2]);
                        }
                    }
                }, {
                    from: 4,
                    to: 5,
                    color: 'Red', // red
                    events: {
                        mouseover: function (e) {
                            OperationalChart.tooltip.refresh(OperationalChart.series[5].points[2]);
                        }
                    }
                }]
            },

            tooltip: {
                formatter: function () {
                    if (this.series.name == "Operational")
                        return 'Operational : ' + this.y;
                    else
                        return this.series.name;
                }
            },

            series: [{
                name: 'Operational',
                data: $scope.OperationalGuageData,
                tooltip: {
                    valueSuffix: ''
                }
            },
             {
                 name: "No Risk",
                 visible: false,
                 color: '#4aa02e',
                 data: [0, 0, 0, 0, 0, 0, 0, 0]
             },
            {
                name: "Minor",
                visible: false,
                color: '#55BF3B',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Moderate",
                visible: false,
                color: '#DDDF0D',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "Serious",
                visible: false,
                color: '#e57575',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: "High Level",
                visible: false,
                color: 'Red',
                data: [0, 0, 0, 0, 0, 0, 0, 0]
            }]
        }

        var OperationalChart = new Highcharts.Chart(OperationalOptions);
        // $('#OperationalGuage').highcharts(OperationalOptions);


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


