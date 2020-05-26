import * as React from 'react';
import {ButtonGroup, Checkbox, CheckboxGroup, Dropdown, Icon, IconButton, Popover, Whisper} from 'rsuite';
import {HeadPanel} from '@component/panel';


interface IHookTableHeadPanel {
    /**
     * 模态
     * @param eventKey
     */
    onModel?(eventKey: string): void

    /**
     * 列显示
     * @param value
     */
    onColShow?(value: Array<string>): void
}

/**
 *
 * @author lk
 * @date 2020/5/21 09:45
 * @version 1.0
 */
const HookTableHeadPanel = (props: IHookTableHeadPanel) => {
    const [col, setCol] = React.useState(['厚度', '紧度', '横向环压强度', '纵向裂断长'])
    const {onModel, onColShow} = props
    return (
        <HeadPanel hideBorderBottom={true} title={'原纸产品列表'}>
            <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                <Dropdown title={'原纸管理'} trigger="click" onSelect={onModel} icon={<Icon icon={'setting'}/>}>
                    <Dropdown.Item eventKey={'add'} icon={<Icon icon={'plus-circle'}/>}>新增原纸</Dropdown.Item>
                    <Dropdown.Item eventKey={'del'} icon={<Icon icon={'minus-circle'}/>}>删除原纸</Dropdown.Item>
                </Dropdown>
                <ButtonGroup>
                    <IconButton icon={<Icon icon={'search'}/>} appearance={'subtle'} onClick={() => {
                        onModel?.('search')
                    }}>产品搜索</IconButton>
                    <Dropdown
                        placement="bottomEnd"
                        renderTitle={() => {
                            return <IconButton appearance={'subtle'}
                                               icon={<Icon icon="refresh"/>}/>;
                        }}>
                        {/*<Dropdown.Item eventKey={'add'}>开始搜索1</Dropdown.Item>
                        <Dropdown.Item eventKey={'del'}>开始搜索2</Dropdown.Item>*/}
                    </Dropdown>
                </ButtonGroup>
                <Whisper
                    placement="bottomStart"
                    trigger="click"
                    speaker={<Popover>
                        <Dropdown.Menu>
                            <CheckboxGroup value={col} onChange={(value) => {
                                setCol(value);
                                onColShow?.(value)
                            }}>
                                <Dropdown.Item><Checkbox value="卷轴幅宽">卷轴幅宽</Checkbox></Dropdown.Item>
                                <Dropdown.Item><Checkbox value="厚度">厚度</Checkbox></Dropdown.Item>
                                <Dropdown.Item><Checkbox value="紧度">紧度</Checkbox></Dropdown.Item>
                                <Dropdown.Item><Checkbox value="横向环压强度">横向环压强度</Checkbox></Dropdown.Item>
                                <Dropdown.Item><Checkbox value="纵向裂断长">纵向裂断长</Checkbox></Dropdown.Item>
                                <Dropdown.Item><Checkbox value="创建时间">创建时间</Checkbox></Dropdown.Item>
                                <Dropdown.Item><Checkbox value="修改时间">修改时间</Checkbox></Dropdown.Item>
                            </CheckboxGroup>
                        </Dropdown.Menu>
                    </Popover>}
                >
                    <IconButton icon={<Icon icon={'list'}/>} appearance={'subtle'}>列管理</IconButton>
                </Whisper>


            </div>
        </HeadPanel>
    )
}
export default HookTableHeadPanel;
