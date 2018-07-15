import * as React from 'react';

interface Props {
    documents: Array<any>,
    getDocumentId(document_id: string): void,
    getSelectDocumentComplete(selectDocumentComplete: boolean): void,
    selectDocumentBoolean: boolean

}

class SelectDocument extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleShow = () => {
        if(!this.props.selectDocumentBoolean) {
            let style = {
                display: 'none'
            } 

            return style

        } else {
            let style = {
                display: 'block'
            } 

            return style
        
        }
    }

    getDocumentList = (documents) => {
        let documentList = []

        for(let i = 0; i < documents.length; i++) {

            let document_id = '/dist/documents/' + documents[i].document_id

            let newDocument = 
                <div key={i} className='viewable-document' id={documents[i].idDocument} onClick={(e) => {this.selectDocument(e)}}>
                    <div className='viewable-document-field' id='first-field'>{(i+1) + '.'}</div>
                    <div className='viewable-document-field'>{documents[i].name}</div>
                </div>

            documentList.push(newDocument)
            }

        this.setState({
            documentList: documentList
        })
    }

    selectDocument = (e) => {
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
            document_id: target.id
        }, () => {
            this.giveDocumentId()
            this.giveSelectDocumentComplete()
        })
    }

    //State Management
    giveDocumentId = () => {
        this.props.getDocumentId(this.state.document_id)
    }

    giveSelectDocumentComplete = () => {
        this.props.getSelectDocumentComplete(true)
    }


    //React Lifecycle
    componentWillMount() {
        this.getDocumentList(this.props.documents)
    }

    componentDidMount() {
        this.handleShow()
    }
 
    render() {
        return (
            <div id='SelectDocument' style={this.handleShow()}>
                <div className='documents-header'>Select Template Document</div>
                <div className='document-list-container'>
                    {this.state.documentList}
                </div>
            </div>
        );
    }
}

export default SelectDocument;