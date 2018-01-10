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
    public interface IUserDocumentIntermediateService : IDataRowPropertiesInterface<UserDocumentIntermediate>
    {

    }


    public class UserDocumentIntermediateService : DataRowPropertiesInterfaceImplementation<UserDocumentIntermediate>, IUserDocumentIntermediateService
    {
        public UserDocumentIntermediateService(ApplicationDbContext ctx, UserManager<ApplicationUser> user) : base(ctx, user)
        {
        }
    }
    public class SubmittedDocumentService : DataRowPropertiesInterfaceImplementation<SubmittedDocument>, ISubmittedDocumentService
    {
        public SubmittedDocumentService(ApplicationDbContext ctx, UserManager<ApplicationUser> user) : base(ctx, user)
        {
        }
    }
    //Document must inherit from the base class which inherits the implementation of the interface. 
    //It must also inherit the interface
    public class DocumentService : DataRowPropertiesInterfaceImplementation<Document>, IDocumentService
    {
        public DocumentService(ApplicationDbContext ctx, UserManager<ApplicationUser> user) : base(ctx, user)
        {
        }
        //Implement Specific Funcitons below
    }
}
