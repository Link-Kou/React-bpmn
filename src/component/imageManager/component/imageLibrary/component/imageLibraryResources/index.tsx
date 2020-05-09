import * as React from 'react';
import './imageLibraryResources.scss'
import {Button, Table, Popover, Whisper} from 'rsuite';
import ImageViewer from '../../../imageViewer';
import ImageCardViewSelectDelte from '@imageManager/component/imageCard/component/viewSelectDelte';

const {Pagination} = Table;


interface Iprops {
    /**
     * 选择最大数量
     */
    maxSize?: number

    /**
     * 当前选择页
     */
    activePage?: number

    displayLength?: number

    total?: number

    onSelect?(fileurl: Array<string>): void

    onChangeLength?(size: number): void

    onChangePage?(page: number): void

    onDel?(fileurl: string, id?: string): void

    /**
     * Url
     */
    url: string

    files?: Array<{
        id: string
        /**
         * 文件名
         */
        name: string
        /**
         * 后缀
         */
        suffix: string
        /**
         * 后缀
         */
        suffixDot: string
        md5: string
        createtime: string
        updatedtime: string
    }>
}

/**
 * 图片资源库-图片列表
 */
export default class ImageLibraryResources extends React.Component<Iprops> {


    public state = {
        /**
         * 选择的图片
         */
        selectFileurl: [],
        displayLength: 10
    };

    /**
     * 选择图片
     * @param fileurl
     * @param id
     * @param maxSize
     * @private
     */
    public _onSelect = (fileurl: string, maxSize: number = 1) => {
        const {selectFileurl}: { selectFileurl: Array<string> } = this.state
        const findIndex = selectFileurl.findIndex(x => x === fileurl);
        if (findIndex > -1) {
            if (selectFileurl[findIndex] === fileurl) {
                selectFileurl.splice(findIndex, 1)
            } else {
                selectFileurl.push(fileurl)
            }
        } else if (selectFileurl.length <= maxSize) {
            selectFileurl.push(fileurl)
        } else if (maxSize <= 1) {
            this.setState({
                selectFileurl: [fileurl]
            })
            return;
        }
        this.setState({
            selectFileurl
        })
    }

    /**
     * 选择
     * @private
     */
    public renderViewSelect() {
        const {selectFileurl}: { selectFileurl: Array<string> } = this.state
        const {files, maxSize, onDel, url} = this.props
        let _trigger: any
        return files?.map((k, i, a) => {
            const fileUrl = url + k.md5 + k.suffixDot
            return (
                <Whisper
                    placement={'auto'}
                    trigger={'active'}
                    speaker={<Popover title="图片查看器">
                        <div style={{height: 200, width: 200}}>
                            <ImageViewer
                                ImageUrl={fileUrl}/>
                        </div>
                    </Popover>}
                    triggerRef={ref => {
                        _trigger = ref;
                    }}
                >
                    <ImageCardViewSelectDelte
                        id={k.id}
                        fileUrl={fileUrl}
                        select={selectFileurl?.indexOf(fileUrl) > -1}
                        onSelect={(f) => {
                            this._onSelect(f, maxSize)
                        }}
                        onDelete={onDel}
                        onShow={(e) => {
                            _trigger.show();
                        }}/>
                </Whisper>
            )
        })

    }


    public render() {
        const {onSelect, onChangePage, onChangeLength, activePage, total} = this.props
        const {selectFileurl, displayLength} = this.state
        return (
            <div style={{marginLeft: 22}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Pagination
                        activePage={activePage}
                        displayLength={displayLength}
                        total={total}
                        onChangeLength={onChangeLength}
                        onChangePage={onChangePage}
                        lengthMenu={[{value: 10, label: 10}, {value: 20, label: 20}]}
                    />
                    <div style={{width: 140}}>
                        <Button className={'app-rs-btn'} appearance={'primary'} onClick={(event) => {
                            event?.stopPropagation()
                            onSelect?.(selectFileurl)
                        }}>
                            使用选择图片
                        </Button>
                    </div>
                </div>
                <div className={'app-image-library-resources-group'}>
                    {this.renderViewSelect()}
                </div>
            </div>
        );
    }

}
