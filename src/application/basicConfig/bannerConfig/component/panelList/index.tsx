import * as React from 'react';
import {
    Alert,
    ButtonGroup,
    ButtonToolbar,
    Dropdown,
    Icon,
    IconButton,
    Panel,
    PanelGroup,
    Placeholder,
    Tag,
    TagGroup
} from 'rsuite';
import './index.scss'
import Dialog from '@component/dialog';
import FlexCalcBox from '@component/flexCalcBox';
import { HeadPanel } from '@component/panel';

const {Paragraph} = Placeholder;

export default class BannerConfigPanelList extends React.Component {

    public state = {}

    public render() {
        const tags: Array<string> = ['xx', 'xx']
        return (
            <>
                <HeadPanel title={'所有分类'}>
                    <div style={{display: 'flex', flex: 1, justifyContent: 'flex-end'}}>
                        <Dropdown title={'分类管理'} trigger="click">
                            <Dropdown.Item>新增分类</Dropdown.Item>
                            <Dropdown.Item>分类排序</Dropdown.Item>
                        </Dropdown>
                    </div>
                </HeadPanel>
                <FlexCalcBox subHeight={65 + 57} overflow={'auto'} Body={() => (
                    <PanelGroup accordion={true} bordered={false}>
                        <Panel header={'纸箱分类'} defaultExpanded={true}>
                            <div className={'app-bannerConfig-plnel'}>
                                <TagGroup>
                                    {tags.map((item, index) => (
                                        <Tag
                                            color='blue'
                                            key={index}
                                            closable={true}
                                            onClose={() => {
                                                Dialog.Load({
                                                    title: '',
                                                    callback: (e) => {
                                                        setTimeout(() => {
                                                            e.close()
                                                        }, 2500)
                                                    }
                                                })
                                            }}
                                        >
                                            {item}
                                        </Tag>
                                    ))}
                                </TagGroup>
                                <ButtonToolbar>
                                    <ButtonGroup>
                                        <IconButton icon={<Icon icon="edit"/>}/>
                                        <IconButton icon={<Icon icon="close-circle"/>}/>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </div>
                        </Panel>
                        <Panel header={'纸板分类'} defaultExpanded={true}>
                            <TagGroup>
                                {tags.map((item, index) => (
                                    <Tag
                                        color='blue'
                                        key={index}
                                        closable={true}
                                        onClose={() => {
                                            Dialog.Select({
                                                title: '是否关闭',
                                                boby: '是否对XX进行关闭',
                                                callback: (e) => {
                                                    alert(JSON.stringify(e))
                                                }
                                            })
                                        }}
                                    >
                                        {item}
                                    </Tag>
                                ))}
                            </TagGroup>
                        </Panel>
                        <Panel header={'辅料分类'} defaultExpanded={true}>
                            <TagGroup>
                                {tags.map((item, index) => (
                                    <Tag
                                        color='blue'
                                        key={index}
                                        closable={true}
                                        onClose={() => {
                                            Dialog.SelectLoad({
                                                title: '是否关闭',
                                                boby: '是否对XX进行关闭',
                                                callback: (e) => {
                                                    if (e.success) {
                                                        setTimeout(() => {
                                                            e.close(() => Alert.warning('dfdf'))
                                                        }, 6500)
                                                    }
                                                    //alert(JSON.stringify(e))
                                                }
                                            })
                                        }}
                                    >
                                        {item}
                                    </Tag>
                                ))}
                            </TagGroup>
                        </Panel>
                        <Panel header={'适用行业'} defaultExpanded={true}>
                            <Paragraph style={{marginTop: 30}} graph="circle"/>
                            <Paragraph style={{marginTop: 30}} graph="circle"/>
                            <Paragraph style={{marginTop: 30}} graph="circle"/>
                            <Paragraph style={{marginTop: 30}} graph="circle"/>
                        </Panel>
                        <Panel header={'其他行业'} defaultExpanded={true}>
                            <Paragraph style={{marginTop: 30}} graph="circle"/>
                            <Paragraph style={{marginTop: 30}} graph="circle"/>
                            <Paragraph style={{marginTop: 30}} graph="circle"/>
                            <Paragraph style={{marginTop: 30}} graph="circle"/>
                        </Panel>
                    </PanelGroup>
                )}/>
            </>
        )
    }
}




