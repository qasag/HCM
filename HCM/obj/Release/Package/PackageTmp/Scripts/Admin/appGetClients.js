var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("GetClientsController", function ($scope) {

    $scope.ClientListModel = [];
    $scope.ClientModel = {
        'ClientID': '',
        'ClientName': '',
        'ClientEmail': '',
        'Status': '',
        'CreatedOn': '',
        'CreatedBy': '',
        'UpdatedOn': '',
        'UpdatedBy': ''

    };
    CheckSession();
    GetAllClients();


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

    function GetAllClients() {
        var client_Url = $("#GetAllClients").val();
        if (client_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                $.ajax({
                    type: "POST",
                    url: client_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.ClientListModel = data;
                        $scope.sortpropertyName = 'ClientName';
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

    $scope.InsertClientClick = function () {

        var createClientUrl = $("#ClientInsertion").val();
        if (createClientUrl != undefined) {
            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                if (ClientValidation()) {
                    $.ajax({
                        type: "POST",
                        url: createClientUrl,
                        data: "{'ClientDataArray':'" + escape($.param($scope.ClientModel)) + "'}",
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (data) {
                            if (data == "Success") {
                                alert("Client  Saved Successfully");
                                $('#addnew_client').modal('close');
                                $('#edit_client').modal('close');
                               // GetAllClients(); ModelEmpty();
                                window.location.href = window.location.href;
                            }
                            else if (data == "Failed") {
                                alert("Email Already Exist");
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

    function ClientValidation() {

        var clientFlag = true;
        var clientName = $scope.ClientModel.ClientName;
        var clientEmail = $scope.ClientModel.ClientEmail;
        var email = clientEmail;
        var re = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (clientName == "" || clientName == null || clientName == undefined) {
            alert("Please Enter First Name");
            clientFlag = false;
            return clientFlag;
        }

        if (clientEmail == "" || clientEmail == null || clientEmail == undefined) {
            alert("Please Enter Email");
            clientFlag = false;
            return clientFlag;
        }

        if (email.length > 0) {
            if (!re.test(email)) {
                alert("Please Enter Valid Email");
                clientFlag = false;
                return clientFlag;
            }
        }

        return clientFlag;
    }

    $scope.EditClientByID = function (index, client) {
        $scope.ClientModel.ClientID = client.ClientID;
        $scope.ClientModel.ClientName = client.ClientName;
        $scope.ClientModel.ClientEmail = client.ClientEmail;
        if (client.Status == 1) {
            $scope.ClientModel.Status = true;
        }
        else {
            $scope.ClientModel.Status = false;
        }
    }

    function ModelEmpty() {
        $scope.ClientModel.ClientID = "";
        $scope.ClientModel.ClientName = "";
        $scope.ClientModel.ClientEmail = "";
        $scope.ClientModel.Status = "";
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
