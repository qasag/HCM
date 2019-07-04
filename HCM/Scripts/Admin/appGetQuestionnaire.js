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

HCMWebApp.controller("GetAdminQuestionnaireController", function ($scope) {

    $scope.ModulesListModel = [];
    $scope.WorkStreamListModel = [];
    $scope.AreaListModel = [];
    $scope.SubAreaListModel = [];
    $scope.QuestionnaireAdminListModel = [];
    $scope.ProductsListModel = [];

    $scope.QuestionnaireModel = {
        'QuestionnaireClientMapperID': '',
        'ModuleID': '',
        'WorkStreamID': '',
        'AreaID': '',
        'SubAreaID': '',
        'QuestionnaireName': '',
        'OverallRating_Yes': '',
        'BusinessScore_Yes': '',
        'BusinessWeight_Yes': '',
        'TechnologyScore_Yes': '',
        'TechnologyWeight_Yes': '',
        'OverallRating_No': '',
        'BusinessScore_No': '',
        'BusinessWeight_No': '',
        'TechnologyScore_No': '',
        'TechnologyWeight_No': '',
        'Security': false,
        'Audit': false,
        'Compliance': false,
        'Opertional': false,
        'IsDefault': false,
        'Status': false,
        'ProductID': ''
    }

    CheckSession();
    GetAllQuestionnaireList();
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

    function GetAllModulesList() {
        var ProductID = $scope.QuestionnaireModel.ProductID;
        var list_Url = $("#GetModulesByProductID").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {
                if (ProductID != null && ProductID != undefined && ProductID != "") {
                    $.ajax({
                        type: "POST",
                        url: list_Url,
                        data: "{'ProductID':'" + ProductID + "'}",
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
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    }

    function GetAllQuestionnaireList() {

        var list_Url = $("#GetQuestionnaireList").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $("#loadingDiv").show();

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.QuestionnaireAdminListModel = data;
                        $scope.sortpropertyName = 'QuestionnaireName';
                        $scope.sortorder = false;
                        $("#loadingDiv").hide();
                        $scope.$apply();

                    }, error: function (data) {
                        alert(data.responseText);
                        $("#loadingDiv").hide();
                    }
                });
            }
            else {
                window.location.href = $("#Logout").val();
            }
        }
    }

    function EmptyQuestionnaireModel() {

        $scope.QuestionnaireModel.QuestionnaireID = '';
        $scope.QuestionnaireModel.ModuleID = '';
        $scope.QuestionnaireModel.WorkStreamID = '';
        $scope.QuestionnaireModel.AreaID = '';
        $scope.QuestionnaireModel.SubAreaID = '';
        $scope.QuestionnaireModel.QuestionnaireName = '';
        $scope.QuestionnaireModel.QuestionnaireDesc = '';
        $scope.QuestionnaireModel.OverallRating_Yes = '';
        $scope.QuestionnaireModel.BusinessScore_Yes = '';
        $scope.QuestionnaireModel.BusinessWeight_Yes = '';
        $scope.QuestionnaireModel.TechnologyScore_Yes = '';
        $scope.QuestionnaireModel.TechnologyWeight_Yes = '';
        $scope.QuestionnaireModel.OverallRating_No = '';
        $scope.QuestionnaireModel.BusinessScore_No = '';
        $scope.QuestionnaireModel.BusinessWeight_No = '';
        $scope.QuestionnaireModel.TechnologyScore_No = '';
        $scope.QuestionnaireModel.TechnologyWeight_No = '';
        $scope.QuestionnaireModel.Security = false;
        $scope.QuestionnaireModel.Audit = false;
        $scope.QuestionnaireModel.Compliance = false;
        $scope.QuestionnaireModel.Opertional = false;
        $scope.QuestionnaireModel.Status = false;
        $scope.QuestionnaireModel.ProductID = '';
        $scope.ModulesListModel = "";
        $scope.AreaListModel = "";
        $scope.WorkStreamListModel = "";
        $scope.SubAreaListModel = "";


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

    $scope.GetSubAreaByAreaID = function (AreaID) {
        $scope.SubAreaListModel = [];
        var list_Url = $("#GetSubAreaByAreaID").val();
        if (list_Url != undefined && AreaID != "" && AreaID != undefined && AreaID != null) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: list_Url,
                    data: "{'AreaID':" + AreaID + "}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        $scope.SubAreaListModel = data;
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

    $scope.CancelQuestionnaireClick = function () {
        EmptyQuestionnaireModel();
    };

    $scope.SaveAdminQuestionnaire = function () {

        var list_Url = $("#InsertAndUpdateQuestionnaire").val();
        if (list_Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                if (ValidateQuestionnaire()) {

                    var VersionID = $scope.VersionID;

                    $.ajax({
                        type: "POST",
                        url: list_Url,
                        data: "{'questionnaireDataArray':'" + escape($.param($scope.QuestionnaireModel)) + "'}",
                        contentType: "application/json;",
                        dataType: "json",
                        success: function (data) {
                            if (data == "Success") {
                                alert("Questionnaire Saved Successfully");
                                $("#addnew_questionnaire").modal('close');
                                $("#Edit_questionnaire").modal('close');
                                EmptyQuestionnaireModel();
                                GetAllQuestionnaireList();
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

    function ValidateQuestionnaire() {

        var Question_flag = true;

        var ProductID = $scope.QuestionnaireModel.ProductID;
        var Module = $scope.QuestionnaireModel.ModuleID;
        var Area = $scope.QuestionnaireModel.AreaID;
        var SubArea = $scope.QuestionnaireModel.SubAreaID;
        var QuestName = $scope.QuestionnaireModel.QuestionnaireName;

        var OverAll_Yes = $scope.QuestionnaireModel.OverallRating_Yes;
        var BusScore_Yes = $scope.QuestionnaireModel.BusinessScore_Yes;
        var BusWeight_Yes = $scope.QuestionnaireModel.BusinessWeight_Yes;
        var TechScore_Yes = $scope.QuestionnaireModel.TechnologyScore_Yes;
        var TechWeight_Yes = $scope.QuestionnaireModel.TechnologyWeight_Yes;

        var OverAll_No = $scope.QuestionnaireModel.OverallRating_No;
        var BusScore_No = $scope.QuestionnaireModel.BusinessScore_No;
        var BusWeight_No = $scope.QuestionnaireModel.BusinessWeight_No;
        var TechScore_No = $scope.QuestionnaireModel.TechnologyScore_No;
        var TechWeight_No = $scope.QuestionnaireModel.TechnologyWeight_No;


        if (ProductID == "" || ProductID == null || ProductID == undefined) {
            alert('Please Choose Product');
            Question_flag = false;
            return Question_flag;
        }

        if (Module == "" || Module == null || Module == undefined) {
            alert('Please Choose Module');
            Question_flag = false;
            return Question_flag;
        }

        if (Area == "" || Area == null || Area == undefined) {
            alert('Please Choose Area');
            Question_flag = false;
            return Question_flag;
        }

        if (SubArea == "" || SubArea == null || SubArea == undefined) {
            alert('Please Choose SubArea');
            Question_flag = false;
            return Question_flag;
        }

        if (QuestName == "" || QuestName == null || QuestName == undefined) {
            alert('Please Enter Questionnaire Name');
            Question_flag = false;
            return Question_flag;
        }


        if (OverAll_Yes == "" || OverAll_Yes == null || OverAll_Yes == undefined) {
            alert('Please Enter OverAllRating In Yes');
            Question_flag = false;
            return Question_flag;
        }
        if (BusScore_Yes == "" || BusScore_Yes == null || BusScore_Yes == undefined) {
            alert('Please Enter Business Score In Yes');
            Question_flag = false;
            return Question_flag;
        }
        if (BusWeight_Yes == "" || BusWeight_Yes == null || BusWeight_Yes == undefined) {
            alert('Please Enter Business Weight In Yes');
            Question_flag = false;
            return Question_flag;
        }
        if (TechScore_Yes == "" || TechScore_Yes == null || TechScore_Yes == undefined) {
            alert('Please Enter Technology Score In Yes');
            Question_flag = false;
            return Question_flag;
        }
        if (TechWeight_Yes == "" || TechWeight_Yes == null || TechWeight_Yes == undefined) {
            alert('Please Enter Technology Weight In Yes');
            Question_flag = false;
            return Question_flag;
        }


        if (OverAll_No == "" || OverAll_No == null || OverAll_No == undefined) {
            alert('Please Enter OverAllRating In No');
            Question_flag = false;
            return Question_flag;
        }
        if (BusScore_No == "" || BusScore_No == null || BusScore_No == undefined) {
            alert('Please Enter Business Score In No');
            Question_flag = false;
            return Question_flag;
        }
        if (BusWeight_No == "" || BusWeight_No == null || BusWeight_No == undefined) {
            alert('Please Enter Business Weight In No');
            Question_flag = false;
            return Question_flag;
        }
        if (TechScore_No == "" || TechScore_No == null || TechScore_No == undefined) {
            alert('Please Enter Technology Score In No');
            Question_flag = false;
            return Question_flag;
        }
        if (TechWeight_No == "" || TechWeight_No == null || TechWeight_No == undefined) {
            alert('Please Enter Technology Weight In No');
            Question_flag = false;
            return Question_flag;
        }

        return Question_flag;
    }

    $scope.EditQuestionnaire = function (index, questionnaire) {

        if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

            $("#loadingDiv").show();

            var productID = questionnaire.Product.ProductID;
            $scope.QuestionnaireModel.QuestionnaireClientMapperID = questionnaire.QuestionnaireClientMapperID;

            $scope.QuestionnaireModel.ProductID = questionnaire.Product.ProductID;
            $scope.GetModulesByProductID(productID);

            $scope.QuestionnaireModel.ModuleID = questionnaire.Module.ModuleID;
            GetWorkStreamByModuleID(questionnaire.Module.ModuleID);

            $scope.QuestionnaireModel.WorkStreamID = questionnaire.WorkStream.WorkStreamID;
            GetAreaByModuleID(questionnaire.Module.ModuleID);

            $scope.QuestionnaireModel.AreaID = questionnaire.Area.AreaID;
            $scope.GetSubAreaByAreaID(questionnaire.Area.AreaID);

            $scope.QuestionnaireModel.SubAreaID = questionnaire.SubArea.SubAreaID;
            $scope.QuestionnaireModel.QuestionnaireName = questionnaire.QuestionnaireName;

            $scope.QuestionnaireModel.OverallRating_Yes = questionnaire.OverallRating_Yes;
            $scope.QuestionnaireModel.BusinessScore_Yes = questionnaire.BusinessScore_Yes;
            $scope.QuestionnaireModel.BusinessWeight_Yes = questionnaire.BusinessWeight_Yes;
            $scope.QuestionnaireModel.TechnologyScore_Yes = questionnaire.TechnologyScore_Yes;
            $scope.QuestionnaireModel.TechnologyWeight_Yes = questionnaire.TechnologyWeight_Yes;

            $scope.QuestionnaireModel.OverallRating_No = questionnaire.OverallRating_No;
            $scope.QuestionnaireModel.BusinessScore_No = questionnaire.BusinessScore_No;
            $scope.QuestionnaireModel.BusinessWeight_No = questionnaire.BusinessWeight_No;
            $scope.QuestionnaireModel.TechnologyScore_No = questionnaire.TechnologyScore_No;
            $scope.QuestionnaireModel.TechnologyWeight_No = questionnaire.TechnologyWeight_No;

            $scope.QuestionnaireModel.Security = questionnaire.Security;
            $scope.QuestionnaireModel.Audit = questionnaire.Audit;
            $scope.QuestionnaireModel.Compliance = questionnaire.Compliance;
            $scope.QuestionnaireModel.Opertional = questionnaire.Opertional;

            $scope.QuestionnaireModel.IsDefault = questionnaire.IsDefault;
            $scope.QuestionnaireModel.Status = questionnaire.Status;

            $("#loadingDiv").hide();

        }
        else {
            window.location.href = $("#Logout").val();
        }
    }

    $scope.UpdateQuestionnaireClient = function (index, questionnaire_Obj) {

        var Url = $("#InsertQuestionnaireClientMapper").val();
        if (Url != undefined) {

            if (Session_UserID != "" && Session_UserID != null && Session_UserID != undefined) {

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{'QuestionnaireID':" + questionnaire_Obj.QuestionnaireID + ",'Mapped':'" + questionnaire_Obj.Mapped + "'}",
                    contentType: "application/json;",
                    dataType: "json",
                    success: function (data) {
                        if (data == "Success") {
                            alert("Questionnaire Assigned Successfully");
                            GetAllQuestionnaireList();
                        }
                        else if (data == "Data Exists") {
                            alert("User Responses Exists With This Questionnaire");
                            GetAllQuestionnaireList();
                            return false;
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
    };

    $scope.sortBy = function (propertyName) {
        $scope.sortorder = ($scope.sortpropertyName === propertyName) ? !$scope.sortorder : false;
        $scope.sortpropertyName = propertyName;
    };

    $scope.GetModulesByProductID = function () {
        $scope.ModulesListModel = [];
        $scope.WorkStreamListModel = [];
        $scope.AreaListModel = [];
        $scope.SubAreaListModel = [];
        GetAllModulesList();
    };

    $scope.AddNewQuestionnaireClick = function () {
        EmptyQuestionnaireModel();
    };

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

                $.ajax({
                    type: "POST",
                    url: Url,
                    data: "{'VersionID':" + VersionID + "}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    async: false,
                    success: function (data) {

                        window.location.href = window.location.href;
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
