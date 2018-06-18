import React, { PureComponent } from 'react';
import { Select } from 'antd';

class DropdownSelect extends PureComponent {

  onChangeItem = (value) => {
    this.props.onSelectItem(value);
  }

  render() {
    const { className, defaultValue, options, ...props } = this.props;
    return (
      <Select
        {...props}
        className={`nrl-dropdown${className ? ' ' + className : ''}`}
        size="large"
        onChange={(value) => this.onChangeItem(value)}
        value={defaultValue}
      >
        {
          (options && options.length) && (
            options.map((item, index) => (
              item.name ? 
              <Select.Option
                key={index}
                value={item.name}
              >
                {item.name}
              </Select.Option>
              : null
            ))
          )
        }
      </Select>
    );
  }
}

export default DropdownSelect;
