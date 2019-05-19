import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


import { Card, Radio } from 'antd';

const RadioGroup = Radio.Group;


class ItemCard extends PureComponent{
    
    static propTypes = {
        description: PropTypes.string,
        title: PropTypes.string,
        option: PropTypes.object,
        price: PropTypes.number,
    };

    constructor(props){
        super(props);
        
        this.state = {
            optionValue: (props.option && props.option.defaultSelect)? props.option.defaultSelect: null
        };
        this.onChageHandleOptions = this.onChageHandleOptions.bind(this);
    }

    onChageHandleOptions(e){

    }
    
    render() {

        const { description, title, price, option } = this.props;

        return (
            <Card title={title} className="itemcard">
                <p>
                    {description}
                </p>
                {
                    (option && option.options.length) && (
                     
                            <RadioGroup onChange={this.onChageHandleOptions} value={this.state.optionValue}>
                                    {
                                        option.options.map((item)=>
                                            (<Radio value={item.value}>{item.label}</Radio>)
                                        )
                                    }
                                </RadioGroup>
                        
                    )
                }
                <p className="itemcard__price-section">
                    Price: <h5>${price}</h5>
                </p>
            </Card>
        )
    }

}


export default ItemCard;
