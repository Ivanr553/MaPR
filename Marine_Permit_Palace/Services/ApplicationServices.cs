using Marine_Permit_Palace.Data;
using Marine_Permit_Palace.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Marine_Permit_Palace.Services
{
    public interface IDocumentService : IDataRowPropertiesInterface<Document>
    {
        //Add Docuemnt specific funcitons below
    }
    public interface ISubmittedDocumentService : IDataRowPropertiesInterface<SubmittedDocument>
    {

    }
  
}
