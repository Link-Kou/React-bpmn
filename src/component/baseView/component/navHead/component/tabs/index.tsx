import * as React from 'react';
import {connect} from 'react-redux';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Icon, Popover, Whisper, Dropdown, IconButton} from 'rsuite';

import {Listener} from '../../../../../../listener';
import './tabs.scss'

class HeadTabs extends React.Component {

    public _deviceEventEmitter: any

    public wrapper: any;

    public wrapperheader: any;

    public state = {
        activeKey: 'asd',
        collapsed: false,
        /**
         * 打开的Tab
         */
        panes: [
            {
                title: 'demo',
                key: 'asd'
            }, {
                title: 'demo2',
                key: 'asd2'
            }
        ],
        selectItems: '',
        items: [
            {
                id: '1',
                content: '1'
            },
            {
                id: '2',
                content: '2222222222222222222'
            },
            {
                id: '3',
                content: '333333333333333333333333333333333'
            },
            {
                id: '4',
                content: '4'
            },
            {
                id: '5',
                content: '5'
            },
            {
                id: '6',
                content: '6'
            },
            {
                id: '7',
                content: '77777777777777777777777777'
            },
            {
                id: '8',
                content: '888888888'
            },
            {
                id: '9',
                content: '99999999'
            },
            {
                id: '10',
                content: '10101010'
            },
            {
                id: '11',
                content: '111111111111111111'
            },
            {
                id: '12',
                content: '111111111111111111'
            },
            {
                id: '13',
                content: '1313131313131313131313131313'
            },
            {
                id: '14',
                content: '1414141414141414'
            },
            {
                id: '15',
                content: '15151515151515151515'
            },
            {
                id: '16',
                content: '16161616'
            }
        ]
    }

    public componentDidMount(): void {
        this._deviceEventEmitter = PubSub.subscribe(Listener.NavMenuSidenav, this._OnCollapsed.bind(this));
    }

    public componentWillMount(): void {
        PubSub.unsubscribe(this._deviceEventEmitter);
    }

    /**
     * 打开关闭
     * @private
     */
    public _OnCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    /**
     * 拖动
     * @param result
     */
    public onDragEnd(result: any) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
        const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
            const fromarray: any = Array.from(list);
            const [removed] = fromarray.splice(startIndex, 1);
            fromarray.splice(endIndex, 0, removed);
            return fromarray;
        };
        const items = reorder(
            this.state.items,
            //来源index
            result.source.index,
            //放置index
            result.destination.index
        );

        this.setState({
            items
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
                boxShadow: isDragging ? '5px 5px 10px #888888' : '',
                borderRadius: isDragging ? '4px' : '4px 4px 0 0',
                ...draggableStyle
            }
        )
    }

    /**
     * 滚动条 进行滚动到指定元素
     * @param classname
     * @param id
     */
    public onWheel(classname: string, id: string) {
        const anchorElement: any = document.getElementsByClassName(classname)[0];
        anchorElement.scrollIntoView({block: 'center', inline: 'center', behavior: 'smooth'});
        this.setState({
            selectItems: id
        })
    }

    /**
     * 前后选择
     */
    public onNextPrev(type: 'next' | 'prev') {
        const {selectItems, items} = this.state
        let index: number = -1;
        const tablength: number = items.length
        items.some((k, i, a) => {
            if (k.id === selectItems) {
                switch (type) {
                    case 'next':
                        if (i + 1 >= tablength) {
                            index = tablength - 1
                        } else {
                            index = i + 1
                        }
                        break;
                    case 'prev':
                        if (i - 1 <= 0) {
                            index = 0
                        } else {
                            index = i - 1
                        }
                        break
                    default:
                        break
                }
                return true
            }
            return false
        })
        if (index > -1) {
            this.onWheel(`header-tabs-tabitem${items[index].id}`, items[index].id)
        }


    }

    public render() {
        return (
            <div className='header-tabs' ref={ref => {
                this.wrapper = ref;
            }} onContextMenu={(event: any) => {
                event.preventDefault()
                return false
            }}>
                <div className={'header-tabs-box'} style={{display: 'flex'}}>
                    <IconButton appearance="subtle" icon={<Icon icon="arrow-left"/>} placement="left" onClick={() => {
                        this.onNextPrev('prev')
                    }}/>
                    <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                        <Droppable droppableId="droppable" direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                    className={`header-tabs-base`}
                                    ref={ref => {
                                        provided.innerRef(ref);
                                        this.wrapperheader = ref
                                    }}
                                    style={this.getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {this.state.items.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provideds, snapshots) => (
                                                <div
                                                    className={`header-tabs-tabitem header-tabs-tabitem${item.id} ${this.state.selectItems === item.id ? 'header-tabs-tabitem-select' : ''}`}
                                                    role="button"
                                                    ref={provideds.innerRef}
                                                    {...provideds.draggableProps}
                                                    {...provideds.dragHandleProps}
                                                    style={this.getItemStyle(
                                                        snapshots.isDragging,
                                                        provideds.draggableProps.style
                                                    )}
                                                >
                                                    <div
                                                        className={`header-tabs-tabitem-content header-tabs-tabitem-content${item.id}`}
                                                        onClick={() => {
                                                            this.onWheel(`header-tabs-tabitem${item.id}`, item.id)
                                                        }}>{item.content}</div>
                                                    <Icon className={'app-close'} icon={'warning'}/>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <IconButton appearance="subtle" icon={<Icon icon="arrow-right"/>} placement="right"
                                style={{left: -48}} onClick={() => {
                        this.onNextPrev('next')
                    }}/>
                    <Whisper
                        trigger="hover"
                        placement='bottom'
                        speaker={
                            <Popover title="">
                                <Dropdown.Menu
                                    style={{
                                        width: 200
                                    }}
                                >
                                    <Dropdown.Item panel={true} style={{padding: 10, width: 160}}>
                                        <p>Signed in as</p>
                                        <strong>foobar</strong>
                                    </Dropdown.Item>
                                    <Dropdown.Item divider={true}/>
                                    <Dropdown.Item>Your profile</Dropdown.Item>
                                    <Dropdown.Item>Your stars</Dropdown.Item>
                                    <Dropdown.Item>Your Gists</Dropdown.Item>
                                    <Dropdown.Item divider={true}/>
                                    <Dropdown.Item>Help</Dropdown.Item>
                                    <Dropdown.Item>Settings</Dropdown.Item>
                                    <Dropdown.Item>Sign out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Popover>
                        }
                    >
                        <div className={'header-tabs-basetool'}>
                            <div>
                                <Icon icon={'gear-circle'}/>
                            </div>
                        </div>
                    </Whisper>
                </div>
            </div>
        )
    }
}

export default connect(
    (state: any) => ({
        param: state
    }),
    (dispatch: any) => ({})
)(HeadTabs)
