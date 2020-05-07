import {IUrlError, Url} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


export interface IResDelTypeConfigTitleId extends IUrlError {
    /**
     * id
     */
    data: string
}

/**
 * 添加头部
 * @param model
 * @param callback
 * @constructor
 */
export function GetTypeConfigTitleId(callback: (e: IResDelTypeConfigTitleId) => void) {
    PromiseFetch(callback, Fetch(Url.getProduct('/typeconfig/title/all/id/get.do'), {}))
}
