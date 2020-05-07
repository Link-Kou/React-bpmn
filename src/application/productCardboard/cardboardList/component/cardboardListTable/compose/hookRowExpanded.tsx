import {Panel, Steps} from 'rsuite';
import {ImageCardView} from '@component/imageManager';
import * as React from 'react';
import {IReturnCardboardProduct} from '../../../../index.types';

export const HooKRowExpanded = (props: { w: number, rowData: IReturnCardboardProduct }) => {
    const {w, rowData} = props
    return (
        <div style={{width: w - 60}}>
            <Panel header="纸板每层">
                <Steps current={0}>
                    {
                        rowData?.layers?.map((k, i, a) => (
                            <Steps.Item status={'process'}
                                        title={`${k?.paperName}(${k?.paperType})`}
                                        description={
                                            <ul style={{listStyle: 'none', padding: 0}}>
                                                <li>
                                                    {['', '克重', '系数'][k?.paperType]}: {k?.coefG}
                                                </li>
                                                <li>
                                                    成本: {k?.cost}
                                                </li>
                                            </ul>}
                            />
                        ))
                    }
                </Steps>
            </Panel>
            <Panel header="详情图">
                <div style={{display: 'flex'}}>
                    {
                        rowData?.images?.filter((k, i, a) => k.type === 2).map((k, i, a) => (
                            <ImageCardView
                                fileUrl={k.url}/>
                        ))
                    }
                </div>
            </Panel>
        </div>
    )
}
