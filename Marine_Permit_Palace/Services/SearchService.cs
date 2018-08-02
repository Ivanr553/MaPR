using Marine_Permit_Palace.Controllers;
using Marine_Permit_Palace.Data;
using Marine_Permit_Palace.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Marine_Permit_Palace.Controllers.SearchController;

namespace Marine_Permit_Palace.Services
{

    public interface ISearchService
    {
        List<SearchResultModel> Search(string terms, AdvancedSearchSettings settings);
    }

    public class SearchService : ISearchService
    {
        ApplicationDbContext _context;
        public SearchService(ApplicationDbContext ctx)
        {
            _context = ctx;
        }

        public List<SearchResultModel> Search(string terms, AdvancedSearchSettings settings)
        {
            //Search By Name
           return _context.SubmittedDocument
                .Include(e => e.Assigner)
                .Include(e => e.DocumentAssigneeIntermediates)
                    .ThenInclude(e => e.Assignee)
                .Include(e => e.Document)
                .Where(e => e.Name.Contains(terms))
                .Take(20)
                .Select(e => new SearchResultModel()
                {
                    assigned_by = e.Assigner.Rank + " " + e.Assigner.FirstName + " " + e.Assigner.LastName,
                    assigned_to = e.DocumentAssigneeIntermediates.Select(f => f.Assignee.Rank + " " + f.Assignee.FirstName + " " + f.Assignee.LastName).ToList(),
                    date_completed = e.DateCompletedUtc,
                    date_created = e.DateCreatedUtc,
                    date_last_edited = e.DateLastModifiedUtc,
                    document_id = e.DocumentId,
                    document_name = e.Name,
                    document_template_name = e.Document.TemplateName,
                    is_completed = e.IsCompleted,
                    is_not_completed = !e.IsCompleted,
                    submitted_document_id = e.IdSubmittedDocument,
                    user_organization = e.Assigner.Organization
                })
                .ToList();
        }
    }
}
