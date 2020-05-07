import * as React from 'react';
import {CheckPicker} from 'rsuite';

interface IPropsInputPicker {

    valueKey: string,

    labelKey: string,

    /**
     * 下拉框渲染的容器
     */
    container?: any

    /**
     * 数据改变
     * @param value
     * @param data
     * @param callbackForm
     */
    callbackChange?: (value: Array<any>, data: Array<any>, callbackForm: () => void) => void

    /**
     * value 进行格式化处理
     * @param value
     */
    callbackValue?: (value: Array<any>) => Array<any>

    [x: string]: any
}

/**
 * 自定义的Number输入
 * @author lk
 * @date 2020/4/20 15:55
 * @version 1.0
 */
const _HookCheckPicker = (props: IPropsInputPicker | any): any => {
    const {onChange, data, callbackChange, container, value: values, callbackValue}: {
        onChange: (v: any) => void, data: Array<any>,
        callbackChange: (value: any, data: any, callbackForm: () => void) => void,
        container: any,
        value: Array<any>,
        callbackValue: (value: Array<any>) => Array<any>
    } = props
    const array = callbackValue?.(values) ?? [];
    return (
        <CheckPicker {...props}
                     container={container}
                     value={array}
                     onChange={(value, event) => {
                         if (callbackChange) {
                             callbackChange?.(value, data, () => {
                                 onChange(value)
                             })
                         } else {
                             onChange(value)
                         }
                     }}/>
    )
}

export default _HookCheckPicker
