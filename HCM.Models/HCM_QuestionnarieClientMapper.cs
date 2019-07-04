using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCM.Models
{
    public class HCM_QuestionnarieClientMapper
    {
        public HCM_QuestionnarieClientMapper()
        {
            //Questionnaire = new HCM_Questionnaire();
            Client = new HCM_Client();
            Module = new HCM_Module();
            WorkStream = new HCM_WorkStream();
            Area = new HCM_Area();
            SubArea = new HCM_SubArea();
            Product = new HCM_Product();

        }
        public int QuestionnaireClientMapperID { get; set; }
       // public HCM_Questionnaire Questionnaire { get; set; }
        public HCM_Client Client { get; set; }
        public HCM_Product Product { get; set; }
        public HCM_Module Module { get; set; }
        public HCM_WorkStream WorkStream { get; set; }
        public HCM_Area Area { get; set; }
        public HCM_SubArea SubArea { get; set; }
        public string QuestionnaireName { get; set; }
        public string QuestionnaireDesc { get; set; }
        public decimal OverallRating_Yes { get; set; }
        public decimal BusinessScore_Yes { get; set; }
        public decimal BusinessWeight_Yes { get; set; }
        public decimal TechnologyScore_Yes { get; set; }
        public decimal TechnologyWeight_Yes { get; set; }
        public decimal OverallRating_No { get; set; }
        public decimal BusinessScore_No { get; set; }
        public decimal BusinessWeight_No { get; set; }
        public decimal TechnologyScore_No { get; set; }
        public decimal TechnologyWeight_No { get; set; }
        public bool Security { get; set; }
        public bool Audit { get; set; }
        public bool Compliance { get; set; }
        public bool Opertional { get; set; }
        public bool Status { get; set; }

        public DateTime CreatedOn { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int UpdatedBy { get; set; }

        public int RowNumber { get; set; }
        public string SerialNo { get; set; }
        public string Response { get; set; }
        public string Comments { get; set; }
        public bool Mapped { get; set; }

        public int QuestionnaireID { get; set; }
        public int VersionID { get; set; }

    }
}
