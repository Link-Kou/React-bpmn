import {IPageReqData, IPageResData, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';

export interface IReqLoadFilePage extends IPageResData {
}

export interface IResLoadFilePage extends IPageReqData {
    data: {
        total: number
        list: Array<{
            id: string
            /**
             * 文件名
             */
            name: string
            /**
             * 后缀
             */
            suffix: string
            /**
             * 后缀
             */
            suffixDot: string
            md5: string
            createtime: string
            updatedtime: string
        }>
    }
}

/**
 * 获取到文件资源
 * @param model
 * @param callback
 * @constructor
 */
export function LoadFilePage(model: IReqLoadFilePage, callback: (e: IResLoadFilePage) => void) {
    PromiseFetch(callback, Fetch(Url.getFile('/resource/pages/dfdf.do'), model))
}
