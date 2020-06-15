import * as React from 'react';
import {Input} from 'rsuite';
import {FormControlBaseProps} from 'rsuite/lib/@types/common';

interface IPropsInputTextArea extends FormControlBaseProps<any> {
    rows?: number
    maxLenght?: number
}

const style: React.CSSProperties = {
    position: 'absolute',
    right: 6,
    bottom: 0,
    color: '#c6c6c6'
}


/**
 * 自定义多行文本字数控制
 * @author lk
 * @date 2020/4/20 15:55
 * @version 1.0
 */
const HookInputTextArea = (props: IPropsInputTextArea | any): any => {
    //const [lenght, setLenght] = React.useState(0);
    const {maxLenght, value, rows} = props
    return <>
        <Input {...props}
               style={{minHeight: 'auto'}}
               cols="44"
               componentClass="textarea"
               onChange={(e) => {
                   if (e.split('\n').length <= rows) {
                       if (e.length <= maxLenght) {
                           props?.onChange(e)
                       }
                   }
               }}/>
        <span style={style}>{value?.length}/{maxLenght}</span>
    </>
}

export default HookInputTextArea
