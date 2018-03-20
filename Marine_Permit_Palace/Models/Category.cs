using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public class Category : UserEditableDataRowProperties
    {
        public Category()
        {
            UserDocumentCategories = new HashSet<UserDocumentCategory>();
            Documents = new HashSet<Document>();
        }
        //PK
        public Guid IdCategory { get; set; }
        //
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<UserDocumentCategory> UserDocumentCategories { get; set; }
        public ICollection<Document> Documents { get; set; }
    }
}
