import React from 'react';
import {ButtonGroup, ButtonToolbar, Icon, Radio, RadioGroup, Toggle} from 'rsuite';

const styles = {
    radioGroupLabel: {
        padding: '8px 2px 8px 10px',
        display: 'inline-block',
        verticalAlign: 'middle'
    }
};

interface IHookCellButtonToolbar {
    /**
     * 显示
     * @param asc 上序
     * @param desc 降序
     */
    onChangeDisplay?: (value?: 'asc' | 'desc') => void
    /**
     * 规格是否重复
     * @param value
     */
    onChangeSpecRepeat?: (value: boolean) => void
}

/**
 *
 * @author lk
 * @date 2020/5/8 14:25
 * @version 1.0
 */
export const HookCellButtonToolbar = (props: IHookCellButtonToolbar) => {
    const [specRepeat, setSpecRepeat] = React.useState(true);
    const {onChangeDisplay, onChangeSpecRepeat} = props
    React.useEffect(() => {
        onChangeSpecRepeat?.(specRepeat)
    }, [specRepeat])
    return (
        <ButtonToolbar style={{marginBottom: 10}}>
            <RadioGroup name="radioList" inline={true} appearance="picker" defaultValue={1} onChange={(value: any) => {
                const keyItem: any = ['', 'asc', 'desc'][value];
                onChangeDisplay?.(keyItem)
            }}>
                <span style={styles.radioGroupLabel}>显示: </span>
                <Radio value={1}>上序</Radio>
                <Radio value={2}>降序</Radio>
            </RadioGroup>
            <ButtonGroup>
                <div style={{marginLeft: 10}}>
                    锁定行
                    <Toggle
                        defaultChecked={true}
                        checkedChildren={<Icon icon="check"/>}
                        unCheckedChildren={<Icon icon="close"/>}
                    />
                </div>
            </ButtonGroup>
            <ButtonGroup>
                <div style={{marginLeft: 10}}>
                    规格重复
                    <Toggle
                        defaultChecked={specRepeat}
                        onChange={(checked) => {
                            setSpecRepeat(checked)
                        }}
                        checkedChildren={<Icon icon="check"/>}
                        unCheckedChildren={<Icon icon="close"/>}
                    />
                </div>
            </ButtonGroup>
        </ButtonToolbar>
    )
}
