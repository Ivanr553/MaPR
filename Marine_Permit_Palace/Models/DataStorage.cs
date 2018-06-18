using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Models
{
    public enum AppDataType { MISC, IMAGE, SIGNATURE, DOCUMENT }
    public class DataStorage : DataRowProperties
    {
        public DataStorage()
        {
            DocumentSignatureFields = new HashSet<DocumentSignatureField>();
        }
        public Guid IdDataStorage { get; set; }
        public string Notes { get; set; }
        public byte[] Data { get; set; }
        public AppDataType Type { get; set; }


        public ICollection<DocumentSignatureField> DocumentSignatureFields { get; set; }
    }
}
