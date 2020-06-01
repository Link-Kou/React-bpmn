import * as React from 'react';
import {Button, FlexboxGrid, Icon, List} from 'rsuite';
import {IReturnRole} from '../../../index.types';

const slimText = {
    fontSize: '0.666em',
    color: '#000',
    fontWeight: 'lighter',
    paddingBottom: 5
};

const dataStyle = {
    fontSize: '1.2em',
    fontWeight: 500
};

const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px'
};

const titleStyle = {
    paddingBottom: 15,
    whiteSpace: 'nowrap',
    fontWeight: 500
};

interface IProps {
    edit?: boolean

    data: Array<IReturnRole>

    onEdit?(id: string, name: string): void

    onPermit?(id: string): void

    onDisable?(id: string, name: string, type: 'Disable' | 'Start'): void

    onDelete?(id: string, name: string): void

}

/**
 *
 * @author lk
 * @date 2020/5/31 14:30
 * @version 1.0
 */
export const HookList = (props: IProps) => {
    const {edit, data, onEdit, onDisable, onPermit, onDelete} = props
    return (
        <List bordered={true} hover={true}>
            {
                data.map((k, i, a) => (
                    <List.Item key={k.id} index={i}>
                        <FlexboxGrid>
                            <FlexboxGrid.Item
                                colspan={6}
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={titleStyle as any}>
                                    {
                                        k.isDisable === 0 ? undefined : (
                                            <Icon icon="expeditedssl" style={{marginRight: 5, color: 'red'}}/>)
                                    }
                                    {k.title}
                                </div>
                                <div style={{paddingBottom: 5, fontSize: '0.666em'}}>
                                    <div>{k.updatedtime}</div>
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={6}
                                style={styleCenter as any}
                            >
                                <div style={{textAlign: 'right'}}>
                                    <div style={slimText as any}><Icon icon="peoples"
                                                                       style={{marginRight: 5}}/>关联人数
                                    </div>
                                    <div style={dataStyle as any}>{k.numberUser}</div>
                                </div>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item
                                colspan={6}
                                style={styleCenter as any}
                            >
                                <div style={{textAlign: 'right'}}>
                                    <div style={slimText as any}><Icon icon="peoples-map"
                                                                       style={{marginRight: 5}}/>关联权限
                                    </div>
                                    <div style={dataStyle as any}>{k.numberPermit}</div>
                                </div>
                            </FlexboxGrid.Item>
                            {
                                k.isDisable === 0 ?
                                    (
                                        <FlexboxGrid.Item colspan={6} style={styleCenter as any}>
                                            <Button style={{padding: 5}} appearance={'link'} disabled={edit}
                                                    onClick={() => onEdit?.(k.id, k.title)}>编辑</Button>
                                            <span style={{padding: 2}}>|</span>
                                            <Button style={{padding: 5}}
                                                    appearance={'link'}
                                                    onClick={() => onDisable?.(k.id, k.title, 'Disable')}
                                                    disabled={edit}>禁用</Button>
                                            <span style={{padding: 2}}>|</span>
                                            <Button style={{padding: 5}} appearance={'link'}
                                                    disabled={edit}
                                                    onClick={() => onPermit?.(k.id)}>权限</Button>
                                        </FlexboxGrid.Item>
                                    ) :
                                    (
                                        <FlexboxGrid.Item
                                            colspan={6}
                                            style={styleCenter as any}
                                        >
                                            <Button style={{padding: 5}}
                                                    appearance={'link'}
                                                    onClick={() => onDisable?.(k.id, k.title, 'Start')}
                                                    disabled={edit}>启动</Button>
                                            <span style={{padding: 2}}>|</span>
                                            <Button style={{padding: 5}}
                                                    appearance={'link'}
                                                    onClick={() => onDelete?.(k.id, k.title)}
                                                    disabled={edit}>删除</Button>
                                        </FlexboxGrid.Item>
                                    )
                            }
                        </FlexboxGrid>
                    </List.Item>
                ))
            }
        </List>
    )
}
