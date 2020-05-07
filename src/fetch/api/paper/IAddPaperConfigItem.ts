import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqAddPaperConfigItem {
    name: string
    //1=供应商;2=纸张等级;3=原纸类型
    paperConfigType: number
}


export interface IResAddPaperConfigItem extends IUrlError {

}

/**
 * 添加原纸配置列表
 * @param callback
 * @constructor
 */
export function AddPaperConfigItem(model: IReqAddPaperConfigItem, callback: (e: IResAddPaperConfigItem) => void) {
    PromiseFetch(callback, Fetch(Url.getPaper('/config/add.do'), model))
}
