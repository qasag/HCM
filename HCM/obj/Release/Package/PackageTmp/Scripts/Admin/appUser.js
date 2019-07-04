var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("GetUserController", function ($scope) {

    $scope.UsersListModel = [];
    $scope.ModuleListModel = [];
    $scope.RegionsListModel = [];
    $scope.LocationsListModel = [];
    $scope.CountriesListModel = [];
    $scope.ProductsListModel = [];

    $scope.UserModel = {
        'UserID': '',
        'ClientID': '',
        'UserType': '',
        'FirstName': '',
        'LastName': '',
        'Email': '',
        'Password': '',
        'Status': '',
        'ModuleID': '',
        'RegionID': '',
        'CountryID': '',
        'LocationID': '',
        'ProductID':''
    };

    $scope.UserTypeListModel = [{ 'name': 'Business' }, { 'name': 'Technology' }]

    CheckSession();
    GetUsers();
    GetRegions();
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

    function GetUsers() {

        var Url = $("#GetUsersList").val();
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

                        $scope.UsersListModel = data;
                        $scope.sortpropertyName = 'FirstName';
                        $scope.sortorder = false;
                        //$scope.$apply();

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
                    data: "{'ProductID':'" + $scope.UserModel.ProductID + "'}",
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

    $scope.InsertUserClick = function () {
        debugger;
        var Url = $("#InsertAndUpdateUser").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (ValidateUser()) {

                    var ModuleArray = $scope.UserModel.ModuleID;
                    $scope.UserModel.ModuleID = "";
                    for (var i = 0 ; i < ModuleArray.length; i++) {
                        $scope.UserModel.ModuleID = $scope.UserModel.ModuleID + ModuleArray[i].toString() + ',';
                    }

                    $scope.UserModel.ModuleID = $scope.UserModel.ModuleID.substring(0, $scope.UserModel.ModuleID.length - 1);

                    $.ajax({
                        type: "POST",
                        url: Url,
                        data: "{'UserDataArray': '" + escape($.param($scope.UserModel)) + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (data) {

                            if (data == "Success") {
                                alert("User Data Saved Successfully");
                                $("#addnew_users").modal('close');
                                 $("#Edit_users").modal('close');
                                GetUsers();
                                SendEmailToCreatedUser($scope.UserModel.Email, $scope.UserModel.FirstName, $scope.UserModel.LastName);
                                EmptyUserModel();
                            }
                            else if (data == "Failed") {
                                alert("Email Already Exists");
                                return false;
                            }
                            else {
                                alert(data);
                                return false;
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

    $scope.UpdateUserClick = function () {

        var Url = $("#InsertAndUpdateUser").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (ValidateUser()) {


                    var ModuleArray = $scope.UserModel.ModuleID;
                    $scope.UserModel.ModuleID = "";
                    for (var i = 0 ; i < ModuleArray.length; i++) {
                        $scope.UserModel.ModuleID = $scope.UserModel.ModuleID + ModuleArray[i].toString() + ',';
                    }

                    $scope.UserModel.ModuleID = $scope.UserModel.ModuleID.substring(0, $scope.UserModel.ModuleID.length - 1);


                    $.ajax({
                        type: "POST",
                        url: Url,
                        data: "{'UserDataArray': '" + escape($.param($scope.UserModel)) + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        async: false,
                        success: function (data) {

                            if (data == "Success") {
                                alert("User Data Saved Successfully");
                               $("#addnew_users").modal('close');
                                $("#Edit_users").modal('close');
                                EmptyUserModel();
                                GetUsers();
                            }
                            else if (data == "Failed") {
                                alert("Email Already Exists");
                                return false;
                            }
                            else {
                                alert(data);
                                return false;
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

    $scope.EditUser = function (index, User) {

        var Url = $("#EditUserByID").val();
        var userID = User.UserID;
        var countryID = User.Country.CountryID;
        var regionID = User.Country.Region.RegionID;
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $scope.LocationsListModel = [];

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{'UserID': '" + userID + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {

                        if (data.length > 0) {

                            $scope.UserModel.UserType = data[0].User.UserType;
                            $scope.UserModel.UserID = data[0].User.UserID;
                            $scope.UserModel.ClientID = data[0].User.Client.ClientID;
                            $scope.UserModel.FirstName = data[0].User.FirstName;
                            $scope.UserModel.LastName = data[0].User.LastName;
                            $scope.UserModel.Email = data[0].User.Email;
                            $scope.UserModel.Password = data[0].User.Password;
                            $scope.UserModel.Status = data[0].User.Status;
                            $scope.UserModel.RegionID = User.Country.Region.RegionID;
                            $scope.GetCountriesBasedOnRegionID(regionID);
                            $scope.GetLocationBasedOnCountry(countryID);
                            $scope.UserModel.CountryID = User.Country.CountryID;
                            $scope.UserModel.LocationID = User.Location.LocationID;
                            $scope.UserModel.ProductID = data[0].Product.ProductID;
                            var productID = data[0].Product.ProductID;
                            $scope.GetModulesBasedOnProductID(productID);

                            var MduleArray = [];
                            for (var i = 0; i < data[0].AssignedModules.split(',').length; i++) {
                                MduleArray.push(parseInt(data[0].AssignedModules.split(',')[i], 10));
                            }
                            $scope.UserModel.ModuleID = MduleArray;


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

    $scope.SaveCancelClick = function () {
        EmptyUserModel();
    };

    $scope.AddNewUserClick = function () {
        EmptyUserModel();
    }

    function EmptyUserModel() {

        $scope.UserModel.UserID = '';
        $scope.UserModel.ClientID = '';
        $scope.UserModel.UserType = '';
        $scope.UserModel.FirstName = '';
        $scope.UserModel.LastName = '';
        $scope.UserModel.Email = '';
        $scope.UserModel.Password = '';
        $scope.UserModel.Status = false;
        $scope.UserModel.ModuleID = '';
        $scope.UserModel.RegionID = 0;
        $scope.UserModel.LocationID = 0;
        $scope.LocationsListModel = [];
        $scope.CountriesListModel = [];
        $scope.ModuleListModel = [];
        $scope.UserModel.CountryID = '';
        $scope.UserModel.ProductID = '';
        $scope.AssignedModules = [];
    }

    function ValidateUser() {

        var user_Flag = true;

        var UserType = $scope.UserModel.UserType;
        var FirstName = $scope.UserModel.FirstName;
        var LastName = $scope.UserModel.LastName;
        var Email = $scope.UserModel.Email;
        var Password = $scope.UserModel.Password;
        var re = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var Module = $scope.UserModel.ModuleID;
        var RegionID = $scope.UserModel.RegionID;
        var CountryID = $scope.UserModel.CountryID;
        var LocationID = $scope.UserModel.LocationID;
        var ProductID = $scope.UserModel.ProductID;

        if (UserType == "" || UserType == null || UserType == undefined) {
            alert("Please Select User Type");
            user_Flag = false;
            return user_Flag;
        }

        if (ProductID == "" || ProductID == null || ProductID == undefined) {
            alert("Please Select Product");
            user_Flag = false;
            return user_Flag;
        }

        if (Module == "" || Module == null || Module == undefined) {
            alert("Please Select Modules");
            user_Flag = false;
            return user_Flag;
        }

        if (FirstName == "" || FirstName == null || FirstName == undefined) {
            alert("Please Enter First Name");
            user_Flag = false;
            return user_Flag;
        }

        if (LastName == "" || LastName == null || LastName == undefined) {
            alert("Please Enter Last Name");
            user_Flag = false;
            return user_Flag;
        }

        if (Email == "" || Email == null || Email == undefined) {
            alert("Please Enter Email");
            user_Flag = false;
            return user_Flag;
        }

        if (Email.length > 0) {
            if (!re.test(Email)) {
                alert('Please Enter Valid Email Address');
                user_Flag = false;
                return user_Flag;
            }
        }

        if (Password == "" || Password == null || Password == undefined) {
            alert("Please Enter Password");
            user_Flag = false;
            return user_Flag;
        }

        if (RegionID == "" || RegionID == null || RegionID == undefined) {
            alert("Please Select Region");
            user_Flag = false;
            return user_Flag;
        }

        if (CountryID == "" || CountryID == null || CountryID == undefined) {
            alert("Please Select Country");
            user_Flag = false;
            return user_Flag;
        }

        if (LocationID == "" || LocationID == null || LocationID == undefined) {
            alert("Please Select Location");
            user_Flag = false;
            return user_Flag;
        }

        return user_Flag;
    }

    $scope.sortBy = function (propertyName) {
        $scope.sortorder = ($scope.sortpropertyName === propertyName) ? !$scope.sortorder : false;
        $scope.sortpropertyName = propertyName;
    };

    function SendEmailToCreatedUser(EmailID, FirstName, LastName) {

        var Url = $("#SendEmailToUser").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{'EmailTo':'" + EmailID + "','FirstName':'" + escape(FirstName) + "', 'LastName':'" + escape(LastName) + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {

                        if (data == "Success") {
                        }
                        else {
                            alert(data);
                            return false;
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

    $scope.GetCountriesBasedOnRegionID = function (RegionID) {
        $scope.CountriesListModel = []; 
        var Country_Url = $("#GetCountries").val();
        var RegionID = $scope.UserModel.RegionID;
        if (Country_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (RegionID == "" || RegionID == null || RegionID == undefined || RegionID == 0 || RegionID == "0") {
                    return false;
                }
                else {

                    $.ajax({
                        type: "POST",
                        url: Country_Url,
                        data: "{'RegionID':'" + RegionID + "'}",
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

    $scope.GetLocationBasedOnCountry = function (CountryID) {
        $scope.LocationsListModel = [];
        var location_Url = $("#GetLocations").val();
        if (location_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (CountryID == "" || CountryID == null || CountryID == undefined || CountryID == 0 || CountryID == "0") {
                    return false;
                }
                else {

                    $.ajax({
                        type: "POST",
                        url: location_Url,
                        data: "{'CountryID':'" + CountryID + "'}",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            debugger;
                            $scope.LocationsListModel = data;
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

    $scope.GetModulesBasedOnProductID = function (ProductID) {

        GetAllModules();
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

