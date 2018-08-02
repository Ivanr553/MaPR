import * as React from 'react';
import { ReactElement } from 'react';

import './SearchDocumentResultListStyle.sass'

import SearchDocumentResult from '../SearchDocumentResult/SearchDocumentResult'

interface Props {
    searchDocumentResultList: Array<any>,
    handleSearchDocument: (document_id: string, document_name: string) => void
}

class SearchDocumentResultList extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    renderDocumentList = (): Array<ReactElement<HTMLElement>> => {
        let searchDocumentResultList = this.props.searchDocumentResultList.slice()
        searchDocumentResultList = [
            {
                document_name: 'Document Name',
                document_id: '12345',
                date_created: '1/01/2018',
                date_last_edited: '7/31/2018',
                assigned_by: 'Greg',
                assigned_to: ['Brad', 'Tom'],
                is_completed: true,
                document_template_name: 'Template Name',
                user_organization: 'User Organization',
                date_completed: '7/20/2018'
            }
        ]
        
        let searchDocumentElements: Array<ReactElement<HTMLElement>> = []
        searchDocumentResultList.forEach(searchDocument => {
            let newElement: ReactElement<HTMLElement> = (
                <SearchDocumentResult key={Math.random()} searchDocument={searchDocument} handleSearchDocument={this.props.handleSearchDocument} />
            )
            searchDocumentElements.push(newElement)
        })

        return searchDocumentElements
    }

    render() {
        return (
            <div className='SearchDocumentResultList'>
                {this.renderDocumentList()}
            </div>
        );
    }
}

export default SearchDocumentResultList;