import * as React from 'react';

import './DocumentResultStyle.sass'

interface Props {
    document: {
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
    handleDocument: (document_id: string, document_name: string) => void    
}

class SearchDocumentResult extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            infoStyle: {},
            searchBodyClassName: 'content-body'
        }
    }

    handleOnClick = (e) => {

        if(e.target.className.indexOf('document-field') > -1) {
            this.props.handleDocument(this.props.document.submitted_document_id, this.props.document.document_name)
            return
        }

        if(e.target.className === 'document-title-arrow' || e.target.className === 'document-arrow-container') {
            this.setState({
                infoStyle: this.handleInfoStyle(),
                searchBodyClassName: this.handleSearchBodyClassName()
            })
        }

    }

    handleSearchBodyClassName = () => {
        if(this.state.searchBodyClassName === 'content-body') {
            return 'content-body-open'
        }
        if(this.state.searchBodyClassName === 'content-body-open') {
            return 'content-body'
        }
    }

    handleInfoStyle = () => {
        if(!!!this.state.infoStyle.backgroundColor) {
            return {
                backgroundColor: 'rgb(101, 149, 247)'
            }
        }
        else {
            return {}
        }
        
    }

    getDate = (date) => {

        let returnDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`

        if(returnDate === '0/1/1') {
            return 'Not Complete'
        }
        
        return returnDate
    }

    getAssignedTo = () => {

        let assigned_to = this.props.document.assigned_to
        let assigned_to_elements = []
        
        assigned_to.forEach(user => {
            let newElement = (
                <div key={Math.random()}>{user}</div>
            )
            assigned_to_elements.push(newElement)
        })
        
        return assigned_to_elements
    }

    // Conditional Rendering
    
    render() {
        return (
            <div className='SearchDocumentResult' id={Math.random().toString()} onClick={(e) => {this.handleOnClick(e)}}>
                <div className='document-field document-field-title'>
                {/* <img className='document-link' src="/images/doc_icon.png" alt=""/> */}
                <div className='document-field'>
                    <b className='document-field'>Document Name:</b> {this.props.document.document_name}
                </div>
                <div className='document-field'>
                    <b className='document-field'>Date Created:</b> {this.getDate(new Date(this.props.document.date_created || (this.props.document as any).created_utc))}
                </div>
                <div className='document-arrow-container'>
                    {/* <img className='document-link' src="/images/doc_icon.png" alt=""/> */}
                    <img className='document-title-arrow' src="/images/info-icon-white.png" alt="" style={this.state.infoStyle}/>
                </div>
                </div>
                <div className={this.state.searchBodyClassName}>
                    <div className='document-content-line'>
                        <div><b>Date Last Edited:</b></div>
                        <div>{this.getDate(new Date(this.props.document.date_last_edited || (this.props.document as any).last_modified_utc))}</div>
                    </div>
                    {/* <div className='document-content-line'>
                        <div><b>Assigned By:</b></div>
                        <div>{this.props.document.assigned_by}</div>
                    </div> */}
                    {/* <div className='document-content-line'>
                        <div><b>Assigned To:</b></div>
                        <div className='document-assigned-to-container' >{this.getAssignedTo()}</div>
                    </div> */}
                    <div className='document-content-line'>
                        <div><b>Is Completed:</b></div>
                        <div>{this.props.document.is_completed || (this.props.document as any).is_complete}</div>
                    </div>
                    {/* <div className='document-content-line'>
                        <div><b>Date Completed:</b></div>
                        <div>{this.getDate(new Date(this.props.document.date_completed))}</div>
                    </div> */}
                    <div className='document-content-line'>
                        <div><b>Document Template Name:</b></div>
                        <div>{this.props.document.document_template_name || (this.props.document as any).template_name}</div>
                    </div>
                    {/* <div className='document-content-line'>
                        <div>User Organization:</div>
                        <div>{this.props.document.user_organization}</div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default SearchDocumentResult;