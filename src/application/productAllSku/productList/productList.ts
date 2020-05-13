import * as React from 'react';
import {ApiMaterial} from '@fetch/api';
import {IReturnMaterialProductList} from '../index.types';

export default class ProductList extends React.Component<any, any> {

    protected handlersLoadProductPage = async (props: {
        activePage: number,
        displayLength: number
    }, callback: (data: Array<IReturnMaterialProductList>, total: number) => void) => {
        ApiMaterial.LoadMaterialProductPage({
            /**
             * 当前页
             */
            page: 1,
            /**
             * 每页条数
             */
            itemsPerPage: 10
        }, (req) => {
            if (req.success) {
                callback?.(req.data.list, req.data.total)
            }
        })
    }

}
