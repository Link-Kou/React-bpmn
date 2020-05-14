import * as React from 'react';
import {ButtonGroup, ButtonToolbar, Icon, IconButton, Panel, PanelGroup, Tag, TagGroup} from 'rsuite';
import {CorrugatedConfigAddModel, CorrugatedConfigEditModel} from '../../index';
import {utilsArray, utilsObject} from '@utils/index';
import {LoadPanel} from '@component/loadPanel';
import {IArrayDatas} from '../../../index.types';


interface IPanelList {
    valueKey?: string
    labelKey?: string
    data: Array<datas>

    onDelItem?(label: string, value: string): void

    onAddItem?(label: string, value: string, callbackCloseLoading: () => void): void

    onLoadEditList?(id?: string, callback?: (v: Array<IArrayDatas>) => void): void

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

const HookBuildPanelLists = (props: IPanelList) => {
    const {data, onLoadEditList, onEditSave} = props
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
            <CorrugatedConfigEditModel show={showModel === 'sort'}
                                       id={parentId}
                                       onSave={onEditSave}
                                       onLoad={onLoadEditList}
                                       onClose={handlersCloseModel}/>
            <CorrugatedConfigAddModel show={showModel === 'add'}
                                      id={parentId}
                                      onClose={handlersCloseModel}
                                      onSave={handlersOnAddSave}/>
            {dataArray.map((k, i, a) => {
                const {_valueKey} = utilsObject.getLabeValuelKey(props, k)
                return (
                    <Panel header={k.label} defaultExpanded={true}>
                        <div className={'app-typeConfig-plnel'}>
                            <LoadPanel hideLoader={utilsArray.getArrayLength(k?.children) > 0}
                                       hideLoaderComponent={!(k?.children === undefined)}
                                       title={k?.children?.length === 0 ? '暂无数据' : '数据加载中...'}
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

export default HookBuildPanelLists
