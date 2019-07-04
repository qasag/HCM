using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace HCM.DAL
{
    public class NameValueCollectionData
    {

        public NameValueCollectionData()
        {
        }

        public NameValueCollection GetQueryStringCollection(string url)
        {
            string keyValue = string.Empty;
            NameValueCollection collection = new NameValueCollection();
            string[] querystrings = url.Split('&');
            if (querystrings != null && querystrings.Count() > 0)
            {
                for (int i = 0; i < querystrings.Count(); i++)
                {
                    string[] pair = querystrings[i].Split('=');
                    collection.Add(pair[0].Trim('?'), ConvertStringArrayToString(pair));
                }
            }
            return collection;
        }

        static string ConvertStringArrayToString(string[] array)
        {
            //
            // Concatenate all the elements into a StringBuilder.
            //
            if (array.Length > 2)
            {
                StringBuilder builder = new StringBuilder();
                for (int i = 1; i < array.Length; i++)
                {
                    builder.Append(HttpUtility.UrlDecode(array[i]));
                    builder.Append("=");
                }

                return builder.ToString().Substring(0, builder.ToString().Length - 1);
            }
            else
            {
                return HttpUtility.UrlDecode(array[1]);
            }
        }

    }
}
