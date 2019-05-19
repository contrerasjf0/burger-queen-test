import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


import { Button, Card, Radio } from 'antd';

const RadioGroup = Radio.Group;


class ItemCard extends PureComponent{
    
    static propTypes = {
        button: PropTypes.object,
        data: PropTypes.object
    };

    constructor(props){
        super(props);
        
        this.state = {
            optionValue: (props.data.option && props.data.option.defaultSelect)? props.data.option.defaultSelect: null
        };
        this.handleOptionsChange = this.handleOptionsChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }

    handleOptionsChange(value){
        this.setState({optionValue: value.target.value});
    }

    handleAddClick(value){
        
        let orderSelected = {
            id: this.props.data.id,
            name: this.props.data.title,
            price: this.props.data.price,
        };

        if(typeof this.props.data.option === 'object' && Object.keys(this.props.data.option)){
            orderSelected.meet = this.state.optionValue
        }


        if(this.props.button && this.props.button.onClick) this.props.button.onClick(orderSelected); 
    }
    
    render() {

        const { button, data } = this.props;

        return (
            <Card title={data.title} className="itemcard">
                <p>
                    {data.description}
                </p>
                {
                    (data.option && data.option.options.length) && (
                     
                            <RadioGroup onChange={this.handleOptionsChange} value={this.state.optionValue}>
                                    {
                                        data.option.options.map((item, index)=>
                                            (<Radio key={`IC-R-${index}`} value={item.value}>{item.label}</Radio>)
                                        )
                                    }
                                </RadioGroup>
                        
                    )
                }
                <p className="itemcard__price-section">
                    Price: <h5>${data.price}</h5>
                </p>
                {
                    (button && button.label) && (
                        <div>
                            <Button type="primary" onClick={this.handleAddClick}>{button.label}</Button>
                        </div>
                    ) 
                }
            </Card>
        )
    }

}


export default ItemCard;
