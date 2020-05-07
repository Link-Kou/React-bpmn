import * as React from 'react';
import {InputPicker} from 'rsuite';


interface IPropsInputPicker {
    callbackChange: (value: any, data: any, callbackForm: () => void) => void

    [x: string]: any
}


/**
 * 自定义的Number输入
 * @author lk
 * @date 2020/4/20 15:55
 * @version 1.0
 */
const _HookInputPicker = (props: IPropsInputPicker | any): any => {
    const {onChange, data, callbackChange}: { onChange: (v: any) => void, data: Array<any>, callbackChange: (value: any, data: any, callbackForm: () => void) => void } = props
    return <InputPicker {...props}
                        onChange={(value, event) => {
                            if (callbackChange) {
                                callbackChange?.(value, data, () => {
                                    onChange(value)
                                })
                            } else {
                                onChange(value)
                            }
                        }}/>
}

export default _HookInputPicker
