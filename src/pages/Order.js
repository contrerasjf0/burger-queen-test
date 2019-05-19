import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { 
    Button,
    Col,
    Collapse,
    Divider,
    Input,
    Icon,
    Radio,
    Row,
    Table
} from 'antd';

import ItemCard from '../components/ItemCard';



const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
const { Column } = Table;

const itemFastFood = [
    {
        description: 'This hamburger has only one meat piece and all  classic ingredintes.',
        title: 'Hamburguesa Simple',
        price: 10.00,
        option:{
            title: 'Kind Of Meat',
            defaultSelect: 'beef',
            options: [
                {
                    value: 'beef',
                    label: 'Beef'
                },
                {
                    value: 'chicken',
                    label: 'Chiken'
                },
                {
                    value: 'vegetarian',
                    label: 'Vegetarian'
                }
            ]
        }
    },
    {
        description: 'This hamburger has two meat piece and all classic ingredintes.',
        title: 'Hamburguesa Double',
        price: 15.00,
        option:{
            title: 'Kind Of Meat',
            defaultSelect: 'beef',
            options: [
                {
                    value: 'beef',
                    label: 'Beef'
                },
                {
                    value: 'chicken',
                    label: 'Chiken'
                },
                {
                    value: 'vegetarian',
                    label: 'Vegetarian'
                }
            ]
        }
    },
    {
        description: 'This is a Bottled water of 500ml.',
        title: 'Bottled water',
        price: 5.00
    },
    {
        description: 'This is a Bottled water of 750ml.',
        title: 'Bottled water',
        price: 8.00
    },
    {
        description: 'This is a soda 500ml.',
        title: 'Soda',
        price: 7.00
    },
    {
        description: 'This is a soda 750ml.',
        title: 'Soda',
        price: 10.00
    },
], 
tableList = [
    { label: 'Table 1', value: '1' },
    { label: 'Table 2', value: '2' },
    { label: 'Table 3', value: '3' },
    { label: 'Table 4', value: '4' },
    { label: 'Table 5', value: '5' },
    { label: 'Table 6', value: '6' }
  ];

class Order extends Component {
    static propTypes = {

    }

    state = {
        table: ''
    };

    constructor(props){
        super(props);

        this.onChageTable = this.onChageTable.bind(this);
    }

   onChageTable(e){
        console.log('radio checked', e.target.value);
    }

    renderTableAction(text, record){
        return (
            <span>
                <Icon type="delete" />
            </span>
        );
    }

    rendereTableFooter(){
        return (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32}} type="flex"  justify="space-between">
                <Col sm={24} md={24} lg={8} className="order__table-footer_columns">
                    <Input placeholder="Discount code"/>
                </Col>
                <Col sm={24} md={12} lg={8} className="order__table-footer_columns">
                    <div className="order__table-footer__price-section">
                        <span className="order__table-footer-label">Total: </span>
                        <span className="order__table-footer-label order__table-footer-price">$100.00</span>
                    </div>
                </Col>
                <Col sm={24} md={12} lg={8} className="order__table-footer_columns">
                    <div className="order__table-footer-order">
                        <span className="order__table-footer-label">Order: </span>
                        <span className="order__table-footer-label">4564</span>
                    </div>
                </Col>
                <Col sm={24} md={12} lg={8} className="order__table-footer_columns">
                    <Button type="primary">Send Order</Button>
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <div className="page-container">
                <div className="order__header-container">
                    <h2>Order</h2>
                    <p>
                        Always have the client feel that they are special to us
                    </p>
                </div>
                <Divider />
                <Row>
                    <Col sm={12}>
                        <div>
                            <div className="order__form__item-containe">
                                <Input placeholder="Customer Name" />
                            </div>
                            <div className="order__form__item-containe">
                                <h3>Customer's table</h3>
                                <RadioGroup options={tableList} onChange={this.onChangeTable} value={this.state.table} />
                            </div>
                            <div className="order__form__item-containe">
                                <Collapse defaultActiveKey={['ff']}>
                                    <Panel header="Breakfast" key="bf">
                                        <div className="order__items-container">

                                        </div>
                                    </Panel>
                                    <Panel header="Fast Food" key="ff">
                                        <div className="order__items-container">
                                            {
                                                itemFastFood.map((item) => {
                                                    return (
                                                        <ItemCard description={item.description}
                                                                        title={item.title}
                                                                        price={item.price}
                                                                        option={item.option}/>
                                                    );
                                                })
                                            }
                                        </div>
                                    </Panel>
                                </Collapse>
                            </div>
                        </div>
                    </Col>
                    <Col sm={9} offset={2}>
                        <Table 
                        dataSource={itemFastFood}
                        footer={this.rendereTableFooter}
                        size="small"
                        scroll={{y: 300}}
                        pagination={false}
                          >
                            <Column  className="order__table-price__column-item" dataIndex="title" title="Item" />
                            <Column dataIndex="price"  title="Price"  />
                            <Column dataIndex="actio" title="Action"  render={this.renderTableAction} />
                        </Table>
                    </Col>
                </Row>
            </div>   
        );
    }
}


export default Order;
