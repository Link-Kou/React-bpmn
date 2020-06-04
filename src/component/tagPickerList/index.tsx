import * as React from 'react';
import {Input, Tag, TagGroup, IconButton, Icon} from 'rsuite';
import './index.scss'


interface IProps {
    onChange?(v: Array<any>): void

    value?: Array<any>

    creatable?: boolean
}

/**
 *
 * @author lk
 * @date 2020/6/2 15:02
 * @version 1.0
 */
export default class TagPickerList extends React.Component<IProps> {

    private _input: any;

    public state = {
        typing: false,
        inputValue: ''
    }


    private handleButtonClick = () => {
        this.setState(
            {
                typing: true
            },
            () => {
                this._input.focus();
            }
        );
    }

    private handleInputChange = (inputValue: any) => {
        this.setState({inputValue});
    }

    private handleInputConfirm = () => {
        const {onChange, value} = this.props;
        const {inputValue} = this.state;
        let nextTags: Array<any>;
        if (value) {
            const filter = value.filter(item => item !== inputValue)
            if (inputValue) {
                filter.push(inputValue);
            }
            nextTags = filter
        } else {
            nextTags = [inputValue]
        }
        this.setState({
            tags: nextTags,
            typing: false,
            inputValue: ''
        }, () => {
            onChange?.(nextTags)
        });
    }

    private handleTagRemove = (tag: any) => {
        const props = this.props;
        const {onChange, value} = props;
        if (value) {
            const nextTags = value.filter(item => item !== tag);
            this.setState({
                tags: nextTags
            }, () => {
                onChange?.(nextTags)
            });
        }
    }

    private renderInput(creatable: boolean = true) {
        const {typing, inputValue} = this.state;

        if (typing) {
            return (
                <div style={{marginLeft: 5, display: 'inline-block'}}>
                    <Input
                        className="tag-input"
                        inputRef={ref => {
                            this._input = ref;
                        }}
                        size="xs"
                        style={{width: 70}}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                </div>
            );
        }
        if (!creatable) {
            return undefined
        }
        return (
            <div style={{marginLeft: 5, display: 'inline-block'}}>
                <IconButton
                    onClick={this.handleButtonClick}
                    icon={<Icon icon="plus" style={{fontSize: 12}}/>}
                    appearance="link"
                    size="xs"
                />
            </div>
        );
    }

    public render() {
        const {value, creatable} = this.props;
        return (
            <div className={'app-tag-picker-list'}>
                <TagGroup>
                    {value?.map((k, i, a) => (
                        <Tag
                            key={i}
                            closable={true}
                            onClose={() => this.handleTagRemove(k)}>
                            {k}
                        </Tag>
                    ))}
                    {this.renderInput(creatable)}
                </TagGroup>
            </div>

        );
    }
}
