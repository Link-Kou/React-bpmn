import * as React from 'react';
import {ApiCardboard, ApiCorrugated, ApiPaper} from '@fetch/api';
import {Alert} from 'rsuite';
import {IntlApi} from '@component/textIntl';
import {IBaseCorrugated, IBasePaper, IFormValue} from '../index.types';

interface IProps {
    location?: {
        pathname?: string
        search?: string
        state?: any
    }
}

interface IState {
    formValue: IFormValue,
    id?: string,
    basePaper: Array<IBasePaper>,
    corrugated: Array<IBaseCorrugated>,
    loader: boolean
}

/**
 *
 * @author lk
 * @date 2020/4/27 15:32
 * @version 1.0
 */
export default class CardboardAdd extends React.Component<IProps, IState> {

    /**
     * 加载楞型与原纸
     * @param callback
     */
    protected handlersLoadPaperAndCorrugated = async (callback: (basePaper: Array<IBasePaper>, corrugated: Array<IBaseCorrugated>) => void) => {
        const fetch1 = new Promise((resolve, reject) => {
            ApiPaper.LoadPaperProductList((req) => {
                if (req.success) {
                    resolve(req.data)
                } else {
                    reject(new Error())
                }
            })
        })
        const fetch2 = new Promise((resolve, reject) => {
            ApiCorrugated.LoadCorrugatedProductList((req) => {
                if (req.success) {
                    resolve(req.data)
                } else {
                    reject(new Error())
                }
            })
        })
        Promise.all([fetch1, fetch2])
            .then((result) => {
                callback?.(result[0] as Array<IBasePaper>, result[1] as Array<IBaseCorrugated>)
            })
            .catch((error) => {
                Alert.warning(IntlApi.HttpError)
            })
    }

    /**
     * 添加或保存纸板
     */
    protected handlersAddOrEditCardboard = async (formValue: IFormValue, id?: string, callbackClose?: () => void) => {
        if (id) {
            ApiCardboard.EditCardboardProduct({
                ...formValue,
                id
            }, (req) => {
                if (req.success) {
                    Alert.success('成功')
                } else {
                    Alert.warning(req.msg)
                }
                callbackClose?.();
            })
        } else {
            ApiCardboard.AddCardboardProduct(formValue, (req) => {
                if (req.success) {
                    Alert.success('成功')
                } else {
                    Alert.warning(req.msg)
                }
                callbackClose?.();
            })
        }

    }

    /**
     * 加载需要编辑的信息
     * @param id
     * @param callback
     */
    protected handlersGetCardboard = async (id: string, callback: (cardboard: IFormValue) => void) => {
        ApiCardboard.LoadCardboardProduct({
            cardboardId: id
        }, (req) => {
            if (req.success) {
                const {images, layers} = req.data
                const newImages: { main: Array<string>, details: Array<string> } = {
                    main: [],
                    details: []
                }
                images.forEach((k, i, a) => {
                    if (k.type === 1) {
                        newImages.main.push(k.url)
                    }
                    if (k.type === 2) {
                        newImages.details.push(k.url)
                    }
                })
                const cardboard: IFormValue = {
                    ...req.data,
                    layers: layers,
                    images: newImages
                }
                callback?.(cardboard)
            } else {
                Alert.warning(req.msg)
            }
        })
    }
}
