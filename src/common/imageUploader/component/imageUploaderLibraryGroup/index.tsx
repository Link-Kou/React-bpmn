import * as React from 'react';
import {Alert, Modal} from 'rsuite';
import {ImageCardViewUpdataDelete, ImageViewer} from '@imageManager/index';
import ImageLibrary from '@imageManager/component/imageLibrary';
import './imageUploaderLibraryGroup.scss'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {utilsNumber} from '@utils/index';
import {ApiFile} from '@fetch/api';

interface Iprops {

    /**
     * 文件路径
     * 默认初始化有效
     */
    fileUrl: Array<string>

    /**
     * 最大数量
     */
    maxSize: number

    /**
     * 是否可以拖动
     */
    isDragDisabled?: boolean

    /**
     * 文件改变
     * @param fileUrl
     */
    onChange?(fileUrl: Array<string>): void
}

/**
 * 图片上传组合模式
 */
export default class ImageUploaderLibraryGroup extends React.Component<Iprops> {

    public state = {
        //fileUrl: [],
        fileUrlShow: '',
        show: false,
        eventKey: 0,
        showImageLibrary: false
    };

    /**
     * 上传
     * @private
     */
    public _onUpdate = async (eventKey?: string) => {
        this.setState({
            eventKey
        }, () => {
            this.setState({
                showImageLibrary: true
            })
        })
    }

    /**
     * 显示
     * @param fileUrl
     * @param eventKey
     * @private
     */
    public _onShow = (fileUrl: string, eventKey?: string | number) => {
        this.setState({
            fileUrlShow: fileUrl,
            eventKey,
            show: true
        })
    }


    /**
     * 删除图片
     * @param fileUrl
     * @param callbackDel
     * @param eventKey
     * @private
     */
    public _onDelete = async (fileurl: string, eventKey?: string | number) => {
        //const {fileUrl} = this.state
        const {onChange, fileUrl} = this.props
        if (eventKey) {
            fileUrl.splice(utilsNumber.toNumber(eventKey), 1);
        }
        onChange?.(fileUrl)
    }


    /**
     * 拖动
     * @param result
     */
    public onDragEnd = async (result: any) => {
        //const {fileUrl} = this.state
        const {maxSize, onChange, fileUrl} = this.props
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
            const newarray = new Array(maxSize).toString()
                .split(',');
            const fromarray: any = newarray.map((k, i, a) => {
                k = list[i]
                return k
            })
            const [removed] = fromarray.splice(startIndex, 1);
            fromarray.splice(endIndex, 0, removed);
            return fromarray;
        };
        const items = reorder(
            fileUrl,
            //来源index
            result.source.index,
            //放置index
            result.destination.index
        );
        this.setState(() => ({
            eventKey: 0
        }), () => {
            onChange?.(items)
        });
    }

    /**
     * 拖动base样式
     * @param isDraggingOver
     */
    public getListStyle(isDraggingOver: boolean) {
        return (
            {
                background: isDraggingOver ? '#fafafa' : '#fff',
                display: 'flex',
                padding: '0 6px 0 0'
            }
        )
    }

    /**
     * 拖动样式
     * @param isDragging
     * @param draggableStyle
     */
    public getItemStyle(isDragging: boolean, draggableStyle: any) {
        return (
            {
                ...draggableStyle,
                boxShadow: isDragging ? '5px 5px 10px #888888' : '',
                borderRadius: isDragging ? '4px' : '4px 4px 0 0',
                left: isDragging ? draggableStyle.left - 200 : draggableStyle.left
            }
        )
    }

    /**
     * 构建组件
     * @private
     */
    private renderViewBuildViewUpdataDelete() {
        const {maxSize, isDragDisabled, fileUrl} = this.props
        const ViewUpdataDelete: Array<any> = []
        for (let i = 0; i < maxSize; i++) {
            ViewUpdataDelete.push(
                <Draggable key={i} draggableId={i.toString()} index={i} isDragDisabled={isDragDisabled}>
                    {(provideds, snapshots) => (
                        <div
                            //className={`header-tabs-tabitem header-tabs-tabitem${item.id} ${this.state.selectItems === item.id ? 'header-tabs-tabitem-select' : ''}`}
                            role="button"
                            ref={provideds.innerRef}
                            {...provideds.draggableProps}
                            {...provideds.dragHandleProps}
                            style={this.getItemStyle(
                                snapshots.isDragging,
                                provideds.draggableProps.style
                            )}
                        >
                            <ImageCardViewUpdataDelete eventKey={i}
                                                       fileUrl={fileUrl[i]}
                                                       onUpdate={this._onUpdate}
                                                       onDelete={this._onDelete}
                                                       onShow={this._onShow}/>
                        </div>
                    )}
                </Draggable>
            )
        }
        return ViewUpdataDelete
    }

    /**
     * 显示组
     * @private
     */
    private renderViewDragDrop() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            className={`header-tabs-base`}
                            ref={ref => {
                                provided.innerRef(ref);
                            }}
                            style={this.getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                        >
                            {this.renderViewBuildViewUpdataDelete()}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }

    /**
     * 模态窗口显示
     * @private
     * @private
     */
    public renderModalImageViewer() {
        const {show, fileUrlShow} = this.state
        const close = () => {
            this.setState({
                show: false
            })
        }
        return (
            <Modal
                size={'sm'}
                show={show}
                onHide={close}
            >
                <Modal.Header>
                    <Modal.Title>图片查看器</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{height: 300, width: '100%'}}>
                        <ImageViewer ImageUrl={fileUrlShow}/>
                    </div>
                </Modal.Body>
                <Modal.Footer/>
            </Modal>
        )
    }

    /**
     * 加载文件
     * @param itemsPerPage
     * @param page
     * @param callback
     * @private
     */
    private _onLoad = (itemsPerPage: number, page: number, callback: (data: Array<any>, total: number) => void) => {
        ApiFile.LoadFilePage({
            page,
            itemsPerPage
        }, (req) => {
            if (req.success) {
                callback(req.data.list, req.data.total)
            } else {
                Alert.error(req.msg)
            }
        })
    }

    /**
     * 关闭窗口
     * @private
     */
    private _onClone = () => {
        this.setState({
            showImageLibrary: false
        })
    }

    /**
     * 选择图片
     * @param fileurl
     * @param callbackClose 关闭资源出口
     * @private
     */
    public _onSelect = (fileurl: Array<string>, callbackClose: () => void) => {
        const {onChange} = this.props
        if (Array.isArray(fileurl) && fileurl.length > 0) {
            const {eventKey} = this.state
            const {maxSize, fileUrl} = this.props
            let ii = 0
            for (let i = eventKey; i < maxSize; i++) {
                if (ii < fileurl.length) {
                    fileUrl[i] = fileurl[ii]
                }
                ii += 1
            }
            callbackClose?.()
            onChange?.(fileUrl)
        } else {
            Alert.error('无选择图片')
        }
    }

    /**
     * 删除
     * @param fileurl
     * @param id
     * @private
     */
    private _onDel = (fileurl: string, id?: string) => {
        alert(123)
    }

    public render() {
        const {showImageLibrary} = this.state
        const {maxSize} = this.props
        return (
            <>
                {this.renderModalImageViewer()}
                <ImageLibrary onLoad={this._onLoad}
                              action={'/dev/file/upload/sddd.do'}
                              url={'http://localhost:8080/Files/'}
                              show={showImageLibrary}
                              maxSize={maxSize}
                              onDel={this._onDel}
                              onClone={this._onClone}
                              onSelect={this._onSelect}/>
                <div className={'app-image-library-picture-card-group'}>
                    {
                        this.renderViewDragDrop()
                    }
                </div>
            </>
        );
    }

}
