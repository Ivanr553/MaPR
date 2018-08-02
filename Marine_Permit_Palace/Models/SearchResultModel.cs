using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class SearchResultModel
    {
        public Guid submitted_document_id { get; set; }
        public Guid document_id { get; set; }
        public string document_name { get; set; }
        public DateTime date_created { get; set; }
        public DateTime? date_last_edited { get; set; }
        public string assigned_by { get; set; }
        public List<string> assigned_to { get; set; }
        public bool is_completed { get; set; }
        public bool is_not_completed { get; set; }
        public string document_template_name { get; set; }
        public string user_organization { get; set; }
        public DateTime? date_completed { get; set; }

    }
}
