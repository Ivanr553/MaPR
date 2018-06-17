import * as React from 'react'
import * as $ from 'jquery'
import PDF from 'react-pdf-js'

const s = require('./styling/style.sass')

import DocumentList from '../DocumentList/DocumentList'
import DocumentView from '../DocumentView/DocumentView'

export default class CreateDocument extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentResults: this.props.documentResults,
            currentView: '',
            view: '',
            documentList: [],
            document_id: '',
            nextButton: '',
            readyForNext: false
        }

        // this.handleDocumentLinkPress = this.handleDocumentLinkPress.bind(this)
        this.handleSelectDocumentView = this.handleSelectDocumentView.bind(this)
        this.handleSelectPermissionsView = this.handleSelectPermissionsView.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handleBack = this.handleBack.bind(this)
    }

    //Views

    handleNext() {

        if(this.state.view === 'SelectDocument') {

            if(this.state.document_id === '') {
                return
            }

            this.handleSelectPermissionsView()
            return
        }

        if(this.state.view === 'SelectPermissions') {

            return

        }

    }

    handleBack() {

        if(this.state.view === 'SelectPermissions') {

            this.handleSelectDocumentView()
            return
        }

    }

    handleSelectDocumentView() {

        let currentView = (
            <div>
                <div className='documents-header'>Select Template Document</div>
                <div className='document-list-container'>
                    {this.state.documentList}
                </div>
            </div>
        )
        this.setState({
            currentView: currentView,
            view: 'SelectDocument'
        }, () => {
            this.handleButtons()
        })
    }

    handleSelectPermissionsView() {
        let currentView = (
            <div>
                <div className='documents-header'>Select Document Permissions</div>
                <div className='document-list-container'>
                    <div>Selected Document: {this.state.document_id}</div>
                    <div>Send to:</div>
                    <div>Allow viewing priviledge:</div>
                </div>
            </div>
        )
        this.setState({
            currentView: currentView,
            view: 'SelectPermissions'
        }, () => {
            this.handleButtons()
            // this.clearBorder()
        })
    }

    handleButtons() {

        let backButton

        if(this.state.view === 'SelectDocument') {
            
            backButton = ''

            this.setState({
                backButton: backButton
            })
        }

        if(this.state.view === 'SelectPermissions') {
         
            backButton = 
            <button className='create-document-button selectable-button' id='create-document-back-button' onClick={this.handleBack}>
                Back
            </button>

            this.setState({
                backButton: backButton
            })
        }

        let nextButton

        if(!this.state.readyForNext) {

            nextButton =
                <button className='create-document-button' id='create-document-next-button'>
                    Next
                </button>

            this.setState({
                nextButton: nextButton
            }, () => {
                this.forceUpdate()
                return nextButton
            })
        }
        else {

            nextButton =
            <button className='create-document-button selectable-button' id='create-document-next-button' onClick={this.handleNext}>
                Next
            </button>

            this.setState({
                nextButton: nextButton
            }, () => {
                return nextButton
            }) 
        }

    }

    //Creates list in state of objects to be rendered
    renderDocuments() {

        let documents = this.props.documentResults
        let documentList = []

        for(let i = 0; i < documents.length; i++) {

            let file = '/dist/documents/' + documents[i].file

            let newDocument = 
                <div key={i} className='viewable-document' id={documents[i].file} onClick={(e) => {this.selectDocument(e)}}>
                    <div className='viewable-document-field' id='first-field'>{(i+1) + '.'}</div>
                    <div className='viewable-document-field'>{documents[i].title}</div>
                </div>

            documentList.push(newDocument)
            }

        this.setState({
            documentList: documentList
        }, () => {
            this.handleSelectDocumentView()
        })

    }

    selectDocument(e) {
        let target = e.target

        while (!target.classList.contains('viewable-document')) {
            target = target.parentNode
        }

        let parent = target.parentNode

        for(let i = 0; i < parent.children.length; i++) {
            if(parent.children[i].className === 'viewable-document') {
                parent.children[i].style.border = 'solid 2px rgba(0, 0, 0, 0)'
            }
        }

        if(target.classList.contains('viewable-document')) {
            target.style.border = 'solid 2px rgba(38, 107, 168, 0.7)'
        }


        this.setState({
            document_id: target.id,
            readyForNext: true
        }, () => {
            this.handleButtons()
        })

    }

    // clearBorder() {

    //     let children = document.getElementsByClassName('document-list-container')[0].childNodes

    //     for(let i = 0; i < children.length; i++) {
    //         console.log(children[i])
    //     }

    // }

    componentWillMount() {
        this.handleButtons()
        this.renderDocuments()
    }

    render() {

        return(
            <div id='NewDocument'>
                {this.state.currentView}
                <div id='button-container'>
                    {this.state.backButton}
                    {this.state.nextButton}
                </div>
            </div>
        )

    }


}