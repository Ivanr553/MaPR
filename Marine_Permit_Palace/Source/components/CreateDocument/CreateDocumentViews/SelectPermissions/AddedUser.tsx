import * as React from 'react';

interface Props {
    user: {
        id: number,
        name: string
    },
    onClickHandler: (e: React.MouseEvent, componentThis) => void,
    componentThis: any
}


class AddedUser extends React.Component<Props, any> {

    componentDidMount() {

    }

    render() {
        return (
            <div key={this.props.user.id.toString()} className='added-user' id={this.props.user.id.toString()}>
                {this.props.user.name}
                <div className='added-user-delete-icon' onClick={(e) => {this.props.onClickHandler(e, this.props.componentThis)}}>x</div>
            </div>
        );
    }
}

export default AddedUser;