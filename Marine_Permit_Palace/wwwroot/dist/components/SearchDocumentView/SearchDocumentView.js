"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const services_1 = require("../../services/services");
const SearchDocumentResultList_1 = require("./SearchDocumentResultList/SearchDocumentResultList");
const Button_1 = require("../Button/Button");
require("./SearchDocumentViewStyle.sass");
class SearchDocumentView extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                this.getSearchDocumentResults();
            }
        };
        this.getSearchDocumentResults = () => __awaiter(this, void 0, void 0, function* () {
            let document_name = this.state.document_name;
            // let switch_value = this.state.switch_value
            let url = `/Search/SubmittedDocuments?search_terms=${document_name}`;
            let searchDocumentPromise = yield services_1.getSearchDocumentPromise(url);
            this.setState({
                searchDocumentPromise: searchDocumentPromise
            });
            let request = yield searchDocumentPromise.promise;
            let response = yield request.json();
            console.log(response);
            this.setState({
                documents: response
            });
        });
        this.handleInputChange = (e, value) => {
            this.setState({
                [value]: e.target.value
            });
        };
        this.state = {
            documents: [],
            document_name: '',
        };
    }
    componentWillUnmount() {
        if (!!this.state.searchDocumentPromise) {
            this.state.searchDocumentPromise.cancel();
        }
    }
    render() {
        return (React.createElement("div", { className: 'SearchDocumentView' },
            React.createElement("div", { className: 'documents-header' }, "Document Search"),
            React.createElement("div", { className: 'search-document-search-container' },
                React.createElement("input", { autoComplete: 'off', onKeyDown: (e) => this.handleKeyDown(e), onChange: (e) => { this.handleInputChange(e, 'document_name'); }, id: 'user-search-bar', placeholder: 'Document Name', type: "text" }),
                React.createElement("div", { className: 'search-button-container' },
                    React.createElement(Button_1.default, { secondaryColor: 'white', color: 'rgb(38, 107, 168)', innerText: 'Search', onClickHandler: this.getSearchDocumentResults }))),
            React.createElement("div", { className: 'documents-header' }, "Search Results"),
            React.createElement(SearchDocumentResultList_1.default, { handleSearchDocument: this.props.handleSearchDocument, searchDocumentResultList: this.state.documents })));
    }
}
exports.default = SearchDocumentView;
//# sourceMappingURL=SearchDocumentView.js.map