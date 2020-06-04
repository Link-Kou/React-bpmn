import * as React from 'react';
import {ApiProduct} from '@fetch/api';
import {Alert} from 'rsuite';
import {IntlApi} from '@component/textIntl';
import Dialog from '@component/dialog';
import {IConstant, IData} from './index.types';


/**
 *
 * @author lk
 * @date 2020/4/16 10:00
 * @version 1.0
 */
export default class typeConfig extends React.Component {

    /**
     * 加载其他列表
     * @param callbackdata
     */
    protected handlersOnLoadTypeConfigOtherList = async (callbackdata: (data: Array<IData>) => void) => {
        ApiProduct.LoadTypeConfigOtherTitleList((e) => {
            if (e.success) {
                callbackdata(e.data)
            } else {
                Alert.error(e.msg)
            }
        })
    }

    /**
     * 加载title列表
     * @param callbackdata
     */
    protected handlersOnLoadTypeConfigTitleList = async (callbackdata: (data: Array<IData>) => void) => {
        ApiProduct.LoadTypeConfigAllTitleList((e) => {
            if (e.success) {
                callbackdata(e.data?.children)
            } else {
                Alert.error(e.msg)
            }
        })
    }

    /**
     * 获取到排序列表
     * @param id
     * @param type
     * @param alone
     * @param callback
     */
    protected handlersOnSortableList = async (id: string | undefined, type: 'All' | 'Other', alone: 'title' | 'group' | 'item', callback?: (v: Array<{ id: string, title: string, preId: string }>) => void) => {
        ApiProduct.LoadTypeConfigSortableList({
            parentId: id,
            type,
            alone
        }, (e) => {
            if (e.success) {
                callback?.(e.data)
            } else {
                Alert.error(e.msg)
            }
        })
    }

    /**
     * 保存排序列表
     * @param data
     * @param type
     * @param alone
     * @param callbackCloseLoading
     * @param reload
     */
    protected handlersOnSaveSortableList = async (data: Array<{
        id: string
        title: string
        preId: string
    }>, type: IConstant.types, alone: IConstant.alone, callbackCloseLoading: () => void, reload: () => void) => {
        ApiProduct.EditTypeConfigSortableEdit({
            data,
            type,
            alone: alone
        }, (req) => {
            if (req.success) {
                Alert.success(IntlApi.Success)
                reload()
            } else {
                Alert.error(req.msg)
            }
            callbackCloseLoading?.()
        })
    }

    /**
     * 添加title
     * @param name
     * @param callbackClose
     * @param reload
     */
    protected handlersOnAddOtherTitle = async (name: string, callbackClose: () => void, reload: () => void) => {
        ApiProduct.AddTypeConfigTitle({
            name,
            type: 'Other'
        }, (e) => {
            if (e.success) {
                Alert.success(e.msg)
                reload()
            } else {
                Alert.error(e.msg)
            }
            callbackClose()
        })
    }

    /**
     * 添加group
     * @param parentId
     * @param name
     * @param type
     * @param callbackClose
     * @param reload
     */
    protected handlersOnAddGroup = async (parentId: string, name: string, type: 'All' | 'Other', callbackClose: () => void, reload: () => void) => {
        const api = (id: string) => {
            ApiProduct.AddTypeConfigGroup({
                parentId: id,
                name,
                type
            }, (e) => {
                if (e.success) {
                    Alert.success(e.msg)
                    reload?.()
                } else {
                    Alert.error(e.msg)
                }
                callbackClose()
            })
        }
        if (type === 'All') {
            ApiProduct.GetTypeConfigTitleId((req) => {
                if (req.success) {
                    api(req.data)
                } else {
                    Alert.error(req.msg)
                }
                callbackClose()
            })
        } else {
            api(parentId)
        }
    }

    /**
     * 添加Item
     * @param name
     * @param parentId
     * @param type
     * @param callbackClose
     * @param reload
     */
    protected handlersOnAddItem = async (name: string, parentId: string, type: 'All' | 'Other', callbackClose: () => void, reload: () => void) => {
        ApiProduct.AddTypeConfigItem({
            parentId,
            name,
            type
        }, (e) => {
            if (e.success) {
                Alert.success(e.msg)
                reload?.()
            } else {
                Alert.error(e.msg)
            }
            callbackClose()
        })
    }

    /**
     * 删除title
     * @param label
     * @param value
     * @param type
     */
    protected handlersOnDelTitle = async (label: string, value: string, alone: IConstant.alone, reload: () => void) => {
        Dialog.SelectLoad({
            title: IntlApi.TitleDel,
            boby: IntlApi.IsDelBody(label),
            callback: (e) => {
                if (e.success) {
                    ApiProduct.DelTypeConfigTitle({
                        id: value,
                        type: alone
                    }, (res) => {
                        if (res.success) {
                            e.close(() => {
                                //this.handlersOnLoadTypeConfigTitleList()
                                Alert.success(res.msg)
                            });
                        } else {
                            e.close(() => {
                                Alert.error(res.msg)
                            });
                        }
                    })
                }
            }
        })
    }


}
