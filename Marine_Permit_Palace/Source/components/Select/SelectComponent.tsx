import * as React from 'react';

import './SelectComponentStyle.sass'

import './SelectComponentStyle.sass'
import { ReactElement } from 'react';

interface Props {
    inputOptions: Array<string>,
    onChange?: (e) => void
}

class SelectComponent extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    handleSelectChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    propsOnChange = (e) => {
        this.props.onChange(e)
        this.setState({
            value: e.target.value
        })
    }

    generateOptions = (): Array<ReactElement<HTMLOptionElement>> => {

        let inputOptions: Array<string> = this.props.inputOptions
        let optionElements: Array<ReactElement<HTMLOptionElement>> = []

        inputOptions.forEach(option => {
            let newOptionElement: ReactElement<HTMLOptionElement> = (
                <option key={Math.random()} className='select-component-option' value={option}>{option}</option>
            )
            optionElements.push(newOptionElement)
        })

        return optionElements
    }

    render() {

        if(this.props.onChange) {
            return (
                <div>
                <select className='SelectComponent' value={this.state.value} onChange={(e) => this.propsOnChange(e)}>
                    {this.generateOptions()}
                </select>
            </div>
            )
        }

        return (
            <div>
                <select className='SelectComponent' defaultValue={this.state.value} onChange={(e) => this.handleSelectChange(e)}>
                    {this.generateOptions()}
                </select>
            </div>
        );
    }
}

export default SelectComponent;