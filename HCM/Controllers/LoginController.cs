using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using HCM.Models;
using HCM.DAL;
using System.Collections.Specialized;

namespace HCM.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult LoginUser(string login_User_ArrayData)
        {
            HCM_Users login_user_Obj = new HCM_Users();
            login_User_ArrayData = HttpUtility.UrlDecode(login_User_ArrayData);
            NameValueCollectionData nameValueCollectionData_Obj = new NameValueCollectionData();
            NameValueCollection Login_User_Collection_Obj = nameValueCollectionData_Obj.GetQueryStringCollection(login_User_ArrayData);

            ModifyLoginData loginuser_Obj = new ModifyLoginData();
            login_user_Obj = loginuser_Obj.LoginUser(Login_User_Collection_Obj);

            if (login_user_Obj.UserID != 0)
            {
                Session["UserID"] = Convert.ToString(login_user_Obj.UserID);
                Session["ClientID"] = Convert.ToString(login_user_Obj.Client.ClientID);
                Session["UserType"] = Convert.ToString(login_user_Obj.UserType);
             

                if (login_user_Obj.UserType == "SuperAdmin")
                {
                    List<HCM_Client> client_list = new List<HCM_Client>();
                    ModifyGlobalClientsData client_Obj = new ModifyGlobalClientsData();
                    client_list = client_Obj.GetClients(String.IsNullOrEmpty(Convert.ToString(Session["ClientID"])) ? 0 : Convert.ToInt32(Session["ClientID"]), Convert.ToString(Session["UserType"]));
                    if (String.IsNullOrEmpty(Convert.ToString(Session["ClientID"])))
                    {
                        Session["ClientID"] = Convert.ToString(client_list.First().ClientID);
                    }
                }

                if (login_user_Obj.UserType == "ClientAdmin" || login_user_Obj.UserType == "SuperAdmin")
                {
                    List<HCM_Versions> version_List = new List<HCM_Versions>();
                    ModifyVersionsData versionDataList_Obj = new ModifyVersionsData();
                    version_List = versionDataList_Obj.GetActiveVersions();
                    foreach (var item in version_List)
                    {
                        if (item.IsDefault)
                        {
                            Session["VersionID"] = Convert.ToString(item.VersionID);
                        }
                    }

                }

                if (login_user_Obj.UserType == "ClientAdmin" || login_user_Obj.UserType == "SuperAdmin")
                {
                    List<HCM_Product> product_List = new List<HCM_Product>();
                    ModifyProductData productDataList_Obj = new ModifyProductData();
                    product_List = productDataList_Obj.GetAllProducts();
                    foreach (var item in product_List)
                    {
                        Session["ProductID"] = Convert.ToInt32(item.ProductID);
                    }

                }
            }
            return Json(login_user_Obj, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public string CheckSession()
        {
            string Session_UserID = "";
            if (Session["UserID"] != null && Session["UserID"] != "" && Session["UserID"] != "undefined")
            {
                Session_UserID = System.Web.HttpContext.Current.Session["UserID"].ToString();
            }
            return Session_UserID;
        }


        public ActionResult Logout()
        {
            Session["UserID"] = "";
            Session["ClientID"] = "";
            Session["UserType"] = "";
            Session.Abandon();
            return RedirectToAction("Index");
        }
    }
}
