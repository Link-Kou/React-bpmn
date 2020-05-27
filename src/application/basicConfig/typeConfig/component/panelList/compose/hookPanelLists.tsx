import {ButtonGroup, ButtonToolbar, Icon, IconButton, Panel, PanelGroup, Tag, TagGroup} from 'rsuite';
import * as React from 'react';
import {TypeConfigAddModel, TypeConfigEditModel} from '../../index';
import {utilsObject} from '@utils/index';

interface IPanelList {
    valueKey?: string

    labelKey?: string

    data: Array<datas>

    type: 'All' | 'Other'

    onDel?(label: string, value: string, alone: 'title' | 'group' | 'item'): void

    onAddItem?(label: string, value: string, type: 'All' | 'Other', callbackClose: () => void): void

    onLoadSortableList(id?: string, type?: 'All' | 'Other', alone?: 'title' | 'group' | 'item', callback?: (v: Array<{
        id: string
        title: string
        preId: string
    }>) => void): void

    onSaveSortableList(data?: Array<{
        id: string
        title: string
        preId: string
    }>, type?: 'All' | 'Other', alone?: 'title' | 'group' | 'item', callbackCloseLoading?: () => void): void
}

interface datas {
    value?: string | number
    label?: string | number,
    children?: Array<datas>
}

const _HookPanelLists = (props: IPanelList) => {
    const [showModel, setShowModel] = React.useState('')
    const [parentId, setParentId] = React.useState('')

    const handlersCloseModel = () => {
        setShowModel('')
    }
    const handlersMenuSelect = (valueKey: string, modelType: string) => {
        setParentId(valueKey)
        setShowModel(modelType)
    }
    const handlersOnSave = (name: string, type: 'All' | 'Other', callbackCloseLoading: () => void) => {
        props?.onAddItem?.(name, parentId, type, () => {
            setShowModel('')
            setTimeout(() => callbackCloseLoading(), 500)
        })
    }
    const {data, type, onDel, onLoadSortableList, onSaveSortableList} = props
    if (!Array.isArray(data)) {
        return <></>
    }
    const dataArray: Array<datas> = data
    return (
        <PanelGroup accordion={true} bordered={false}>
            <TypeConfigEditModel show={showModel === 'sort'}
                                 id={parentId}
                                 type={type}
                                 alone={'item'}
                                 onSave={onSaveSortableList}
                                 onLoad={onLoadSortableList}
                                 onClose={handlersCloseModel}/>
            <TypeConfigAddModel show={showModel === 'add'}
                                onClose={handlersCloseModel}
                                onSave={(name: string, callbackCloseLoading: () => void) => {
                                    handlersOnSave(name, type, callbackCloseLoading);
                                }}/>
            {dataArray.map((k, i, a) => {
                const {_labelKey, _valueKey} = utilsObject.getLabeValuelKey(props, k)
                return (
                    <Panel header={_labelKey} defaultExpanded={true}>
                        <div className={'app-typeConfig-plnel'}>
                            <_HookBuildTagList {...props} data={k.children}/>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <IconButton icon={<Icon icon="plus-circle"/>}
                                                onClick={() => handlersMenuSelect(_valueKey, 'add')}/>
                                    <IconButton icon={<Icon icon="edit"/>} onClick={() => {
                                        handlersMenuSelect(_valueKey, 'sort')
                                    }}/>
                                    <IconButton icon={<Icon icon="warning"/>} onClick={() => {
                                        onDel && onDel(_labelKey, _valueKey, 'group')
                                    }}/>
                                </ButtonGroup>
                            </ButtonToolbar>
                        </div>
                    </Panel>
                )
            })}
        </PanelGroup>
    )

}

interface IPanelTagList {
    valueKey?: string
    labelKey?: string
    data?: Array<{
        value?: string | number
        label?: string | number
    }>
    /**
     * 删除Item
     * @param label
     * @param value
     * @param type
     */
    onDel?: (label: string, value: string, type: 'title' | 'group' | 'item') => void
}

const _HookBuildTagList = (props: IPanelTagList) => {
    const {onDel, data} = props
    return (
        <TagGroup>
            {
                data?.map((item, index) => {
                    const {_valueKey, _labelKey} = utilsObject.getLabeValuelKey(props, item)
                    return (
                        <Tag
                            color='blue'
                            key={index}
                            closable={true}
                            onClose={() => {
                                onDel?.(_labelKey, _valueKey, 'item')
                            }}
                        >
                            {_labelKey}
                        </Tag>
                    )
                })
            }
        </TagGroup>
    )
}

export default _HookPanelLists
