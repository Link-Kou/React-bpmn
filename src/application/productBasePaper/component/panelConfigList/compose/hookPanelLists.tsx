import * as React from 'react';
import {ButtonGroup, ButtonToolbar, Icon, IconButton, Panel, PanelGroup, Tag, TagGroup} from 'rsuite';
import {PaperConfigAddModel, PaperConfigEditModel} from '../../index';
import {utilsArray, utilsObject} from '@utils/index';
import {LoadPanel} from '@component/panel';


interface IPanelList {
    valueKey?: string

    labelKey?: string

    data: Array<datas>

    loadering?: boolean

    onDelItem?(label: string, value: string): void

    onAddItem?(label: string, value: string, callbackCloseLoading: () => void): void

    onLoadEditList?(id?: string, callback?: (v: Array<{
        id: string
        title: string
    }>) => void): void

    onEditSave?(data: Array<{
        id: string
        title: string
    }>, callbackCloseLoading: () => void): void
}

interface datas {
    value?: string | number
    label?: string | number,
    children?: Array<datas>
}

const _HookBuildPanelLists = (props: IPanelList) => {
    const {data, onLoadEditList, onEditSave, loadering} = props
    const [showModel, setShowModel] = React.useState('');
    const [parentId, setParentId] = React.useState('');

    const handlersCloseModel = (): void => {
        setShowModel('')
    }

    const handlersMenuSelect = (valueKey: string, modelType: string): void => {
        setParentId(valueKey)
        setShowModel(modelType)
    }

    const handlersOnAddSave = (id: string, name: string, callbackCloseLoading: () => void): void => {
        props?.onAddItem?.(name, id, () => {
            setShowModel('')
            setTimeout(() => callbackCloseLoading(), 500)
        })
    }

    if (!Array.isArray(data)) {
        return <></>
    }
    const dataArray: Array<datas> = data
    return (
        <PanelGroup accordion={true} bordered={false}>
            <PaperConfigEditModel show={showModel === 'sort'}
                                  id={parentId}
                                  onSave={onEditSave}
                                  onLoad={onLoadEditList}
                                  onClose={handlersCloseModel}/>
            <PaperConfigAddModel show={showModel === 'add'}
                                 id={parentId}
                                 onClose={handlersCloseModel}
                                 onSave={handlersOnAddSave}/>
            {dataArray.map((k, i, a) => {
                const {_valueKey} = utilsObject.getLabeValuelKey(props, k)
                const arrayLength = utilsArray.getArrayLength(k?.children);
                return (
                    <Panel header={k.label} defaultExpanded={true}>
                        <div className={'app-typeConfig-plnel'}>
                            <LoadPanel
                                loadering={loadering}
                                onLoader={((l, v) => {
                                    if (!l) {
                                        if (arrayLength <= 0) {
                                            return {
                                                title: '暂无数据....',
                                                hide: true,
                                                hideLoaderIcons: true
                                            }
                                        }
                                    }
                                    return v
                                })}
                                outrender={true}
                                height={120}>
                                <_HookBuildTagList {...props} data={k?.children}/>
                            </LoadPanel>
                            <ButtonToolbar>
                                <ButtonGroup>
                                    <IconButton icon={<Icon icon="plus-circle"/>}
                                                onClick={() => handlersMenuSelect(_valueKey, 'add')}/>
                                    <IconButton icon={<Icon icon="edit"/>}
                                                onClick={() => handlersMenuSelect(_valueKey, 'sort')}/>
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
    onDelItem?: (label: string, value: string) => void
}

const _HookBuildTagList = (props: IPanelTagList) => {
    const {onDelItem, data} = props
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
                                onDelItem?.(_labelKey, _valueKey)
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

export default _HookBuildPanelLists
