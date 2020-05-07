import * as React from 'react';
import {ApiCardboard} from '@fetch/api';
import {Alert} from 'rsuite'
import {IReturnCardboardProduct} from '../index.types';

export default class CardboardList extends React.Component {


    protected handlersLoadCardboardProductPage = async (props: {
        activePage: number,
        displayLength: number
    }, callback: (data: Array<IReturnCardboardProduct>, total: number) => void) => {
        ApiCardboard.LoadCardboardProductPage({
            itemsPerPage: props.displayLength,
            page: props.activePage
        }, (req) => {
            if (req.success) {
                callback?.(req.data.list, req.data.total)
            } else {
                Alert.warning(req.msg)
            }
        })
    }
}
