import * as React from 'react';
import {IFormValue, IStateFormValue} from '../index.types';
import {ApiMaterial} from '@fetch/api';

interface IProductSkuModal {
    show?: boolean

    id?: string

    onHide?(): void
}


export default class ProductSkuModal extends React.Component<IProductSkuModal, any> {


    /**
     * 加载需要编辑的信息
     * @param id
     * @param callback
     */
    protected handlersGetMaterial = async (id: string, callback: (material: IFormValue) => void) => {
        ApiMaterial.LoadMaterialProduct({
            materialId: id
        }, (req) => {
            if (req.success) {
                //根据后端返回的数据进行重新构建
                const data = req.data
                const newFormValue: IFormValue = {
                    ...IStateFormValue,
                    sku: [
                        {
                            id: '',
                            name: '',
                            value: [],
                            image: false
                        }
                    ],
                    skuTable: []
                }
                //合并SKU
                newFormValue.sku = data.sku.map((k, i, a) => {
                    return {
                        id: k.businessId,
                        name: k.name,
                        value: k.skuSpecList.map((k1, i1, a1) => {
                            return {
                                id: k1.businessId,
                                name: k1.name,
                                image: k1.image
                            }
                        }),
                        image: k.isImage
                    }
                }) as any
                //合并skuTable
                newFormValue.skuTable = data.skuTable.map((k, i, a) => {
                    return {
                        id: k.businessId,
                        disable: k.isDisable,
                        mainImage: k.mainimage,
                        numberStarts: k.numberStarts,
                        numberStock: k.numberStock,
                        marketPrice: k.marketPrice,
                        costPrice: k.costPrice
                    }
                }) as any
                callback?.(newFormValue)
            }
        })
    }


}
