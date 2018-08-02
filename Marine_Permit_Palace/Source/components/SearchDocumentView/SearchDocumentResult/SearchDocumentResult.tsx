import * as React from 'react';

import './SearchDocumentResultStyle.sass'

interface Props {
    searchDocument: {
        document_name: string,
        document_id: string,
        submitted_document_id: string,
        date_created: string,
        date_last_edited: string,
        assigned_by: string,
        assigned_to: Array<string>
        is_completed: boolean,
        document_template_name: string,
        user_organization: string,
        date_completed: string
    },
    handleSearchDocument: (document_id: string, document_name: string) => void    
}

class SearchDocumentResult extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            arrowClassName: 'search-document-title-arrow',
            searchBodyClassName: 'search-content-body'
        }
    }

    handleOnClick = (e) => {

        if(e.target.className === 'search-document-content-line' || e.target.className === '') {
            return
        }

        if(e.target.className === 'search-document-link') {
            this.props.handleSearchDocument(this.props.searchDocument.submitted_document_id, this.props.searchDocument.document_name)
            return
        }

        this.setState({
            arrowClassName: this.handleArrowStyle(),
            searchBodyClassName: this.handleSearchBodyClassName()
        })
    }

    handleSearchBodyClassName = () => {
        if(this.state.searchBodyClassName === 'search-content-body') {
            return 'search-content-body-open'
        }
        if(this.state.searchBodyClassName === 'search-content-body-open') {
            return 'search-content-body'
        }
    }

    handleArrowStyle = () => {
        if(this.state.arrowClassName === 'search-document-title-arrow') {
            return 'search-document-title-arrow-open'
        }
        if(this.state.arrowClassName === 'search-document-title-arrow-open') {
            return 'search-document-title-arrow'
        }
    }

    getStyle = () => {

        // if(false) {

        //     return {
        //         border: 'solid 2px rgba(38, 107, 168, 0.7)'
        //     }
        // }

        // if(true) {
            
        //     return {
        //         border: 'solid 2px rgba(0, 0, 0, 0)'
        //     }
        // }

    }

    getAssignedTo = () => {

        let assigned_to = this.props.searchDocument.assigned_to
        let assigned_to_elements = []
        
        assigned_to.forEach(user => {
            let newElement = (
                <div key={Math.random()}>{user}</div>
            )
            assigned_to_elements.push(newElement)
        })
        
        return assigned_to_elements
    }
    
    render() {
        return (
            <div className='SearchDocumentResult' id={Math.random().toString()} onClick={(e) => {
                // this.props.selectDocument(e)
                this.handleOnClick(e)
                }}>
                <div className='search-document-field search-document-field-title'>
                <img className='search-document-link' src="/images/doc_icon.png" alt=""/>
                <div className='search-document-field'>
                    Document Name: {this.props.searchDocument.document_name}
                </div>
                <div className='search-document-field'>
                    Date Created: {this.props.searchDocument.date_created}
                </div>
                    <img className={this.state.arrowClassName} src="/images/down-arrow-1.png" alt=""/>
                </div>
                <div className={this.state.searchBodyClassName}>
                    <div className='search-document-content-line'>
                        <div>Date Last Edited:</div>
                        <div>{this.props.searchDocument.date_last_edited}</div>
                    </div>
                    <div className='search-document-content-line'>
                        <div>Assigned By:</div>
                        <div>{this.props.searchDocument.assigned_by}</div>
                    </div>
                    <div className='search-document-content-line'>
                        <div>Assigned To:</div>
                        <div className='search-document-assigned-to-container' >{this.getAssignedTo()}</div>
                    </div>
                    <div className='search-document-content-line'>
                        <div>Is Completed:</div>
                        <div>{this.props.searchDocument.is_completed}</div>
                    </div>
                    <div className='search-document-content-line'>
                        <div>Document Template Name:</div>
                        <div>{this.props.searchDocument.document_template_name}</div>
                    </div>
                    <div className='search-document-content-line'>
                        <div>User Organization:</div>
                        <div>{this.props.searchDocument.user_organization}</div>
                    </div>
                    <div className='search-document-content-line'>
                        <div>Date Completed:</div>
                        <div>{this.props.searchDocument.date_completed}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchDocumentResult;