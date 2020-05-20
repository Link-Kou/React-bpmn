import * as React from 'react';
import {InputNumber} from 'rsuite';
import BigNumber from 'bignumber.js';


interface IPropsInputPicker {
    callbackChange: (value: any, data: any) => any

    decimalPlaces?: number

    [x: string]: any
}


/**
 * 自定义小数输入选择器
 * @author lk
 * @date 2020/4/20 15:55
 * @version 1.0
 */
const HookInputDecimalNumber = (props: IPropsInputPicker | any): any => {
    const {onChange, data, callbackChange, decimalPlaces} = props
    /**
     * 判断小数
     * @param value
     */
    const dot = (value: any) => {
        const split = value?.split('.');
        if (split?.length === 2) {
            if (split[1]) {
                return true
            }
        }
        return false
    }
    return <InputNumber {...props}
                        onChange={(value, event) => {
                            let never = value;
                            if (callbackChange) {
                                if (dot(value)) {
                                    never = callbackChange?.(value, data);
                                    onChange(never)
                                    return;
                                }
                            } else if (decimalPlaces) {
                                if (dot(never)) {
                                    const bigNumber = new BigNumber(never);
                                    never = bigNumber.dp(decimalPlaces, BigNumber.ROUND_DOWN).toString()
                                    onChange(never)
                                    return;
                                }
                            }
                            onChange(never)
                        }}/>
}

export default HookInputDecimalNumber
