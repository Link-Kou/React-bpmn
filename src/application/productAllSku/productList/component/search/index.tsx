import * as React from 'react';
import {
    Button,
    ControlLabel, Drawer,
    Form,
    FormControl,
    FormGroup,
    Input,
    InputPicker,
    Popover,
    TreePicker,
    Whisper
} from 'rsuite';

interface IProps {
    show?:boolean
}

export default class ProductListSearch extends React.Component<IProps> {

    public state = {
        data: [],
        loading: false,
        show: false,
        userId: '',
        formValue: {
            productType: [
                {
                    value: '123',
                    label: 123,
                    children: [
                        {
                            value: '456',
                            label: '456',
                            children: []
                        }
                    ]
                }
            ],
            productStatus: [
                {
                    value: '1231',
                    label: '123123'
                }
            ]
        }
    }

    public popoverRef: any;


    public _speaker = ({...props}) => {
        return (
            <Popover title="Title" {...props}>
                <p>This is a Popover </p>
                <div ref={(ref) => this.popoverRef = ref}>
                    <Form layout="vertical">
                        <FormGroup>
                            <ControlLabel>商品分类</ControlLabel>
                            <FormControl name="productType" placeholder="请选择商品分类"
                                         data={this.state.formValue.productType}
                                         container={() => this.popoverRef}
                                         style={{width: 150}} defaultExpandAll={true}
                                         accepter={TreePicker}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>商品状态</ControlLabel>
                            <FormControl name="productStatus" placeholder="请选择商品状态"
                                         data={this.state.formValue.productStatus} accepter={InputPicker}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>商品名称</ControlLabel>
                            <FormControl name="productName" placeholder="请输入商品名称" type="text" accepter={Input}/>
                        </FormGroup>
                    </Form>
                </div>
            </Popover>
        );
    };

    public render() {

        return (
            <Whisper
                placement="bottom"
                trigger="hover"
                speaker={<this._speaker/>}
            >
                <Button appearance="subtle">条件搜索</Button>
            </Whisper>
        )
    }

}


export class ProductListSearchDrawer extends React.Component<IProps> {

    public render() {
        const {show} = this.props
        return (
            <Drawer backdrop={false} size={'xs'} show={show} onHide={() => {
                this.setState({
                    show: false
                })
            }}>
                <Drawer.Header>
                    <Drawer.Title>搜索</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <Form layout="vertical">
                        <FormGroup>
                            <ControlLabel>商品分类</ControlLabel>
                            <FormControl name="productType" placeholder="请选择商品分类"
                                         data={[]}
                                //container={() => this.popoverRef}
                                         style={{width: 150}} defaultExpandAll={true}
                                         accepter={TreePicker}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>商品状态</ControlLabel>
                            <FormControl name="productStatus" placeholder="请选择商品状态"
                                         data={[]}
                                         accepter={InputPicker}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>商品名称</ControlLabel>
                            <FormControl name="productName" placeholder="请输入商品名称" type="text" accepter={Input}/>
                        </FormGroup>
                    </Form>
                </Drawer.Body>
                <Drawer.Footer>
                    <Button appearance="primary">
                        Confirm
                    </Button>
                    <Button appearance="subtle">
                        Cancel
                    </Button>
                </Drawer.Footer>
            </Drawer>
        )
    }
}
