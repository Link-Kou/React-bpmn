import * as React from 'react';
import {Tree} from 'rsuite';
import {LongPanel} from '@component/panel';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

export default class Index extends React.Component {

    public state = {
        items: [
            {
                label: '中国',
                value: 1,
                children: [
                    {
                        label: '北京市',
                        value: 2
                    },
                    {
                        label: '福建省',
                        value: 3,
                        children: [
                            {
                                label: '福州市',
                                value: 36
                            },
                            {
                                label: '南平市',
                                value: 37
                            },
                            {
                                label: '泉州市',
                                value: 38
                            },
                            {
                                label: '莆田市',
                                value: 39
                            }
                        ]
                    }
                ]
            }
        ],
        destination: undefined,
        source: undefined
    }

    /**
     * 拖动
     * @param result
     */
    public onDragEnd(result: any) {
        // dropped outside the list
        if (!result.destination) {

        }
        /*console.log([
            //来源index
            result.source.index,
            //放置index
            result.destination.index
        ])
        console.log(JSON.stringify(result))*/
    }

    /**
     * 拖动base样式
     * @param isDraggingOver
     */
    public getListStyle(isDraggingOver: boolean) {
        return (
            {
                //background: isDraggingOver ? '#729500' : '#f00036',
                //display: 'flex',
                //padding: '0 6px 0 0'
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
                background: isDragging ? '#729500' : '',
                boxShadow: isDragging ? '5px 5px 10px #888888' : '',
                borderRadius: isDragging ? '4px' : '4px 4px 0 0',
                ...draggableStyle,
                transform: isDragging ? draggableStyle.transform : 'none'
            }
        )
    }

    public render() {
        return (
            <LongPanel>
                <DragDropContext
                    onDragUpdate={(result: any) => {
                        this.setState({
                            //放置index
                            destination: result?.destination?.index,
                            source: result?.source?.droppableId
                        })
                    }}
                    //拖动结束
                    onDragEnd={this.onDragEnd.bind(this)}>
                    <Tree data={this.state.items} renderTreeNode={(item) => (
                        <>
                            <Droppable droppableId={item.value} direction="vertical">
                                {(provided, snapshot) => (
                                    <div
                                        className={`header-tabs-base`}
                                        ref={ref => {
                                            provided.innerRef(ref);
                                        }}
                                        style={this.getListStyle(snapshot.isDraggingOver)}
                                        {...provided.droppableProps}
                                    >
                                        <Draggable key={item.value} draggableId={item.value} index={item.value}>
                                            {(provideds: any, snapshots) => (
                                                <div
                                                    ref={provideds.innerRef}
                                                    {...provideds.draggableProps}
                                                    {...provideds.dragHandleProps}
                                                    style={this.getItemStyle(
                                                        snapshots.isDragging,
                                                        provideds.draggableProps.style
                                                    )}
                                                >
                                                    <div>
                                                        {item.label}{item.value}
                                                        <br/>
                                                        'destination':{this.state.destination}
                                                        'source':{this.state.source}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    </div>
                                )}
                            </Droppable>
                        </>
                    )}/>
                </DragDropContext>
            </LongPanel>
        )
    }
}
