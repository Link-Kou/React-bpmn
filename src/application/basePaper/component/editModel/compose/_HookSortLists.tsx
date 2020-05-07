import * as React from 'react';
import {Alert, ButtonGroup, Form, FormControl, FormGroup, Icon, IconButton, Input, List, Schema} from 'rsuite';
import {utilsObject} from '@utils/index';

interface IHookSortListsProps {
    data?: Array<{
        id: string
        title: string
    }>

    onChange?(data?: Array<{
        id: string
        title: string
    }>): void

}

const HookSortLists = (props: IHookSortListsProps) => {
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

    if (utilsObject.isUndefined(data) || data?.length === 0) {
        return <></>
    }
    return (
        <>
            <List
                sortable={false}
                bordered={false}
                pressDelay={100}
            >
                {
                    data?.map((k, i, a) => (
                        <List.Item index={i}>
                            <HookViewList id={k.id} title={k.title} onChange={handlersOnChange}/>
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
}

const HookViewList = (props: IHookViewListProps) => {
    const [formValue, setFormValue] = React.useState({title: ''})
    const [formError, setFormError] = React.useState({})
    const [edit, setEdit] = React.useState(false)
    const [height, setHeight] = React.useState(25)
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
                                            setHeight(25)
                                            props?.onChange?.(props.id, formValue.title)
                                        }
                                    }} icon={<Icon icon="ok-circle"/>}/>
                                </ButtonGroup>
                                <ButtonGroup>
                                    <IconButton appearance="subtle" onClick={() => {
                                        setEdit?.(false);
                                        setHeight(25)
                                        _rest()
                                    }} icon={<Icon icon="warning"/>}/>
                                </ButtonGroup>
                            </>
                        ) : (
                            <ButtonGroup>
                                <IconButton appearance="subtle" onClick={() => {
                                    _rest()
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
