using HCM.DAL;
using HCM.Filters;
using HCM.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HCM.Controllers
{
    [AdminActionFilter]
    public class AdminController : Controller
    {

        #region Clients Code Starts

        public ActionResult GetClients()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllClients()
        {
            try
            {
                List<HCM_Client> clientsList_Obj = new List<HCM_Client>();
                ModifyClientData clientDataList_Obj = new ModifyClientData();
                clientsList_Obj = clientDataList_Obj.GetAllClients();
                return Json(clientsList_Obj, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        [HttpPost]
        public JsonResult InsertAndUpdateClient(string clientDataArray)
        {
            string msg = "";
            clientDataArray = HttpUtility.UrlDecode(clientDataArray);
            NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
            NameValueCollection clientCreateCollection = nameValueCollectionData_Obj.GetQueryStringCollection(clientDataArray);
            ModifyClientData clientDataCreation_Obj = new ModifyClientData();
            msg = clientDataCreation_Obj.ClientCreationAndUpdation(clientCreateCollection);

            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        #endregion Client Code Ends

        #region Users Related Code

        public ActionResult GetUsers()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetUsersList()
        {
            try
            {
                List<HCM_Users> user_list = new List<HCM_Users>();
                ModifyUsersData user_Obj = new ModifyUsersData();
                user_list = user_Obj.GetUsers();

                var jsonResult = Json(user_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult InsertAndUpdateUser(string UserDataArray)
        {
            try
            {
                string Msg;
                UserDataArray = HttpUtility.UrlDecode(UserDataArray);
                NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
                NameValueCollection Usercollection_Obj = nameValueCollectionData_Obj.GetQueryStringCollection(UserDataArray);
                ModifyUsersData User_Create = new ModifyUsersData();
                Msg = User_Create.InsertAndUpdateUser(Usercollection_Obj);

                var jsonResult = Json(Msg, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult SendEmailToUser(string EmailTo, string FirstName, string LastName)
        {
            try
            {
                string Msg;
                ModifyUsersData User_sendEmail = new ModifyUsersData();
                Msg = User_sendEmail.SendEmail(EmailTo, HttpUtility.UrlDecode(FirstName), HttpUtility.UrlDecode(LastName));

                var jsonResult = Json(Msg, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult EditUserByID(string UserID)
        {
            try
            {
                List<HCM_UserModuleMapper> user_list = new List<HCM_UserModuleMapper>();
                ModifyUsersData user_Obj = new ModifyUsersData();
                user_list = user_Obj.EditUserById(UserID);

                var jsonResult = Json(user_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        public JsonResult GetRegions()
        {
            try
            {
                List<HCM_Region> region_list = new List<HCM_Region>();
                ModifyUsersData user_Obj = new ModifyUsersData();
                region_list = user_Obj.GetRegions();

                var jsonResult = Json(region_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        [HttpPost]
        public JsonResult GetAllLocations(string CountryID)
        {
            try
            {
                List<HCM_Location> location_list = new List<HCM_Location>();
                ModifyUsersData user_Obj = new ModifyUsersData();
                location_list = user_Obj.GetLocationBasedOnCountries(CountryID);

                var jsonResult = Json(location_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult GetCountries(string RegionID)
        {
            try
            {
                List<HCM_Country> location_list = new List<HCM_Country>();
                ModifyUsersData user_Obj = new ModifyUsersData();
                location_list = user_Obj.GetCountriesBasedOnRegion(RegionID);

                var jsonResult = Json(location_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #endregion

        #region Module Code Starts

        public ActionResult GetModules()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllModules()
        {
            try
            {
                List<HCM_Module> modulesList_Obj = new List<HCM_Module>();
                ModifyModulesData modulesDataList_Obj = new ModifyModulesData();
                modulesList_Obj = modulesDataList_Obj.GetAllModules();
                return Json(modulesList_Obj, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        public JsonResult InsertAndUpdateModule(string moduleDataArray)
        {
            string msg = "";
            moduleDataArray = HttpUtility.UrlDecode(moduleDataArray);
            NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
            NameValueCollection moduleCreateCollection = nameValueCollectionData_Obj.GetQueryStringCollection(moduleDataArray);
            ModifyModulesData moduleDataCreation_Obj = new ModifyModulesData();
            msg = moduleDataCreation_Obj.ModuleCreationAndUpdation(moduleCreateCollection);

            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetAllModulesList()
        {
            try
            {
                List<HCM_Module> module_list = new List<HCM_Module>();
                ModifyModulesData module_Obj = new ModifyModulesData();
                module_list = module_Obj.GetAllModulesList();

                var jsonResult = Json(module_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #endregion Module Code Ends

        #region WorkStream Code Starts

        public ActionResult GetWorkStreams()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllWorkStreams()
        {
            try
            {
                List<HCM_WorkStream> workStreamList_Obj = new List<HCM_WorkStream>();
                ModifyWorkStreamData workStreamDataList_Obj = new ModifyWorkStreamData();
                workStreamList_Obj = workStreamDataList_Obj.GetAllWorkStreams();
                return Json(workStreamList_Obj, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        [HttpPost]
        public JsonResult GetModule()
        {
            try
            {
                List<HCM_Module> moduleList_Obj = new List<HCM_Module>();
                ModifyWorkStreamData workStreamDataList_Obj = new ModifyWorkStreamData();
                moduleList_Obj = workStreamDataList_Obj.GetModules();
                return Json(moduleList_Obj, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        [HttpPost]
        public JsonResult InsertAndUpdateWorkStream(string workStreamDataArray)
        {
            string msg = "";
            workStreamDataArray = HttpUtility.UrlDecode(workStreamDataArray);
            NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
            NameValueCollection workStreamCollection = nameValueCollectionData_Obj.GetQueryStringCollection(workStreamDataArray);
            ModifyWorkStreamData workStreamData_Obj = new ModifyWorkStreamData();
            msg = workStreamData_Obj.WorkStreamInsertionAndUpdation(workStreamCollection);

            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        #endregion Code Ends

        #region Area Related Code

        public ActionResult GetAreas()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllAreas()
        {
            try
            {
                List<HCM_Area> areasList_Obj = new List<HCM_Area>();
                ModifyAreaData modifyAreaData_Obj = new ModifyAreaData();
                areasList_Obj = modifyAreaData_Obj.GetAllreas();
                return Json(areasList_Obj, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult AreaCreation(string AreaDataArray)
        {
            string msg = "";
            AreaDataArray = HttpUtility.UrlDecode(AreaDataArray);
            NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
            NameValueCollection areaCreateCollection = nameValueCollectionData_Obj.GetQueryStringCollection(AreaDataArray);
            ModifyAreaData modifyAreaData_Obj = new ModifyAreaData();
            msg = modifyAreaData_Obj.AreaCreationAndUpdation(areaCreateCollection);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Sub-Area Related Code

        public ActionResult GetSubArea()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetSubAreaList()
        {
            try
            {
                List<HCM_SubArea> subArea_list = new List<HCM_SubArea>();
                ModifySubAreaData subArea_Obj = new ModifySubAreaData();
                subArea_list = subArea_Obj.GetSubArea();

                var jsonResult = Json(subArea_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult GetAreaByModuleID(int ModuleID)
        {
            try
            {
                List<HCM_Area> area_list = new List<HCM_Area>();
                ModifySubAreaData area_Obj = new ModifySubAreaData();
                area_list = area_Obj.GetAreaByModuleID(ModuleID);

                var jsonResult = Json(area_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult InsertAndUpdateSubArea(string subAreaDataArray)
        {
            try
            {
                string Msg;
                subAreaDataArray = HttpUtility.UrlDecode(subAreaDataArray);
                NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
                NameValueCollection subAreacollection_Obj = nameValueCollectionData_Obj.GetQueryStringCollection(subAreaDataArray);
                ModifySubAreaData subArea_Create = new ModifySubAreaData();
                Msg = subArea_Create.InsertAndUpdateSubArea(subAreacollection_Obj);

                var jsonResult = Json(Msg, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #endregion

        #region Questionnaire Related Code

        public ActionResult GetQuestionnaire()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetQuestionnaireList()
        {
            try
            {
                List<HCM_QuestionnarieClientMapper> questionnaire_list = new List<HCM_QuestionnarieClientMapper>();
                ModifyAdminQuestionnaireData questionnaire_Obj = new ModifyAdminQuestionnaireData();
                questionnaire_list = questionnaire_Obj.GetAllQuestionnairesList(Convert.ToInt32(Session["ClientID"]), Convert.ToString(Session["VersionID"]));

                var jsonResult = Json(questionnaire_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult GetWorkStreamByModuleID(int ModuleID)
        {
            try
            {
                List<HCM_WorkStream> workStream_list = new List<HCM_WorkStream>();
                ModifyAdminQuestionnaireData wrkStream_Obj = new ModifyAdminQuestionnaireData();
                workStream_list = wrkStream_Obj.GetWorkStreamByModuleID(ModuleID);

                var jsonResult = Json(workStream_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult GetSubAreaByAreaID(int AreaID)
        {
            try
            {
                List<HCM_SubArea> subArea_list = new List<HCM_SubArea>();
                ModifyAdminQuestionnaireData subArea_Obj = new ModifyAdminQuestionnaireData();
                subArea_list = subArea_Obj.GetSubAreaByAreaID(AreaID);

                var jsonResult = Json(subArea_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult InsertAndUpdateQuestionnaire(string questionnaireDataArray, string VersionID)
        {
            try
            {
                string Msg;
                questionnaireDataArray = HttpUtility.UrlDecode(questionnaireDataArray);
                NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
                NameValueCollection questncollection_Obj = nameValueCollectionData_Obj.GetQueryStringCollection(questionnaireDataArray);
                ModifyAdminQuestionnaireData questionnaire_Create = new ModifyAdminQuestionnaireData();
                Msg = questionnaire_Create.InsertUpdateAdminQuestionnaire(questncollection_Obj, Convert.ToString(Session["VersionID"]));

                var jsonResult = Json(Msg, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult InsertQuestionnaireClientMapper(int QuestionnaireID, string Mapped)
        {
            try
            {
                string Msg;
                ModifyAdminQuestionnaireData questionnaireCM_Create = new ModifyAdminQuestionnaireData();
                Msg = questionnaireCM_Create.InsertQuestionnaireClientMapper(QuestionnaireID, Mapped);

                var jsonResult = Json(Msg, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #endregion

        #region Versions Related Code

        public ActionResult GetVersions()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllVersions()
        {
            try
            {
                List<HCM_Versions> version_List = new List<HCM_Versions>();
                ModifyVersionsData versionDataList_Obj = new ModifyVersionsData();
                version_List = versionDataList_Obj.GetAllVersions();
                return Json(version_List, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        public JsonResult GetActiveVersions()
        {
            try
            {
                List<HCM_Versions> version_List = new List<HCM_Versions>();
                ModifyVersionsData versionDataList_Obj = new ModifyVersionsData();
                version_List = versionDataList_Obj.GetActiveVersions();
                return Json(version_List, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        public JsonResult InsertAndUpdateVersion(string VersionDataArray)
        {
            string Msg = "";
            VersionDataArray = HttpUtility.UrlDecode(VersionDataArray);
            NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
            NameValueCollection Version_CreateCollection = nameValueCollectionData_Obj.GetQueryStringCollection(VersionDataArray);
            ModifyVersionsData versionDataList_Obj = new ModifyVersionsData();
            Msg = versionDataList_Obj.InsertAndUpdateVersion(Version_CreateCollection);

            return Json(Msg, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateVersionToDefault(string VersionID)
        {
            string Msg = "";
            ModifyVersionsData versionDataList_Obj = new ModifyVersionsData();
            Msg = versionDataList_Obj.UpdateVersionToDefault(VersionID);
            Session["VersionID"] = VersionID;

            return Json(Msg, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Legends Related Code

        public ActionResult GetLegends()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllLegends()
        {
            try
            {
                List<HCM_Legend> legend_list = new List<HCM_Legend>();
                ModifyLegendData legend_Obj = new ModifyLegendData();
                legend_list = legend_Obj.GetLegends();

                var jsonResult = Json(legend_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult UpdateLegend(string LegendID, string LegendName, string LegendPercent)
        {
            string Msg = "";
            ModifyLegendData legend_Obj = new ModifyLegendData();
            Msg = legend_Obj.UpdateLegend(LegendID, HttpUtility.UrlDecode(LegendName), LegendPercent);
            return Json(Msg, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region ExternalRate Related Code

        public ActionResult GetExternalRates()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllExternalRates()
        {
            try
            {
                List<HCM_ExternalRate> Extrnl_list = new List<HCM_ExternalRate>();
                ModifyExternalRate Extrnl_Obj = new ModifyExternalRate();
                Extrnl_list = Extrnl_Obj.GetExternalRates();

                var jsonResult = Json(Extrnl_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult UpdateExternalRates(string ExtrnlRteID, string ExtrnlName, string ExtrnlPercent)
        {
            string Msg = "";
            ModifyExternalRate Extrnl_Obj = new ModifyExternalRate();
            Msg = Extrnl_Obj.UpdateExternalRate(ExtrnlRteID, HttpUtility.UrlDecode(ExtrnlName), ExtrnlPercent);
            return Json(Msg, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region FinancialConfig Related Code

        public ActionResult GetFinancialConfigurations()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllFinancialConfigs()
        {
            try
            {
                List<HCM_FinancialConfiguration> FincalConfig_list = new List<HCM_FinancialConfiguration>();
                ModifyFinancialConfigData FincalConfig_Obj = new ModifyFinancialConfigData();
                FincalConfig_list = FincalConfig_Obj.GetFinancialCOnfigurations();

                var jsonResult = Json(FincalConfig_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult InsertFincalConfig(string FincalConfigDataArray)
        {
            string msg = "";
            FincalConfigDataArray = HttpUtility.UrlDecode(FincalConfigDataArray);
            NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
            NameValueCollection FincalConfigCreateCollection = nameValueCollectionData_Obj.GetQueryStringCollection(FincalConfigDataArray);
            ModifyFinancialConfigData FincalConfig_Obj = new ModifyFinancialConfigData();
            msg = FincalConfig_Obj.InsertFinancialConfig(FincalConfigCreateCollection);

            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Duration Related Code

        public ActionResult GetDurations()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllDurations()
        {
            try
            {
                List<HCM_ProjectSummary> prjctSumry_list = new List<HCM_ProjectSummary>();
                ModifyDurationData prjctSumry_Obj = new ModifyDurationData();
                prjctSumry_list = prjctSumry_Obj.GetDurations();

                var jsonResult = Json(prjctSumry_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult UpdateDuration(string Duration_DataArray)
        {
            try
            {
                string Msg;
                Duration_DataArray = HttpUtility.UrlDecode(Duration_DataArray);
                NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
                NameValueCollection Durtncollection_Obj = nameValueCollectionData_Obj.GetQueryStringCollection(Duration_DataArray);
                ModifyDurationData prjctSumry_Obj = new ModifyDurationData();
                Msg = prjctSumry_Obj.UpdateDuration(Durtncollection_Obj);

                var jsonResult = Json(Msg, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region Location Related Code

        public ActionResult GetLocations()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllLocationsData()
        {
            try
            {
                List<HCM_Location> location_list = new List<HCM_Location>();
                ModifyLocationsData location_Obj = new ModifyLocationsData();
                location_list = location_Obj.GetAllLocations();

                var jsonResult = Json(location_list, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult InsertAndUpdateLocation(string locationDataArray)
        {
            string msg = "";
            locationDataArray = HttpUtility.UrlDecode(locationDataArray);
            NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
            NameValueCollection Location_CreateCollection = nameValueCollectionData_Obj.GetQueryStringCollection(locationDataArray);
            ModifyLocationsData locationDataCreation_Obj = new ModifyLocationsData();
            msg = locationDataCreation_Obj.InsertAndUpdateLocation(Location_CreateCollection);

            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region Product Related Code

        public ActionResult GetProducts()
        {
            ViewBag.Menu = "Admin";
            return View();
        }

        [HttpPost]
        public JsonResult GetAllProducts()
        {
          
            try
            {
                List<HCM_Product> list_Hcm_Product_Obj = new List<HCM_Product>();
                ModifyProductData productData_Obj = new ModifyProductData();
                list_Hcm_Product_Obj = productData_Obj.GetAllProducts();

                var jsonResult = Json(list_Hcm_Product_Obj, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult GetActiveProducts()
        {

            try
            {
                List<HCM_Product> list_Hcm_Product_Obj = new List<HCM_Product>();
                ModifyProductData productData_Obj = new ModifyProductData();
                list_Hcm_Product_Obj = productData_Obj.GetActiveProducts();

                var jsonResult = Json(list_Hcm_Product_Obj, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult InsertAndUpdateProduct(string productDataArray)
        {
            string msg = "";
            try
            {
                productDataArray = HttpUtility.UrlDecode(productDataArray);
                NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
                NameValueCollection product_CreateCollection = nameValueCollectionData_Obj.GetQueryStringCollection(productDataArray);
                ModifyProductData productDataCreation_Obj = new ModifyProductData();
                msg = productDataCreation_Obj.InsertAndUpdateProduct(product_CreateCollection);

                var jsonResult = Json(msg, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult GetModulesByProductID(int? ProductID)
        {

            try
            {
                List<HCM_Module> list_Hcm_Module_Obj = new List<HCM_Module>();
                ModifyUsersData usersData_Obj = new ModifyUsersData();
                list_Hcm_Module_Obj = usersData_Obj.GetModulesByProductID(ProductID);

                var jsonResult = Json(list_Hcm_Module_Obj, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #endregion Code Ends

    }
}
