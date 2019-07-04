var HCMWebApp = angular.module('HCMWebApp', ['ui.materialize']);
var Session_UserID;

HCMWebApp.controller("QuestionnaireController", function ($scope) {

    $scope.QuestionnaireListModel = [];
    $scope.ModulesListModel = [];

    $scope.ProgressModel = {
        'QuestionsCount': 0,
        'QuestionsAnswered': 0,
        'AnsweredPercentage': 0
    };

    CheckSession();
    GetAllModulesList();

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

    function GetAllModulesList() {

        var list_Url = $("#GetModulesByUserID").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {

                        $scope.ModulesListModel = data;
                        if (data.length > 0) {
                            GetAllQuestionnairesList(data[0].ModuleID)
                        }
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

    function GetAllQuestionnairesList(ModuleID) {

        var list_Url = $("#GetAllQuestionnairesList").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $("#loadingDiv").show();

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{'ModuleID':" + ModuleID + "}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {

                        $scope.QuestionnaireListModel = data;
                        $scope.ProgressModel.QuestionsCount = $scope.QuestionnaireListModel.length;
                        var Count = 0;
                        angular.forEach($scope.QuestionnaireListModel, function (value, key) {
                            if (value.Response != "" && value.Response != null && value.Response != undefined) {
                                Count++;
                            }
                        });
                        $scope.ProgressModel.QuestionsAnswered = Count;
                        $scope.ProgressModel.AnsweredPercentage = Math.round(($scope.ProgressModel.QuestionsAnswered / $scope.ProgressModel.QuestionsCount) * 100, 10);
                        $("#progressbar").progressbar({
                            value: $scope.ProgressModel.AnsweredPercentage
                        });
                        $scope.$apply();
                        $("#loadingDiv").hide();

                    }, error: function (data) {
                        $("#loadingDiv").hide();
                        alert(data.responseText);
                    }
                });
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    }

    $scope.SaveQuestionnaires = function (evt, Questionnaire) {

        var Save_Url = $("#InsertAndUpdateQuestionnaire").val();
        if (Save_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Save_Url,
                    data: "{'QuestionnaireID':'" + Questionnaire.QuestionnaireID + "','Response':'" + Questionnaire.Response + "','Comments':'" + escape(Questionnaire.Comments) + "'}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {

                        if (data == "Success") {
                            $scope.ProgressModel.QuestionsCount = $scope.QuestionnaireListModel.length;
                            var Count = 0;
                            angular.forEach($scope.QuestionnaireListModel, function (value, key) {
                                if (value.Response != "" && value.Response != null && value.Response != undefined) {
                                    Count++;
                                }
                            });
                            $scope.ProgressModel.QuestionsAnswered = Count;
                            $scope.ProgressModel.AnsweredPercentage = Math.round(($scope.ProgressModel.QuestionsAnswered / $scope.ProgressModel.QuestionsCount) * 100, 10);
                            $scope.$apply();

                            $("#progressbar").progressbar({
                                value: $scope.ProgressModel.AnsweredPercentage
                            });
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

        // last line
        $(evt.target).parentsUntil($(".questions_section"), ".question").find(".row").addClass('li_opacity');

    }

    $scope.GetModulesQuestionnaires = function (module) {

        if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

            GetAllQuestionnairesList(module.ModuleID)

            angular.forEach($scope.ModulesListModel, function (value, key) {
                if (value.ModuleID == module.ModuleID) {
                    value.Show = true;
                }
                else {
                    value.Show = false;
                }
            });
        }
        else {
            window.location.href = $("#Logout").val();
        }
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
