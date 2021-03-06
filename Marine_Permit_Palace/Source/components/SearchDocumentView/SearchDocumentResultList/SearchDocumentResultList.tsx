import * as React from 'react';
import { ReactElement } from 'react';

import './SearchDocumentResultListStyle.sass'

import DocumentResult from '../../DocumentResult/DocumentResult'

interface Props {
    searchDocumentResultList: Array<any>,
    handleDocument: (document_id: string, document_name: string) => void,
    searching: boolean
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

    renderLoadingList = () => {

        if(this.props.searching && this.props.searchDocumentResultList.length === 0) {

            let loadingArray = []

            for(let i = 0; i <= 3; i++) {

                let style: React.CSSProperties = {
                    animationDelay: `${0.3 * (i/4)}s`
                }

                let loadingDiv =  (
                    <div key={Math.random()} className='loading-document-result' style={style}>Searching...</div>
                )

                loadingArray.push(loadingDiv)

            }

            return loadingArray

        }


    }

    render() {
        return (
            <div className='SearchDocumentResultList'>
                {this.renderDocumentList()}
                {this.renderLoadingList()}
            </div>
        );
    }
}

export default SearchDocumentResultList;