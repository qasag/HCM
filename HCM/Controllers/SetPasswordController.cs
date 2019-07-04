using HCM.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HCM.Controllers
{
    public class SetPasswordController : Controller 
    {
        ModifyEncryptDecryptData EncryptDecrypt_Obj = new ModifyEncryptDecryptData();

        public ActionResult Index(string EmailID)
        {
            // string EmailID = "iqcabG01COl5ZtnGkv6aElQ9xyzGlQvlDf7JIjNtcK4=";
            ViewBag.hdnEmailID = EncryptDecrypt_Obj.Decrypt(EmailID);
            return View();
        }

        [HttpPost]
        public JsonResult UpdateSetPassword(string EmailID, string Password)
        {
            try
            {
                string Msg;
                ModifySetPasswordData setPswd_Obj = new ModifySetPasswordData();
                Msg = setPswd_Obj.UpdateUserSetPassword(EmailID, HttpUtility.UrlDecode(Password));

                var jsonResult = Json(Msg, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;
            }
            catch (Exception Ex)
            {
                throw Ex;
            }
        }
        
    }
}
