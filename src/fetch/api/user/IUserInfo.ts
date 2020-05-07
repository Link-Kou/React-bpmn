import {IUrlError} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


/**
 * 外部用户注册
 */
export interface IReqUserRegister {
    phoneNumber: string
    password: string
    verCode: string
}


/**
 * 外部用户注册返回参数
 */
export interface IResUserRegister extends IUrlError {

}

/**
 *
 * @param model
 * @param callback
 * @constructor
 */
export function UserInfo(model: IReqUserRegister | undefined, callback: (e: IResUserRegister) => void) {
    PromiseFetch(callback, Fetch('/sasd', model))
}
