import React from 'react'
import Slider, { SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;
const handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} K`}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
  };
  const wrapperStyle = { width: 400, margin: 50 };
 
const Salary = () => {
  return (
    <><Range min={0} max={20} defaultValue={[3, 10]} tipFormatter={value => `${value}K`} /></>
  )
}

export default Salary