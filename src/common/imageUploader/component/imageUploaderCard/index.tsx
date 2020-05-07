import * as React from 'react';
import {ImageCardViewUploader} from '@imageManager/component/imageCard';


interface Iprops {

    /**
     * 显示事件
     * @param fileUrl
     */
    onShow?(fileUrl?: string): void

    /**
     * 删除事件
     * @param fileUrl
     * @param callbackDel
     */
    onDelete?(fileUrl: string, callbackDel: (del: boolean) => void): void

    /**
     * 文件路径
     */
    fileUrl?: string

    height?: number

    width?: number

}

/**
 * 单一上传面板
 */
export default class ImageUploaderCard extends React.Component<Iprops> {

    public _uploader: any;

    public state = {
        //加载进度 ：default|success|error|loading
        upload: 'default'
    };

    public componentDidMount(): void {

    }


    public render() {
        const {width, height} = this.props
        return (
            <>
                <ImageCardViewUploader width={width} height={height}/>
            </>
        );
    }

}
