import * as React from 'react';
import {Button, Dropdown, Modal} from 'rsuite';
import HookSortLists from './compose/hookSortLists';
import nanoid from 'nanoid';

interface IProps {
    show?: boolean
    data: Array<any>
}

interface IState {
    newData?: Array<any>
}

/**
 *
 * @author lk
 * @date 2020/5/26 19:10
 * @version 1.0
 */
export default class UserAdminRole extends React.Component<IProps, IState> {

    public state = {
        newData: [
            {
                id: '123',
                title: 'asd',
                preId: 'asd',
                edit: false
            }
        ]
    }


    private _onSelect = (key: string) => {
        const {newData} = this.state
        switch (key) {
            case 'addUser':
                newData.push({
                    id: nanoid(),
                    title: '',
                    preId: '',
                    edit: true
                })
                this.setState({
                    newData
                })
                break;
            default:

        }
    }

    public render() {
        const {show, data} = this.props
        const {newData} = this.state
        const list = [...newData, ...data]
        return (
            <Modal show={show}
                   size={'xs'}
                   backdrop={'static'}>
                <Modal.Header>
                    <Modal.Title>角色管理</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HookSortLists data={list} onChange={(datas) => {
                        this.setState({
                            newData: datas
                        })
                    }}/>
                </Modal.Body>
                <Modal.Footer style={{display: 'flex'}}>
                    <div style={{display: 'flex', flex: 1}}>
                        <Dropdown title={'角色管理'} trigger="click" onSelect={this._onSelect}>
                            <Dropdown.Item eventKey={'addUser'}>新增角色</Dropdown.Item>
                        </Dropdown>
                    </div>
                    <div>
                        <Button appearance="primary">
                            保存
                        </Button>
                        <Button appearance="subtle">
                            取消
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
    }
}
