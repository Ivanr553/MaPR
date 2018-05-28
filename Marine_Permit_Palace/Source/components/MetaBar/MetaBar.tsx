import * as React from 'react'
import { Link } from 'react-router-dom'
import * as $ from 'jquery'

const s = require('./styling/style.sass')

import DocumentList from '../DocumentList/DocumentList'
import DocumentView from '../DocumentView/DocumentView'
import Account from '../Account/Account'
import About from '../About/About'
import HomeView from '../HomeView/HomeView'

export default class MetaBar extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            currentView: '',
            documentResults: [],
            currentDocuments: []
        }
        
        this.getCurrentUser = this.getCurrentUser.bind(this)
        this.handleDocumentListPress = this.handleDocumentListPress.bind(this)
        this.handleDocumentLinkPress = this.handleDocumentLinkPress.bind(this)
        this.handleSettingsPress = this.handleSettingsPress.bind(this)
        this.handleAboutPress = this.handleAboutPress.bind(this)
        this.getDocuments = this.getDocuments.bind(this)
        this.populateDocumentLinks = this.populateDocumentLinks.bind(this)
        this.populateDocumentLinks = this.populateDocumentLinks.bind(this)
    }

    async getCurrentUser() {

        let user = await this.props.getCurrentUser()

        this.setState({
            user: user
        })

    }

    //Will get the documents from the back end, for now is just using a hardcoded object
    async getDocuments() {
        
        let result = {
            documents: [
            {
                id: '23456',
                title: 'NAVMC',
                created_by: 'Officer',
                action_required: 'Fill Out',
                status: 'pending',
                file: 'NAVMC10694.pdf'
            }
            ]
        }

        try {

            let documentList = await $.get('/DocumentSave/GetAllDocuments')
            console.log(documentList)

            let pdfID = documentList[0].idDocument

            let returnPDF = await $.get(`/DocumentSave/GetNewAutoPopulatedFile?document_id=${pdfID}`)
            // console.log(returnPDF)

        } catch(e) {
            console.log(e)
        }

        this.setState({
            documentResults: result.documents
        }, () => {
            this.populateDocumentLinks()
            this.setState({
                currentView: <DocumentList documentResults={this.state.documentResults} viewDocument={this.handleDocumentLinkPress}/>
            }, () => {
                this.props.getCurrentView(this.state.currentView)
            })
        })

    }

    populateDocumentLinks() {

        let documents = this.state.documentResults.slice()
        let documentLinks = []

        for(let i = 0; i < documents.length; i++) {

            let documentLink = 
                <div className='document-link' id={documents[i].file} key={i} data-params={{ id: documents[i].id, document: documents[i]}} onClick={(e) => {this.handleLinkPress(e)}}>
                    {documents[i].title}
                </div>

            documentLinks.push(documentLink)
        }

        this.setState({
            documentLinks: documentLinks
        })

    }

    async handleLinkPress(e) {

        let file = e.target.id

        let setFile = await this.setState({
            file: file
        })


        let setCurrentView = await this.setState({
            currentView: <DocumentView file={this.state.file} />
        })

        let getCurrentView = await this.props.getCurrentView(this.state.currentView)
    }

    async handleDocumentLinkPress(e) {

        let target = e.target

        while (!target.classList.contains('viewable-document')) {
            target = target.parentNode
        }

        let file = target.id

        let setFile = await this.setState({
            file: file
        })


        let setCurrentView = await this.setState({
            currentView: <DocumentView file={this.state.file} />
        })

        let getCurrentView = await this.props.getCurrentView(this.state.currentView)
    }

    handleStudioPress() {
        window.open('/A/App/Studio', '_self')
    }

    handleHomeViewPress() {
        this.setState({
            currentView: <HomeView />
        })
    }

    handleDocumentListPress() {
        this.setState({
            currentView: <DocumentList documentResults={this.state.documentResults} viewDocument={this.handleDocumentLinkPress} />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
        })
    }

    handleSettingsPress() {
        this.setState({
            currentView: <Account getCurrentUser={this.props.getCurrentUser} />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
        })
    }

    handleAboutPress() {
        this.setState({
            currentView: <About />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
        })
    }

    componentDidMount() {
        this.getDocuments()
        this.getCurrentUser()
    }

    render() {

        let studio

        if(this.state.user.authorization > 1) {

            studio = <div className='metabar-link' onClick={this.handleStudioPress}>Studio (Unfinished)</div>

        }

        return(
            <div className='MetaBar'>
                <div className='metabar-link' onClick={this.handleHomeViewPress}>
                    Home
                </div>
                <div className='metabar-link' onClick={this.handleDocumentListPress}>
                    Document List
                </div>
                <div className='document-list-links-container'>
                    {this.state.documentLinks}
                </div>
                {studio}
                <div className='metabar-link' onClick={this.handleSettingsPress}>Account</div>
                {/* <div className='metabar-link' onClick={this.handleAboutPress}>About</div> */}
            </div>
        )
    }

}