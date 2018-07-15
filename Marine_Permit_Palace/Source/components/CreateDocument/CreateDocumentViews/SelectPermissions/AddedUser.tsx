import * as React from 'react';

interface Props {
    user: {
        id: number,
        name: string,
        assigned_to: null | number
    },
    assignUserToField: (e: React.MouseEvent) => void,
    deleteUser: (e: React.MouseEvent) => void,
    isInSidebar: boolean
}


class AddedUser extends React.Component<Props, any> {

    getStyle = () => {

        if(this.props.isInSidebar) {
            
            let style = {
                cursor: 'pointer',
                backgroundColor: this.props.user.assigned_to !== null ? 'grey' : ''
            }

            return style
        }
        if(!this.props.isInSidebar) {

            let style = {
                backgroundColor: this.props.user.assigned_to !== null ? 'grey' : ''
            }

            return style
        }
    }

    componentDidMount() {
    }

    render() {

        if(this.props.isInSidebar) {
            return (
                <div style={this.getStyle()} className='added-user' id={this.props.user.id.toString()} onClick={(e) => this.props.assignUserToField(e)}>
                {this.props.user.name}
            </div>
            )
        }

        if(!this.props.isInSidebar) {
            return (
                <div style={this.getStyle()} className='added-user' id={this.props.user.id.toString()}>
                    {this.props.user.name}
                    <div className='added-user-delete-icon' onClick={(e) => {this.props.deleteUser(e)}}>x</div>
                </div>
            )
        }    
    }
}

export default AddedUser;