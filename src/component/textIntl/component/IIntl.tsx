import * as React from 'react';
import {Intl, HookFormattedMessageText} from '../../../Intl'

export const FCFormattedMessageText = (props: { id: string, other: any }) => {
    return (
        <Intl nors={true}>
            <HookFormattedMessageText id={props.id} other={props.other}/>
        </Intl>
    )
}

export const FCFormattedMessageCompone = (props: { id: string, other: any }) => {
    return (
        <Intl nors={true}>
            <HookFormattedMessageText id={props.id} other={props.other}/>
        </Intl>
    )
}

/**
 * 方法调用
 * @constructor
 */
export const OPSFCFetchError: any = (id: string, other?: any) => (
    <FCFormattedMessageText id={id} other={other}/>
)

export const Success: any = OPSFCFetchError('OPS_success')
export const HttpError: any = OPSFCFetchError('OPS_httpError')
export const TitleDel: any = OPSFCFetchError('OPS_isDelTitle')
export const TitleSave: any = OPSFCFetchError('OPS_SaveTitle')

export const IsDelBody = (name: any) => {
    return OPSFCFetchError('OPS_isDelBody', {name: <b><i>{name}</i></b>})
}

/**
 * 信息组合
 * @param start
 * @param name
 * @param end
 * @constructor
 */
export const IsInfo = (start?: any, name?: any, end?: any) => {
    return OPSFCFetchError('OPS_isInfo', {start, name: <b><i>{name}</i></b>, end})
}

