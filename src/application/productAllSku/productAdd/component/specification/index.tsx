import * as React from 'react';
import ProductSpecificationGroup from './compose/group';
import {IFormValue} from '../../../index.types';

interface IProps {
    formValue: IFormValue

    onChange?(data: IFormValue): void
}

/**
 *
 * @author lk
 * @date 2020/5/4 01:09
 * @version 1.0
 */
export default class ProductSpecification extends React.Component<IProps> {

    public state = {
        tabledata: this.props.formValue?.specification ?? []
    }

    private _onChange = (value: any) => {
        const {formValue, onChange} = this.props
        this.setState({tabledata: value},
            () => {
                formValue.specification = value
                onChange?.(formValue)
            })
    }

    public render() {
        const {tabledata} = this.state
        return (
            <ProductSpecificationGroup rowdatas={tabledata} onChange={this._onChange}/>
        );
    }
}
