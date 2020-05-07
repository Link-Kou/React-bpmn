import * as React from 'react';
import {
    Button,
    ButtonToolbar,
    Col,
    Container,
    Content,
    ControlLabel,
    Footer,
    Form,
    FormControl,
    FormGroup,
    Grid,
    Header,
    Modal,
    Row,
    Tree
} from 'rsuite';

interface IProps {

}

export default class ProductSort extends React.Component<IProps> {

    public state = {
        /**
         * 目录书数据
         */
        treeData: [
            {
                title: '系统菜单树',
                id: 'root',
                /**
                 * menu|group|button
                 */
                type: 'root',
                subtitle: '',
                /**
                 * 父节点
                 */
                parentid: '',
                /**
                 * 同级上节点
                 */
                peersupid: '',
                children: [{
                    title: '系统菜单树2',
                    id: 'root2',
                    /**
                     * menu|group|button
                     */
                    type: 'root',
                    subtitle: '',
                    /**
                     * 父节点
                     */
                    parentid: '',
                    /**
                     * 同级上节点
                     */
                    peersupid: ''
                }]
            }
        ],
        show: false
    }


    public _onShow() {
        this.setState({
            show: true
        })
    }

    public _onClose() {
        this.setState({
            show: false
        })
    }

    public render() {
        return (
            <Modal
                size={'sm'}
                show={this.state.show}
                overflow={false}
                onHide={this._onClose.bind(this)}
            >
                <Modal.Header>
                    <Modal.Title>
                        <Grid fluid={true}>
                            <Row>
                                <Col xs={6} sm={6} md={6} style={{lineHeight: '36px'}}>
                                    Modal Title
                                </Col>
                                <Col xs={18} sm={18} md={18}
                                     style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 10}}>
                                    <ButtonToolbar>
                                        <Button appearance="primary">新增分类</Button>
                                        <Button appearance="primary">删除分类</Button>
                                    </ButtonToolbar>
                                </Col>
                            </Row>
                        </Grid>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Header/>
                        <Content>
                            <Grid fluid={true}>
                                <Row>
                                    <Col xs={16} sm={16} md={16} style={{borderRight: '1px solid #e5e5ea'}}>
                                        <Tree style={{height: 850}} data={this.state.treeData} valueKey={'id'}
                                              labelKey={'title'}
                                            //expandItemValues={this.state.expandItemValues}
                                              defaultExpandAll={true}
                                            //renderTreeNode={(nodeData: any) => this._node(nodeData)}
                                        />
                                    </Col>
                                    <Col xs={8} sm={8} md={8}>
                                        <Form fluid={true}>
                                            <FormGroup>
                                                <ControlLabel>Username</ControlLabel>
                                                <FormControl disabled={true} name="name"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <ControlLabel>Email</ControlLabel>
                                                <FormControl disabled={true} name="email" type="email"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Button disabled={true} appearance="primary">保存</Button>
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </Grid>
                        </Content>
                        <Footer/>
                    </Container>
                </Modal.Body>
                <Modal.Footer/>
            </Modal>
        )
    }

}
