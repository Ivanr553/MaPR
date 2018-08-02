import * as React from 'react';

import {getSearchDocumentPromise} from '../../services/services'
import SelectComponent from '../Select/SelectComponent';
import SearchDocumentResultList from './SearchDocumentResultList/SearchDocumentResultList';
import Button from '../Button/Button';

import './SearchDocumentViewStyle.sass'

interface Props {
    handleSearchDocument: (document_id: string, document_name: string) => void,
    documents?: any
}

class SearchDocumentView extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            documents: [],
            document_name: '',

            //Change back to default when that is created
            // switch_value: '1'
        }
    }

    handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            this.getSearchDocumentResults()
        }
    }

    getSearchDocumentResults = async () => {
        let document_name = this.state.document_name
        // let switch_value = this.state.switch_value
        let url = `/Search/SubmittedDocuments?search_terms=${document_name}`
        let searchDocumentPromise = await getSearchDocumentPromise(url)

        this.setState({
            searchDocumentPromise: searchDocumentPromise
        })

        let request = await searchDocumentPromise.promise
        let response = await request.json()

        this.setState({
            documents: response
        })
    }

    handleInputChange = (e, value) => {
        this.setState({
            [value]: e.target.value
        })
    }

    componentWillUnmount() {
        if(!!this.state.searchDocumentPromise) {
            this.state.searchDocumentPromise.cancel()
        }
    }

    render() {
        return (
            <div className='SearchDocumentView'>
                <div className='documents-header'>Document Search</div>
                <div className='search-document-search-container'>
                    <input autoComplete='off' onKeyDown={(e) => this.handleKeyDown(e)} onChange={(e) => {this.handleInputChange(e, 'document_name')}} id='user-search-bar' placeholder='Document Name' type="text"/>
                    {/* <SelectComponent inputOptions={['1', '2']} onChange={(e) => this.handleInputChange(e, 'switch_value')} /> */}
                    <div className='search-button-container'>
                        <Button secondaryColor='white' color='rgb(38, 107, 168)' innerText='Search' onClickHandler={this.getSearchDocumentResults} />
                    </div>
                </div>
                <div className='documents-header'>Search Results</div>
                <SearchDocumentResultList handleSearchDocument={this.props.handleSearchDocument} searchDocumentResultList={this.state.documents} />
            </div>
        );
    }
}

export default SearchDocumentView;