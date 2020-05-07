import * as React from 'react';
import {InputGroup, InputNumber} from 'rsuite';


interface IProps {

    prefix?: any

    postfix?: any

    [x: string]: any
}

/**
 * 自定义的Number输入
 * @author lk
 * @date 2020/4/20 15:55
 * @version 1.0
 */
const _HookNumber = (props: IProps): any => {
    return (
        <InputGroup>
            <InputNumber {...props}/>
        </InputGroup>
    )
}

export default _HookNumber
