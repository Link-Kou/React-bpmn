import {ButtonGroup, ButtonToolbar, Icon, IconButton} from 'rsuite';
import * as React from 'react';

interface IDelButton {
    /**
     * 是否隐藏
     */
    hideDel?: boolean
    id: string
    title: string
    onDel?: (label: string, value: string, type: 'title' | 'group' | 'item') => void
}

const _HookDelButton = (props: IDelButton) => {
    if (props.hideDel) {
        return <></>
    }
    return (
        <ButtonToolbar>
            <ButtonGroup>
                <IconButton appearance="subtle" onClick={() => {
                    props?.onDel?.(props.title, props.id, 'title')
                }} icon={<Icon icon="close-circle"/>}/>
            </ButtonGroup>
        </ButtonToolbar>
    )
}

export default _HookDelButton;
