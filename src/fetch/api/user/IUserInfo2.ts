import {IUrlError} from '../../urlconfig'
import {Fetch, PromiseFetch} from '@fetch/fetchtimeout';


/**
 * 外部用户注册
 */
export interface IReqUserRegister2 {
    phoneNumber: string
    password: string
    verCode: string
}


/**
 * 外部用户注册返回参数
 */
export interface IResUserRegister2 extends IUrlError {

}

/**
 *
 * @param model
 * @param callback
 * @constructor
 */
export function UserInfo2(model: IReqUserRegister2 | undefined, callback: (e: IResUserRegister2) => void) {
    PromiseFetch(callback, Fetch('/sasd', model))
}
