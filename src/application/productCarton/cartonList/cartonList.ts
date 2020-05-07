import * as React from 'react';
import {Alert} from 'rsuite';
import {IReturnCartonProduct} from '../index.types';
import {ApiCarton} from '@fetch/api';

export default class CartonList extends React.Component {

    /**
     * 加载表分页信息
     * @param props
     * @param callback
     */
    protected handlersLoadCartonProductPage = async (props: { activePage: number, displayLength: number }, callback: (data: Array<IReturnCartonProduct>, total: number) => void) => {
        ApiCarton.LoadCartonProductPage({
            page: props.activePage,
            itemsPerPage: props.displayLength
        }, (req) => {
            if (req.success) {
                callback?.(req.data.list, req.data.total)
            } else {
                Alert.warning(req.msg)
            }
        })
    }

}
