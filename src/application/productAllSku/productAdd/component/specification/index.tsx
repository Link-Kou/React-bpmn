import * as React from 'react';
import ProductSpecificationGroup from './compose/group';


/**
 *
 * @author lk
 * @date 2020/5/4 01:09
 * @version 1.0
 */
export default class ProductSpecification extends React.Component {

    public state = {
        tabledata: [
            {
                id: '',
                key: '',
                value: [{
                    id: '',
                    key: '',
                    main: true,
                    value: '',
                    order: 0
                }],
                order: 0
            }
        ]
    }

    private _onChange = (value: any) => {
        this.setState({tabledata: value})
    }

    public render() {
        const {tabledata} = this.state
        return (
            <ProductSpecificationGroup rowdatas={tabledata} onChange={this._onChange}/>
        );
    }
}
