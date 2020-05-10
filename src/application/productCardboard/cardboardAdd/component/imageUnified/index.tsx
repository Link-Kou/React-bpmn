import * as React from 'react';
import {Panel} from 'rsuite'
import {ImageUploaderLibraryGroup} from '@common/imageUploader';
import {IFormValue} from '../../../index.types';


interface IProps {
    formValue: IFormValue

    onChange?(data: IFormValue): void
}

export default class CardboardAddImageUnified extends React.Component<IProps> {

    public state = {}

    public render() {
        const {onChange, formValue} = this.props
        return (
            <>
                <Panel header={'商品主图'} bordered={false} bodyFill={false}>
                    <ImageUploaderLibraryGroup maxSize={5}
                                               onChange={(fileUrl) => {
                                                   formValue.images.main = fileUrl
                                                   onChange?.(formValue)
                                               }}
                                               fileUrl={formValue?.images?.main ?? []}/>
                </Panel>
                <Panel header={'商品详情'} bordered={false} bodyFill={false}>
                    <ImageUploaderLibraryGroup maxSize={10}
                                               onChange={(fileUrl) => {
                                                   formValue.images.details = fileUrl
                                                   onChange?.(formValue)
                                               }}
                                               fileUrl={formValue?.images?.details ?? []}/>
                </Panel>
            </>
        )
    }

}
