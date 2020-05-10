import * as React from 'react';
import {Panel} from 'rsuite'
import {ImageUploaderLibraryGroup} from '@common/imageUploader';
import {IFormValue} from '../../../index.types';


interface IProps {
    formValue: IFormValue

    onChange?(data: IFormValue): void
}

export default class ProductImageUnified extends React.Component<IProps> {

    public state = {}

    public render() {
        const {onChange, formValue} = this.props
        return (
            <>
                <Panel header={'详情主图'} bordered={false} bodyFill={false}>
                    <ImageUploaderLibraryGroup maxSize={5}
                                               onChange={(fileUrl) => {
                                                   formValue.images.detailsMain = fileUrl
                                                   onChange?.(formValue)
                                               }}
                                               fileUrl={formValue?.images?.detailsMain ?? []}/>
                </Panel>
                <Panel header={'详情列表图'} bordered={false} bodyFill={false}>
                    <ImageUploaderLibraryGroup maxSize={10}
                                               onChange={(fileUrl) => {
                                                   formValue.images.detailsList = fileUrl
                                                   onChange?.(formValue)
                                               }}
                                               fileUrl={formValue?.images?.detailsList ?? []}/>
                </Panel>
            </>
        )
    }

}
