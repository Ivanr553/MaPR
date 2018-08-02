import * as React from 'react';
import { ReactElement } from 'react';

import './SearchDocumentResultListStyle.sass'

import DocumentResult from '../../DocumentResult/DocumentResult'

interface Props {
    searchDocumentResultList: Array<any>,
    handleDocument: (document_id: string, document_name: string) => void
}

class SearchDocumentResultList extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    renderDocumentList = (): Array<ReactElement<HTMLElement>> => {
        let searchDocumentResultList = this.props.searchDocumentResultList.slice()
        let searchDocumentElements: Array<ReactElement<HTMLElement>> = []
        
        searchDocumentResultList.forEach(document => {
            let newElement: ReactElement<HTMLElement> = (
                <DocumentResult key={Math.random()} document={document} handleDocument={this.props.handleDocument} />
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