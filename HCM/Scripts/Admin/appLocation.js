var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("GetLocationsController", function ($scope) {

    $scope.LocationListModel = [];
    $scope.RegionsListModel = [];
    $scope.CountriesListModel = [];

    $scope.LocationModel = {
        'LocationID': '',
        'CountryID':'',
        'RegionID': '',
        'LocationName': '',
        'CountryName': '',
        'RegionCode':'',
        'LocationDescription': '',
        'Status': ''
    }

    CheckSession();
    GetAllLocations();
    GetRegions();


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

    function GetAllLocations() {

        var Url = $("#GetAllLocationsData").val();
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
                        $scope.LocationListModel = data;

                        $scope.sortpropertyName = 'LocationName';
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

    $scope.sortBy = function (propertyName) {
        $scope.sortorder = ($scope.sortpropertyName === propertyName) ? !$scope.sortorder : false;
        $scope.sortpropertyName = propertyName;
    };

    function GetRegions() {

        var Url = $("#GetRegions").val();
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
                        $scope.RegionsListModel = data;
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

    function GetAllCountries(regionID) {

        var Url = $("#GetCountries").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Url,
                    data:"",
                    data: "{'RegionID':'" + regionID + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        $scope.CountriesListModel = data;
                        $scope.$apply();
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

    $scope.InsertAndUpdateLocationClick = function () {

        var save_Url = $("#InsertAndUpdateLocation").val();
        if (save_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (ValidateLocation()) {

                    $.ajax({
                        type: "POST",
                        url: save_Url,
                        data: "{'locationDataArray':'" + escape($.param($scope.LocationModel)) + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            if (data == "Success") {
                                alert("Location Saved Successfully");
                                $("#addnew_location").modal('close');
                                $("#Edit_location").modal('close');                                
                                EmptyLocationModel();
                                GetAllLocations();
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

    function EmptyLocationModel() {
        $scope.LocationModel.RegionID = '';
        $scope.LocationModel.CountryID = '';
        $scope.LocationModel.LocationName = '';
        $scope.LocationModel.LocationDescription = '';
    }

    function ValidateLocation() {

        var location_flag = true;
        var Region = $scope.LocationModel.RegionID;
        var LocationName = $scope.LocationModel.LocationName;
        var countryID = $scope.LocationModel.CountryID;

        if (Region == "" || Region == null || Region == undefined) {
            alert("Please Select Region");
            location_flag = false;
            return location_flag;
        }

        if (countryID == "" || countryID == null || countryID == undefined) {
            alert("Please Select Country");
            location_flag = false;
            return location_flag;
        }

        if (LocationName == "" || LocationName == null || LocationName == undefined) {
            alert("Please Enter Location Name");
            location_flag = false;
            return location_flag;
        }

        return location_flag;
    }

    $scope.EditLocation = function (index, location) {
        
        var regionID = location.Country.Region.RegionID;
        
        if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
            GetAllCountries(regionID);
            $scope.LocationModel.LocationID = location.LocationID;
            $scope.LocationModel.LocationName = location.LocationName;
            $scope.LocationModel.LocationDescription = location.LocationDescription;
            $scope.LocationModel.CountryID = location.Country.CountryID;
            $scope.LocationModel.CountryName = location.Country.CountryName;
            $scope.LocationModel.RegionID = location.Country.Region.RegionID;
            $scope.LocationModel.Status = location.Status;
        }
        else {
            window.location.href = $("#Logout").val();
        }

    };

    $scope.SaveCancelClick = function () {
        EmptyLocationModel();
    };

    $scope.AddNewLocationClick = function () {
        EmptyLocationModel();
    };

    $scope.GetCountryBasedOnRegionID = function () {
        debugger;
        var Country_Url = $("#GetCountryByRegion").val();
        var regionID = $scope.LocationModel.RegionID;
        if (Country_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (regionID == "" || regionID == null || regionID == undefined || regionID == 0 || regionID == "0") {
                    return false;
                }
                else {

                    $.ajax({
                        type: "POST",
                        url: Country_Url,
                        data: "{RegionID:'" + regionID + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            $scope.CountriesListModel = data;
                            $scope.$apply();
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