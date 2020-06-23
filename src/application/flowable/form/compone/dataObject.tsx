import * as React from 'react';
import {
    ButtonGroup,
    ButtonToolbar,
    Col,
    ControlLabel,
    Form,
    FormControl,
    FormGroup,
    Grid,
    Icon,
    IconButton,
    Row,
    Table
} from 'rsuite';

const {Column, HeaderCell, Cell} = Table;


interface IProps {
    value?: any

    onChange?(value: any): void
}

/**
 *
 * @author lk
 * @date 2020/6/20 15:57
 * @version 1.0
 */
export default class dataObject extends React.Component<IProps> {

    public Columns = [
        {
            HeaderCell: <HeaderCell>id</HeaderCell>,
            Cell: <Cell dataKey="id"/>,
            width: 120,
            fixed: false,
            resizable: false
        }, {
            HeaderCell: <HeaderCell>名称</HeaderCell>,
            Cell: <Cell dataKey="name"/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>类型</HeaderCell>,
            Cell: <Cell dataKey="type"/>,
            width: 120,
            fixed: false,
            resizable: false
        },
        {
            HeaderCell: <HeaderCell>默认值</HeaderCell>,
            Cell: <Cell dataKey="value"/>,
            width: 120,
            fixed: false,
            resizable: false
        }
    ]

    public state = {
        formValue: {
            id: '',
            name: '',
            type: '',
            value: ''
        },
        readOnly: true
    }

    private _onRowClick = (rowData: any, event: any) => {
        this.setState({
            formValue: rowData,
            readOnly: false
        })
    }

    private _onFormValueChange = (formValue: any, event: any) => {
        const {onChange, value} = this.props
        if (Array.isArray(value)) {
            let type = false;
            const filter = value.map((k, i, a) => {
                if (k?.id === formValue?.id) {
                    type = true;
                    return formValue;
                }
                return k
            });
            if (!type) {
                filter.push(formValue)
            }
            this.setState({
                formValue
            }, () => {
                onChange?.(filter)
            })
        }
    }

    private _onRowClassName = (rowData: any) => {
        const {formValue} = this.state
        return rowData?.id === formValue.id ? 'app-flowable-table-row-select' : '';
    }

    /**
     * 排序
     * @param index
     * @private
     */
    private _onSort = (index: number) => {
        const {onChange, value} = this.props
        const {formValue} = this.state
        if (Array.isArray(value)) {
            const findIndex = value.findIndex((k, i, a) => k?.id === formValue?.id);
            if (findIndex > 0 || findIndex < value.length - 1) {
                value.splice(findIndex, 1)
                value.splice(findIndex + index, 0, formValue)
            }
        }
        onChange?.(value)
    }

    /**
     * 添加
     * @private
     */
    private _onAdd = () => {
        const {onChange, value} = this.props
        const {formValue} = this.state
        if (Array.isArray(value)) {
            const findIndex = value.findIndex((k, i, a) => k?.id === formValue?.id);
            const id = Date.now().toString(36);
            value.splice(findIndex > -1 ? findIndex : 0, 0, {
                id: id,
                name: '',
                type: '',
                value: ''
            })
            this.setState({
                formValue: {
                    id: id,
                    name: '',
                    type: '',
                    value: ''
                },
                readOnly: false
            }, () => {
                onChange?.(value)
            })
        }
    }

    /**
     * 删除
     * @private
     */
    private _onDel = () => {
        const {onChange, value} = this.props
        const {formValue} = this.state
        if (Array.isArray(value)) {
            const findIndex = value.findIndex((k, i, a) => k?.id === formValue?.id);
            if (findIndex > -1) {
                value.splice(findIndex, 1)
                this.setState({
                    formValue: {
                        id: '',
                        name: '',
                        type: '',
                        value: ''
                    }
                })
            }
        }
        onChange?.(value)
    }

    public render() {
        const {value} = this.props
        const {formValue, readOnly} = this.state
        return (
            <Grid fluid={true}>
                <Row>
                    <Col xs={16}>
                        <Table
                            loading={false}
                            height={380}
                            rowHeight={120}
                            headerHeight={65}
                            autoHeight={false}
                            bordered={true}
                            cellBordered={true}
                            data={value}
                            rowClassName={this._onRowClassName}
                            onRowClick={this._onRowClick}
                        >
                            {
                                this.Columns.map((k: any, i, a) => (
                                    <Column width={k.width} align="center" flexGrow={k.flexGrow} colSpan={k.colSpan}
                                            verticalAlign={'middle'} fixed={k.fixed} resizable={k.resizable}>
                                        {k.HeaderCell}
                                        {k.Cell}
                                    </Column>
                                ))
                            }
                        </Table>
                    </Col>
                    <Col xs={8}>
                        <Form fluid={true}
                              readOnly={readOnly}
                              formValue={formValue}
                              onChange={this._onFormValueChange}
                        >
                            <FormGroup>
                                <ControlLabel>id</ControlLabel>
                                <FormControl readOnly={true} disabled={true} autocomplete={'off'} name="id"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>名称</ControlLabel>
                                <FormControl autocomplete={'off'} name="name"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>类型</ControlLabel>
                                <FormControl autocomplete={'off'} name="type"/>
                            </FormGroup>
                            <FormGroup>
                                <ControlLabel>默认值</ControlLabel>
                                <FormControl autocomplete={'off'} name="value"/>
                            </FormGroup>
                            <FormGroup>
                                <ButtonToolbar style={{minWidth: 150}}>
                                    <ButtonGroup>
                                        <IconButton onClick={this._onAdd} icon={<Icon icon='data-increase'/>}/>
                                        <IconButton onClick={this._onDel} icon={<Icon icon='data-decrease'/>}/>
                                    </ButtonGroup>
                                    <ButtonGroup>
                                        <IconButton onClick={() => this._onSort(-1)}
                                                    icon={<Icon icon='arrow-up'/>}/>
                                        <IconButton onClick={() => this._onSort(+1)}
                                                    icon={<Icon icon='arrow-down'/>}/>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        )
    }

}
