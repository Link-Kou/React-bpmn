import * as React from 'react';
import {Dropdown, InputNumber, Steps} from 'rsuite';
import FlexCalcBox from '@component/flexCalcBox';
import {HeadPanel} from '@component/panel';


export default class PriceElSteps extends React.Component {


    public renderTime(title: string) {
        return (
            <>
                <p>{title}</p>
                <InputNumber/>
            </>
        )
    }

    public render() {
        return (
            <>
                <HeadPanel hideBorderBottom={true} title={'营销表达式'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Dropdown title={'产品管理'} trigger="click">
                            <Dropdown.Item onSelect={() => {

                            }}>新增一口价方案</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {

                            }}>新增阶梯价方案</Dropdown.Item>
                            <Dropdown.Item onSelect={() => {

                            }}>分类排序</Dropdown.Item>
                        </Dropdown>
                    </div>
                </HeadPanel>
                <FlexCalcBox subHeight={125} Body={(e) => (
                    <div style={{margin: '0 auto', width: 285}}>
                        <Steps vertical={true}>
                            <Steps.Item title={this.renderTime('总限量')} description="商品可以购买时间"/>
                            <Steps.Item title={this.renderTime('每人限量')} description="Description"/>
                        </Steps>
                    </div>
                )}/>
            </>
        )
    }
}
