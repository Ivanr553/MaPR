"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./SearchDocumentResultListStyle.sass");
const SearchDocumentResult_1 = require("../SearchDocumentResult/SearchDocumentResult");
class SearchDocumentResultList extends React.Component {
    constructor(props) {
        super(props);
        this.renderDocumentList = () => {
            let searchDocumentResultList = this.props.searchDocumentResultList.slice();
            // searchDocumentResultList = [
            //     {
            //         document_name: 'Document Name',
            //         document_id: '12345',
            //         date_created: '1/01/2018',
            //         date_last_edited: '7/31/2018',
            //         assigned_by: 'Greg',
            //         assigned_to: ['Brad', 'Tom'],
            //         is_completed: true,
            //         document_template_name: 'Template Name',
            //         user_organization: 'User Organization',
            //         date_completed: '7/20/2018'
            //     }
            // ]
            let searchDocumentElements = [];
            searchDocumentResultList.forEach(searchDocument => {
                let newElement = (React.createElement(SearchDocumentResult_1.default, { key: Math.random(), searchDocument: searchDocument, handleSearchDocument: this.props.handleSearchDocument }));
                searchDocumentElements.push(newElement);
            });
            return searchDocumentElements;
        };
        this.state = {};
    }
    render() {
        return (React.createElement("div", { className: 'SearchDocumentResultList' }, this.renderDocumentList()));
    }
}
exports.default = SearchDocumentResultList;
//# sourceMappingURL=SearchDocumentResultList.js.map