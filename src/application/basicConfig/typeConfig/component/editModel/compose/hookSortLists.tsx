import * as React from 'react';
import {Alert, ButtonGroup, Form, FormControl, FormGroup, Icon, IconButton, Input, List, Schema} from 'rsuite';
import {utilsObject} from '@utils/index';

interface IHookSortListsProps {
    data?: Array<{
        id: string
        title: string
        preId: string
    }>

    onChange?(data?: Array<{
        id: string
        title: string
        preId: string
    }>): void

}

const HookSortLists = (props: IHookSortListsProps) => {
    const [sortable, setSortable] = React.useState(true)
    const {data, onChange} = props

    const handlersOnChange = (id: string, name: string) => {
        if (!utilsObject.isUndefined(data)) {
            const filter: Array<{
                id: string
                title: string
            }> | undefined = data?.filter(x => x.title === name);
            if (filter?.length === 0) {
                const newData = data?.map((k, i, a) => {
                    if (k.id === id) {
                        k.title = name;
                    }
                    return k
                })
                onChange?.(newData)
            } else {
                Alert.warning(`名称${name}重复`)
            }
        }
    }

    const handlersOnSort = (oldIndex?: number, newIndex?: number) => {
        if (!utilsObject.isUndefined(data) && oldIndex) {
            const moveData: Array<any> | undefined = data?.splice(oldIndex, 1);
            const newData = data;
            if (newIndex != null) {
                newData?.splice(newIndex, 0, moveData?.[0]);
            }
            let preId = ''
            const map = newData?.map((k, i, a) => {
                k.preId = preId
                preId = k.id
                return k
            });
            props?.onChange?.(map)
        }
    }

    if (utilsObject.isUndefined(data) || data?.length === 0) {
        return <></>
    }
    return (
        <>
            <List
                size={'lg'}
                sortable={sortable}
                bordered={false}
                pressDelay={100}
                onSort={(d, e) => handlersOnSort(d?.oldIndex, d?.newIndex)}
            >
                {
                    data?.map((k, i, a) => (
                        <List.Item index={i}>
                            <HookViewList id={k.id}
                                          title={k.title}
                                          onChange={handlersOnChange}
                                          onEdit={(v) => {
                                              setSortable(v);
                                          }}/>
                        </List.Item>
                    ))
                }
            </List>
        </>
    )
}

interface IHookViewListProps {
    id: string

    title: string

    onChange?(id: string, name: string): void

    onEdit?(v: boolean): void
}

const HookViewList = (props: IHookViewListProps) => {
    const [formValue, setFormValue] = React.useState({title: ''})
    const [formError, setFormError] = React.useState({})
    const [edit, setEdit] = React.useState(false)
    const [height, setHeight] = React.useState(15)
    const {onEdit} = props
    let _Forms: any;
    const model = Schema.Model({
        title: Schema.Types.StringType()
            .maxLength(20, '名称长度不大于20个字')
            .minLength(2, '不能最小不能少于2个字')
            .isRequired('名称不能为空')
    });

    const _rest = () => {
        setFormValue?.({
            title: props.title
        })
        setFormError?.({})
    }

    return (
        <>
            <div style={{display: 'flex', height: height}}>
                <div style={{
                    display: 'flex',
                    flex: 0.7,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    {
                        edit ? (
                            <Form
                                ref={(ref: any) => _Forms = ref}
                                formValue={formValue}
                                formError={formError}
                                model={model}
                                onCheck={(formErrors: any) => {
                                    setFormError?.(formErrors)
                                }}
                                onChange={(formValues: any) => {
                                    setFormValue?.(formValues)
                                }}>
                                <FormGroup>
                                    <FormControl style={{width: 240}}
                                                 autocomplete={'off'}
                                                 placeholder={'请输入名称'}
                                                 accepter={Input}
                                                 name="title"/>
                                </FormGroup>
                            </Form>
                        ) : props.title
                    }
                </div>
                <div className={'app-editModel-list-tool'}
                     style={{display: 'flex', flex: 0.3, justifyContent: 'flex-end', alignItems: 'center'}}>
                    {
                        edit ? (
                            <>
                                <ButtonGroup>
                                    <IconButton loading={false} appearance="subtle" onClick={() => {
                                        if (_Forms?.check()) {
                                            setEdit?.(false)
                                            onEdit?.(true)
                                            setHeight(15)
                                            props?.onChange?.(props.id, formValue.title)
                                        }
                                    }} icon={<Icon icon="ok-circle"/>}/>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <IconButton appearance="subtle" onClick={() => {
                                        setEdit?.(false);
                                        onEdit?.(true)
                                        setHeight(15)
                                        _rest()
                                    }} icon={<Icon icon="warning"/>}/>
                                </ButtonGroup>
                            </>
                        ) : (
                            <ButtonGroup>
                                <IconButton appearance="subtle" onClick={() => {
                                    _rest()
                                    onEdit?.(false)
                                    setEdit?.(!edit)
                                    setHeight(60)
                                }} icon={<Icon icon="edit2"/>}/>
                            </ButtonGroup>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default HookSortLists
