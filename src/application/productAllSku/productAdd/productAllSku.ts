import * as React from 'react';
import {Alert} from 'rsuite';
import {ApiMaterial} from '@fetch/api';
import {IFormValue} from '../index.types';


interface IState {
    formValue: IFormValue
    loader: boolean
    id: any
    cellData: Array<any>
    /**
     * 规格多图
     */
    specImage: boolean
}

export default class ProductAllSku extends React.Component<any, IState> {

    /**
     * 添加保存
     * @param formValue
     * @param id
     * @param callbackClose
     */
    protected handlersAddOrEditMaterial = async (formValue: IFormValue, id?: string, callbackClose?: () => void) => {
        if (id) {
            ApiMaterial.EditMaterialProduct({
                id,
                ...formValue
            }, (req) => {
                if (req.success) {
                    Alert.success('保存成功')
                    callbackClose?.()
                } else {
                    Alert.warning(req.msg)
                }
            })
        } else {
            ApiMaterial.AddMaterialProduct(formValue, (req) => {
                if (req.success) {
                    Alert.success('添加成功')
                    callbackClose?.()
                } else {
                    Alert.warning(req.msg)
                }
            })
        }

    }


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
                //从新构建数据
                const newFormValue: IFormValue = {
                    //region 基础数据
                    /**
                     * 标题
                     */
                    name: data.name,
                    /**
                     * 描述
                     */
                    subname: data.subname,
                    /**
                     * 品牌名称
                     */
                    brandName: data.brandName,
                    /**
                     * 商品单位
                     */
                    productUnit: data.productUnit,
                    /**
                     * 产品编码
                     */
                    productCode: data.productCode,
                    /**
                     * 产品产地
                     */
                    productOrigin: data.productOrigin,
                    /**
                     * 产品型号
                     */
                    productModel: data.productModel,
                    /**
                     * 商品类型
                     */
                    productType: data.productType,
                    /**
                     * 商品重量
                     */
                    productWeight: data.productWeight,
                    /**
                     * 商品长度
                     */
                    productLength: data.productLength,
                    /**
                     * 商品体积
                     */
                    productVolume: data.productVolume,
                    /**
                     * 价格显示模式
                     * 1:优惠价 2:对比价
                     */
                    priceMode: data.priceMode,
                    /**
                     * 销售模式
                     * 1:零售;2:批发3:都支持;
                     */
                    salesModel: data.salesModel,
                    /**
                     * 市场价
                     */
                    marketPrice: data.preferentialPrice,
                    /**
                     * 优惠价
                     */
                    preferentialPrice: data.preferentialPrice,
                    //endregion
                    /**
                     * 图片
                     */
                    images: {
                        main: '',
                        logo: '',
                        detailsMain: [],
                        detailsList: []
                    },
                    sku: [
                        {
                            id: '',
                            name: '',
                            value: [],
                            image: false
                        }
                    ],
                    skuTable: [],
                    specification: [
                        {
                            id: '',
                            key: '',
                            value: [{
                                id: '',
                                key: '',
                                main: false,
                                value: '',
                                order: 0
                            }],
                            order: 0
                        }
                    ]
                }
                //合并图像
                data.images.forEach((k, i, a) => {
                    if (k.type === 1) {
                        newFormValue.images.main = k.url
                    }
                    if (k.type === 2) {
                        newFormValue.images.detailsMain.push(k.url)
                    }
                    if (k.type === 3) {
                        newFormValue.images.detailsList.push(k.url)
                    }
                    if (k.type === 4) {
                        newFormValue.images.logo = k.url
                    }
                })
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
                //合并 包装与规格
                newFormValue.specification = data.specification.map((k, i, a) => {
                    return {
                        id: k.businessId,
                        key: k.name,
                        value: k.packagingValue.map((k1, i1, a1) => {
                            return {
                                id: k1.businessId,
                                key: k1.name,
                                main: k1.isMain,
                                value: k1.value,
                                order: k1.rowIndex
                            }
                        }),
                        order: k.rowIndex
                    }
                }) as any

                callback?.(newFormValue)
            }
        })
    }

}
