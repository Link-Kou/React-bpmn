import * as React from 'react';
import {Alert} from 'rsuite';
import {IArrayDatas, IFormValue, IStateFormValue} from './index.types';
import {ApiCorrugated, ApiPaper} from '@fetch/api';
import {IntlApi} from '@component/textIntl';
import Dialog from '@component/dialog';


export default class BaseCorrugated extends React.Component<any> {

    /**
     * 加载所有配置
     * @param callback
     */
    protected handlersLoadConfigAll = async (callback: (data: IArrayDatas) => void) => {
        ApiCorrugated.LoadConfigAll((req) => {
            if (req.success) {
                callback?.(req.data)
            } else {
                Alert.warning(req.msg)
                callback?.([])
            }
        })
    }

    /**
     * 添加楞型配置列表
     * @param label
     * @param value
     * @param callbackCloseLoading
     * @param reload
     */
    protected handlersAddConfigItem = async (label: any, value: any, callbackCloseLoading: () => void, reload: () => void) => {
        ApiCorrugated.AddConfigItem({
            name: label,
            type: value
        }, (req) => {
            if (req.success) {
                reload?.()
                Alert.success(IntlApi.Success)
            } else {
                Alert.warning(req.msg)
            }
            callbackCloseLoading?.();
        })
    }

    /**
     * 删除配置
     * @param label
     * @param value
     * @param reload
     */
    protected handlersDelItem = async (label: string, value: string, reload: () => void) => {
        await Dialog.SelectLoad({
            title: IntlApi.IsDelTitle,
            boby: IntlApi.IsDelBody(label),
            callback: (e) => {
                if (e.success) {
                    ApiCorrugated.DelConfigItem({
                        id: value
                    }, (req) => {
                        if (req.success) {
                            Alert.success(IntlApi.Success)
                            reload();
                        } else {
                            Alert.warning(req.msg)
                        }
                        e.close()
                    })
                }
            }
        })
    }

    /**
     * 加载配置子列表
     * @param id
     * @param callbacks
     */
    protected handlersLoadEditList = async (id: any, callbacks?: (v: Array<{ id: string, title: string }>) => void) => {
        ApiCorrugated.LoadConfigItem({type: id}, (req) => {
            if (req.success) {
                callbacks?.(req.data)
            } else {
                Alert.warning(req.msg)
            }
        })
    }

    /**
     * 编辑保存配置列表
     * @param data
     * @param callbackCloseLoading
     * @param reload
     */
    protected handlersEditSave = async (data: Array<{ id: string, title: string, type: number }>, callbackCloseLoading: () => void, reload: () => void) => {
        ApiCorrugated.EditConfigItem(data, (req) => {
            if (req.success) {
                reload?.()
                Alert.success(IntlApi.Success)
            } else {
                Alert.warning(req.msg)
            }
            callbackCloseLoading?.()
        })
    }

    /**
     * 表格加载
     * @param props
     * @param callbackdata
     */
    protected handlersLoadTableData = async (props: {
        activePage: number,
        displayLength: number
    }, callbackdata: (data: Array<IFormValue>, total: number) => void) => {
        const {activePage, displayLength} = props
        ApiCorrugated.LoadCorrugatedProductPage({
            page: activePage,
            itemsPerPage: displayLength
        }, (req) => {
            if (req.success) {
                callbackdata?.(req.data.list, req.data.total);
            }
        })
    }

    /**
     * 显示添加编辑的窗口
     */
    protected handlersShowCorrugatedAddEdit = async (id?: string, callbackData?: (data: IFormValue, dataConfigList: Array<IArrayDatas>, paperProductList: Array<IArrayDatas>) => void) => {

        const fetch1 = new Promise((resolve, reject) => {
            if (id) {
                ApiCorrugated.LoadCorrugatedProduct({
                    id
                }, (req) => {
                    if (req.success) {
                        resolve(req.data)
                    } else {
                        reject(new Error())
                    }
                })
            } else {
                resolve(IStateFormValue)
            }
        })

        const fetch2 = new Promise((resolve, reject) => {
            ApiCorrugated.LoadConfigAll((req) => {
                if (req.success) {
                    resolve(req.data)
                }
                reject(new Error())
            })
        })

        const fetch3 = new Promise((resolve, reject) => {
            ApiPaper.LoadPaperProductList((req) => {
                if (req.success) {
                    resolve(req.data)
                }
                reject(new Error())
            })
        })

        await Promise.all([fetch1, fetch2, fetch3])
            .then((result) => {
                callbackData?.(result[0] as IFormValue, result[1] as Array<IArrayDatas>, result[2] as Array<IArrayDatas>)
            }).catch((error) => {
                Alert.warning(IntlApi.HttpError)
            })
    }

    /**
     * 添加保存
     * @param data
     * @param callbackCloseLoading
     * @param reload
     */
    protected handlersCorrugatedAddSave = async (data: IFormValue, callbackCloseLoading: () => void, reload: () => void) => {
        ApiCorrugated.AddCorrugatedProduct(data, (req) => {
            if (req.success) {
                Alert.success(IntlApi.Success)
                reload();
            } else {
                Alert.warning(req.msg)
            }
            callbackCloseLoading?.()
        })
    }

    /**
     * 编辑保存
     * @param id
     * @param data
     * @param callbackCloseLoading
     * @param reload
     * @constructor
     */
    protected HandlersCorrugatedEditSave = async (id: string, data: IFormValue, callbackCloseLoading: () => void, reload: () => void) => {
        ApiCorrugated.EditCorrugatedProduct({
            id,
            ...data
        }, (req) => {
            if (req.success) {
                Alert.success(IntlApi.Success)
                reload?.()
            } else {
                Alert.warning(req.msg)
            }
            callbackCloseLoading?.();
        })
    }


}
