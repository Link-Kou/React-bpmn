import * as React from 'react';
import {
    ButtonGroup,
    ButtonToolbar,
    Col,
    Dropdown,
    Grid,
    Icon,
    IconButton,
    Input,
    Modal,
    Popover,
    Row,
    Whisper
} from 'rsuite';
import {HeadPanel, LongPanel} from '@component/panel';
import SqlQuery from '@component/sqlQuery';
import SaveList from '../saveList'


interface IHookSqlQuery {
    onClose?(): void

    show?: boolean

    onSearch?(query: any): void

    SqllExpression(props: { data: any, node: any, id: any, onExtend: (id: string, extendNode: (id: string, value: any, refresh?: boolean) => void) => void }): JSX.Element

}

const Speaker = ({onLoading, ...props}: { onLoading: any }) => {
    return (
        <Popover title="保存" {...props}>
            <div style={{display: 'flex'}}>
                <Input autocomplete="off" placeholder="请输入标题"/>
                <IconButton appearance={'link'} icon={<Icon icon={'check-circle'}/>} onClick={() => onLoading?.()}/>
            </div>
        </Popover>
    );
};

/**
 * SQL
 * @author lk
 * @date 2020/5/21 09:48
 * @version 1.0
 */
export default class Index extends React.Component<IHookSqlQuery> {

    private _SqlQuery: SqlQuery | undefined;

    private _Whisper: any

    public state = {
        expression: '',
        query: [
            {
                id: 'asdasdasd',
                type: 'expression',
                link: 'OR',
                children: [],
                extend: {
                    field: 'name',
                    symbol: 'in',
                    value: ['ss', 'ff']
                }
            }
        ],
        loading: false
    }

    private _onLoading = () => {
        this._Whisper.hide()
        this.setState({
            loading: true
        })
    }

    private _onClose = () => {
        const {onClose} = this.props
        this.setState({
            loading: false
        }, () => {
            onClose?.()
        })
    }

    public render() {
        const {show, onSearch, SqllExpression} = this.props
        const {query, loading} = this.state
        return (
            <>
                <Modal backdrop={'static'} show={show} onHide={this._onClose} size={'lg'}>
                    <Modal.Header>
                        <HeadPanel hideBorderBottom={true}
                                   title={<><Icon style={{fontSize: '1.5em', marginRight: 10}}
                                                  icon={'superscript'}/>表达式编辑</>}>
                            <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                                <ButtonToolbar>
                                    <ButtonGroup>
                                        <IconButton icon={<Icon icon={'search'}/>} appearance={'subtle'}
                                                    onClick={() => {
                                                        onSearch?.(this._SqlQuery?.getExpression())
                                                    }}>搜索</IconButton>
                                        <Dropdown
                                            placement="bottomEnd"
                                            renderTitle={() => {
                                                return <IconButton appearance={'subtle'}
                                                                   icon={<Icon icon="history"/>}/>;
                                            }}
                                        >
                                            <Dropdown.Item eventKey={'add'}>重置</Dropdown.Item>
                                        </Dropdown>
                                    </ButtonGroup>
                                    <IconButton icon={<Icon icon={'export'}/>} appearance={'subtle'} onClick={() => {
                                        onSearch?.(this._SqlQuery?.getExpression())
                                    }}>导出</IconButton>
                                    <IconButton icon={<Icon icon={'import'}/>} appearance={'subtle'} onClick={() => {
                                        onSearch?.(this._SqlQuery?.getExpression())
                                    }}>导入</IconButton>
                                    <Whisper
                                        triggerRef={(ref: any) => (this._Whisper = ref)}
                                        placement={'bottomEnd'}
                                        trigger="click"
                                        speaker={<Speaker onLoading={this._onLoading}/>}
                                    >
                                        <IconButton icon={<Icon icon={'save'}/>}
                                                    loading={loading}
                                                    appearance={'subtle'}
                                                    onClick={() => {
                                                        onSearch?.(this._SqlQuery?.getExpression())
                                                    }}>保存</IconButton>
                                    </Whisper>
                                </ButtonToolbar>
                            </div>
                        </HeadPanel>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid fluid={true}>
                            <Row className="show-grid">
                                <Col md={4}>
                                    <SaveList/>
                                </Col>
                                <Col md={20}>
                                    <LongPanel style={{height: 650}}>
                                        <SqlQuery
                                            ref={ref => this._SqlQuery = (ref as any)}
                                            query={query}
                                            onChange={(querys: any, expression: string) => {
                                                this.setState({
                                                    query: querys,
                                                    expression
                                                })
                                            }}
                                            expression={(props: { data: any, node: any, id: any, onExtend: (id: string, extendNode: (id: string, value: any, refresh?: boolean) => void) => void }) => {
                                                return SqllExpression?.(props)
                                                /*return (
                                                    <SqllExpressionCom {...props}/>
                                                )*/
                                            }}/>
                                    </LongPanel>
                                </Col>
                            </Row>
                        </Grid>
                    </Modal.Body>
                    <Modal.Footer/>
                </Modal>
            </>
        )
    }
}

