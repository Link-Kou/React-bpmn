import {utilsObject} from '@utils/index'
import _ from 'lodash';
import {IntlApi} from '@component/textIntl';

/**
 * 超时，毫秒
 */
// eslint-disable-next-line camelcase
export const REACT_APP_TimeOut: number = _.toInteger(String(process.env.REACT_APP_TimeOut))

/**
 * 请求预备，毫秒
 */
// eslint-disable-next-line camelcase
export const REACT_APP_TimePrepare: number = _.toInteger(String(process.env.REACT_APP_TimePrepare))

/**
 * 统一数据格式
 * @param msg
 * @constructor
 */
export function ReqError(msg: string | Function): any {
    return {
        code: -10000,
        msg: msg,
        data: null,
        success: false
    }
}

/**
 * 超时监控
 * @param callback 回调
 * @param fetchs 对象
 * @param defaultdata 假数据
 * @constructor
 */
export function PromiseFetch(callback: any, fetchs: (resolve: any, callerror: any) => void, defaultdata?: any): void {
    Promise.race(
        [
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    fetchs(resolve, (fetchreq: any) => {
                        callback(fetchreq)
                    })
                }, REACT_APP_TimePrepare)
            }),
            new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error('request timeout')), REACT_APP_TimeOut)
            })
        ]
    )
        .then((fetchreq: any) => {
            try {
                if (!_.isEmpty(fetchreq)) {
                    utilsObject.isReqBaseObject(fetchreq, (req) => {
                        //请求成功
                        callback({
                            ...req
                        })
                    })
                }
            } catch (e) {
                callback(ReqError(IntlApi.OPSFCFetchError('OPS_ServerError')))
            }
        })
        .catch((e) => {
            //请求失败
            callback(ReqError(IntlApi.OPSFCFetchError('OPS_FetchTimeout')))
        });
}

/**
 * 基本 Fetch
 * @param url
 * @param model
 * @param method
 * @param headers
 * @constructor
 */
export function Fetch(url: string, model: any, method: string = 'POST', headers: any = {'Content-Type': 'application/json'}) {
    /**
     * resolve 成功回调
     * callerror 失败回调
     */
    return (resolve: any, callerror: any) => (
        fetch(url, {
            method,
            headers,
            body: JSON.stringify(model)
        })
            .then(
                //将数据转成json,也可以转成 response.text、response.html
                (response) => {
                    if (response.status === 200) {
                        return response.json()
                    }
                    throw new Error('request error')
                }
            )
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                if (error.message === 'request error') {
                    resolve(ReqError(IntlApi.OPSFCFetchError('OPS_FetchError')))
                } else {
                    //请求失败
                    resolve(ReqError(IntlApi.OPSFCFetchError('OPS_ClientError')))
                }
            }))
}

