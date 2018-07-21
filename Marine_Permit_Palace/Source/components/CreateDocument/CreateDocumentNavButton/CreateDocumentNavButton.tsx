import * as React from 'react';
import { CSSProperties } from 'react';

interface Props {
    onClickHandler: () => void,
    innerText: string,
    id: string,
    complete: boolean,
    disable: boolean,
    selected: boolean
}

class CreateDocumentNavButton extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    getCheckmark = (): JSX.Element => {

        let style: CSSProperties

        if(this.props.complete) {

            style = {
                width: '3vh',
                height: 'auto',
                marginLeft: '2vw'
            }

            let checkmark = (
                <img style={style} src="../../images/check.png" alt=""/>
            )

            return checkmark

        } else {

            style = {
                width: '2vh',
                height: 'auto',
                marginLeft: '2vw',
                padding: '0.5vh 0 0.5vh 0'
            }

            return <img style={style} src="../../images/circle.png" alt=""/>

        }

    }

    getStyle = (): CSSProperties => {

        let style: CSSProperties


        if(this.props.disable) {

            style = {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                cursor: 'default',
                color: 'lightgrey'
            }

            return style

        }

        if(this.props.complete) {

            style = {
                backgroundColor: (this.props.selected ? 'rgba(131, 198, 134, 0.3)' : 'rgba(131, 198, 134, 0.1)'),
            }


            return style

        }
        if(!this.props.complete) {

            style = {
                backgroundColor: (this.props.selected ? 'rgb(50, 50, 50)' : '')
            }

            return style

        }


    }


    manageOnClickHandler = (): () => void => {

        if(this.props.disable) {
            return
        }

        return this.props.onClickHandler

    }

    componentDidMount() {

    }

    render() {
        return (
            <div id={this.props.id} className='create-document-nav-bar-item' style={this.getStyle()} onClick={this.manageOnClickHandler()}>
                {this.props.innerText}
                {this.getCheckmark()}
            </div>
        );
    }
}

export default CreateDocumentNavButton;