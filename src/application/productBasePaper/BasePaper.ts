import * as React from 'react';
import {ApiPaper} from '@fetch/api';
import {Alert} from 'rsuite';
import Dialog from '@component/dialog';
import {IntlApi} from '@component/textIntl';
import {IArrayDatas, IStateFormValue, IFormValue} from './index.types'


export default class BasePaper extends React.Component<any> {


    /**
     * 添加原纸配置列表
     */
    protected handlersOnAddConfigItem = async (name: string, paperConfigType: number, callbackCloseLoading: () => void, reload: () => void) => {
        await ApiPaper.AddPaperConfigItem({
            name,
            paperConfigType
        }, (req) => {
            if (req.success) {
                Alert.success(IntlApi.Success)
                reload()
            } else {
                Alert.warning(req.msg)
            }
            callbackCloseLoading()
        })
    }


    /**
     * 删除原纸配置列表
     */
    protected handlersDelConfigItem = async (label: string, value: string, reload: () => void) => {
        await Dialog.SelectLoad({
            title: IntlApi.IsDelTitle,
            //`是否对${label}进行删除`
            boby: IntlApi.IsDelBody(label),
            callback: (e) => {
                if (e.success) {
                    ApiPaper.DelPaperConfigItem({
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
     * 保存配置
     * @param data
     * @param callbackCloseLoading
     * @param reload
     */
    protected handlersSaveConfigItemList = async (data: Array<{ id: string, title: string }>, callbackCloseLoading: () => void, reload: () => void) => {
        await ApiPaper.EditPaperConfigItem(data, (req) => {
            if (req.success) {
                Alert.success('保存成功')
                reload()
            } else {
                Alert.warning(req.msg)
            }
            callbackCloseLoading?.()
        })
    }

    /**
     * 加载原纸所有配置列表
     */
    protected handlersOnLoadConfigList = async (callback: (data: Array<IArrayDatas>) => void) => {
        await setTimeout(() => {
            ApiPaper.LoadPaperConfigList((req) => {
                if (req.success) {
                    callback(req.data)
                } else {
                    callback([])
                    Alert.warning(req.msg)
                }
            })
        }, 500)
    }

    /**
     * 加载原纸配置Item列表
     */
    protected handlersLoadPaperConfigItemLis = async (id?: any, callback?: (v: Array<{ id: string, title: string }>) => void) => {
        await ApiPaper.LoadPaperConfigItemList({
            paperConfigType: id
        }, (req) => {
            if (req.success) {
                callback?.(req.data)
            } else {
                callback?.([])
            }
        })
    }


    /**
     * 加载表格列表
     */
    protected handleILoadPagesPaperProductList = async (props: { activePage: number, displayLength: number }, callbackdata: (data: Array<IFormValue>, total: number) => void) => {
        const {activePage, displayLength} = props
        ApiPaper.LoadPagesPaperProductList({
            page: activePage,
            itemsPerPage: displayLength
        }, (req) => {
            if (req.success) {
                callbackdata?.(req.data.list, req.data.total)
            } else {
                Alert.warning(req.msg)
                callbackdata?.([], 0)
            }
        })
    }

    /**
     * 添加原纸产品
     * @param data
     * @param callbackCloseLoading
     * @param reload
     */
    protected handlerPaperAddSave = async (data: IFormValue, callbackCloseLoading: () => void, reload: () => void) => {
        ApiPaper.AddPaperProduct(data, (req) => {
            if (req.success) {
                Alert.success(IntlApi.Success)
                reload()
            } else {
                Alert.warning(req.msg)
            }
            callbackCloseLoading?.()
        })
    }

    /**
     * 保存原纸产品
     * @param id
     * @param data
     * @param callbackCloseLoading
     * @param reload
     */
    protected handlerPaperEditSave = async (id: string, data: IFormValue, callbackCloseLoading: () => void, reload: () => void) => {
        ApiPaper.EditPaperProduct({
            id: id,
            ...data
        }, (req) => {
            if (req.success) {
                Alert.success(IntlApi.Success)
                reload()
            } else {
                Alert.warning(req.msg)
            }
            callbackCloseLoading?.()
        })
    }

    /**
     * 获取原纸配置以及加载原纸产品信息
     * @param id
     * @param callbackData
     */
    protected handlersShowPaperAddEdit = async (id?: string | number, callbackData?: (data: IFormValue, dataConfigList: Array<IArrayDatas>) => void) => {
        const fetch1 = new Promise((resolve, reject) => {
            if (id) {
                ApiPaper.LoadPaperProduct({id}, (req) => {
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
            ApiPaper.LoadPaperConfigList((req) => {
                if (req.success) {
                    resolve(req.data)
                } else {
                    reject(new Error())
                }
            })
        })
        await Promise.all([fetch1, fetch2])
            .then((result) => {
                callbackData?.(result[0] as IFormValue, result[1] as Array<IArrayDatas>)
            }).catch((error) => {
                Alert.warning(IntlApi.HttpError)
            })
    }


}
