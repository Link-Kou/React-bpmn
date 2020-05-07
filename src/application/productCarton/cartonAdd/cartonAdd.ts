import * as React from 'react';
import {
    ICardboardProductCost,
    IFormValue
} from '../index.types';
import {ApiCardboard, ApiCarton} from '@fetch/api';
import {Alert} from 'rsuite';
import {IntlApi} from '@component/textIntl';

interface IProps {
    location?: {
        pathname?: string
        search?: string
        state?: any
    }
}

export default class CartonAdd extends React.Component<IProps> {

    /**
     * 加载所有纸板的成本信息
     */
    protected handlersLoadCardboardProductListCost = async (callback: (data: Array<ICardboardProductCost>) => void) => {
        ApiCardboard.LoadCardboardProductCostList((req) => {
            if (req.success) {
                callback?.(req.data)
            } else {
                Alert.warning(req.msg)
            }
        })
    }

    /**
     * 添加或保存纸箱
     */
    protected handlersAddOrEditCarton = async (data: IFormValue, id?: string, callbackClose?: () => void) => {
        if (id) {
            ApiCarton.EditCartonProduct({
                ...data,
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
            ApiCarton.AddCartonProduct(data, (req) => {
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
     * 获取要编辑的纸箱
     * @param id
     * @param callback
     */
    protected handlersGetCarton = async (id: string, callback: (Carton: IFormValue, Cardboard: Array<ICardboardProductCost>) => void) => {

        const fetch1 = new Promise((resolve, reject) => {
            ApiCarton.LoadCartonProduct({
                cartonId: id
            }, (req) => {
                if (req.success) {
                    const {images} = req.data
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
                    const carton: IFormValue = {
                        ...req.data,
                        images: newImages
                    }
                    resolve(carton)
                    //callback?.(carton)
                } else {
                    reject(new Error())
                }
            })
        })

        const fetch2 = new Promise((resolve, reject) => {
            ApiCardboard.LoadCardboardProductCostList((req) => {
                if (req.success) {
                    resolve(req.data)
                } else {
                    reject(new Error())
                }
            })
        })

        Promise.all([fetch1, fetch2])
            .then((result) => {
                callback?.(result[0] as IFormValue, result[1] as Array<ICardboardProductCost>)
            })
            .catch((error) => {
                Alert.warning(IntlApi.HttpError)
            })


    }

}
