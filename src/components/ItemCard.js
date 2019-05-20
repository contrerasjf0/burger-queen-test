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
            optionValue: (props.data.options && props.data.options.default)? props.data.options.default: null
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
            name: this.props.data.name,
            price: this.props.data.price,
        };

        if(typeof this.props.data.options === 'object' && Object.keys(this.props.data.options)){
            orderSelected.meat = this.props.data.options.options.find((item) =>{
                return item.value === this.state.optionValue;
            }).label;
        }


        if(this.props.button && this.props.button.onClick) this.props.button.onClick(orderSelected); 
    }
    
    render() {

        const { button, data } = this.props;

        return (
            <Card title={data.name} className="itemcard">
                <p>
                    {data.description}
                </p>
                {
                    (data.options && data.options.options.length) && (
                     
                            <RadioGroup onChange={this.handleOptionsChange} value={this.state.optionValue}>
                                    {
                                        data.options.options.map((item, index)=>
                                            (<Radio key={`IC-R-${index}`} value={item.value}>{item.label}</Radio>)
                                        )
                                    }
                                </RadioGroup>
                        
                    )
                }
                <p className="itemcard__price-section">
                    Price: <span>${data.price}</span>
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
