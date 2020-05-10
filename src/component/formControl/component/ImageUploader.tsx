import * as React from 'react';
import {ImageUploaderLibraryGroup} from '@common/imageUploader';


interface IImageUploaderLibraryGroup {
    onChange?(value: any): void

    callbackChange: (value: any, fileUrl: Array<any>, callbackForm: () => void) => void


    callbackFileUrl: (value: any) => Array<string>

    [x: string]: any
}


/**
 * 自定义的Number输入
 * @author lk
 * @date 2020/4/20 15:55
 * @version 1.0
 */
const _HookInputPicker = (props: IImageUploaderLibraryGroup | any): any => {
    const {onChange, value, callbackChange, callbackFileUrl} = props
    return (
        <ImageUploaderLibraryGroup maxSize={1}
                                   onChange={(fileUrl) => {
                                       if (callbackChange) {
                                           callbackChange?.(value, fileUrl, () => {
                                               onChange(value)
                                           })
                                       }
                                   }}
                                   fileUrl={callbackFileUrl?.(value) ?? []}/>
    )
}

export default _HookInputPicker
