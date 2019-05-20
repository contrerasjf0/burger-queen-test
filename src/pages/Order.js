import React, { Component } from 'react';
import {Subscribe} from 'unstated';

import orderContainer from '../unstated/orderContainer';
import menuContainer from '../unstated/menuContainer';

import { 
    Button,
    Col,
    Collapse,
    Divider,
    Input,
    Icon,
    Radio,
    Row,
    Table,
    Form,
    message
} from 'antd';

import ItemCard from '../components/ItemCard';



const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
const { Column } = Table;

const  tableList = [
    { label: 'Not Table', value: '0' },
    { label: 'Table 1', value: '1' },
    { label: 'Table 2', value: '2' },
    { label: 'Table 3', value: '3' },
    { label: 'Table 4', value: '4' },
    { label: 'Table 5', value: '5' },
    { label: 'Table 6', value: '6' }
  ];

class Order extends Component {
    static propTypes = {

    };

    orderState = {};
    menuState = {};

    constructor(props){
        super(props);
        
        this.state = {
                form: {
                    name: {
                        valid: true
                    },
                    table: {
                        valid: true
                    }
                }
        }

        this.handleTableChage = this.handleTableChage.bind(this);
        this.handleCustomerNameChage = this.handleCustomerNameChage.bind(this);
        this.handleDiscountCodeChage = this.handleDiscountCodeChage.bind(this);
        this.handleAddProductClick = this.handleAddProductClick.bind(this);
        this.handleRemoveItemClick = this.handleRemoveItemClick.bind(this);
        this.handleValidateDCBlur = this.handleValidateDCBlur.bind(this);
        this.handleSendOrderClick = this.handleSendOrderClick.bind(this);

        this.rendereTableFooter = this.rendereTableFooter.bind(this);
        this.renderMain = this.renderMain.bind(this);
        this.renderTableAction = this.renderTableAction.bind(this);
    }

    componentDidMount(){
        this.orderState.getOrderNumber();
        this.menuState.getBreakfastList();
    }

    handleTableChage(value){
       this.orderState.setTable(value.target.value);
    }

    handleCustomerNameChage(value){
        this.orderState.setCustomerName(value.target.value);
    }

    handleDiscountCodeChage (value){
        this.orderState.setDiscountCode(value.target.value);
    }

    handleAddProductClick(value){
        value.timestamp = new Date().getTime();
        this.orderState.setProducts(value);
        this.orderState.setTotal(parseInt(value.price) + this.orderState.state.total);
    }

    handleRemoveItemClick(productId, timestamp){
        if(this.orderState.state.products.length >= 1){
            this.orderState.removeProduct(productId, timestamp);
        }
    }

    handleValidateDCBlur(value){
        this.orderState.getDiscountCode(value.target.value);
    }

    handleSendOrderClick(){

        if(!this.orderState.state.customerName){
            this.setState({form: { ...this.state.form, name: {valid: false}}})
            return;
        }
        
        if(!this.orderState.state.table){
            this.setState({form: {...this.state.form, table: {valid: false}}})
            return;
        }
        this.orderState.sendOrder().then(() => message.success('The order has been made', 3));
    }

    calculateTotal(total, discount){
        let auxTotal = total;

        if(!discount) return auxTotal;

        auxTotal = auxTotal - (auxTotal * parseFloat('0.'+discount));
        
        return auxTotal
    }

    renderTableName(text, record){
        return (
            <span>{text} {(record.meat)? ' ('+record.meat+')' : ''}</span>
            );
    }

    renderTableAction(text, record){
        return (
            <span className="order__table-row__action_delete" onClick={() => this.handleRemoveItemClick(record.productId, record.timestamp)}>
                <Icon type="delete" />
            </span>
        );
    }
     
    rendereTableFooter(){
        const existItems = (this.orderState.state.products.length)? false: true;

        return (
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32}} type="flex"  justify="space-between">
                <Col sm={24} md={24} lg={8} className="order__table-footer_columns">
                    <Input placeholder="Discount code" disabled={existItems} onChange={this.handleDiscountCodeChage}
                    onBlur={this.handleValidateDCBlur}/>
                </Col>
                <Col sm={24} md={12} lg={8} className="order__table-footer_columns">
                    <div className="order__table-footer__price-section">
                        <span className="order__table-footer-label">Total: </span>
                        <span className="order__table-footer-label order__table-footer-price">${this.calculateTotal(this.orderState.state.total,
                         this.orderState.state.discountCode.percentage)}</span>
                    </div>
                    {
                        (this.orderState.state.discountCode.id) && (
                            <div>
                                <span>Discount of {this.orderState.state.discountCode.percentage}%</span>
                            </div>
                        )
                    }
                </Col>
                <Col sm={24} md={12} lg={8} className="order__table-footer_columns">
                    <div className="order__table-footer-order">
                        <span className="order__table-footer-label">Order: </span>
                        <span className="order__table-footer-label">{this.orderState.state.orderNumber}</span>
                    </div>
                </Col>
                <Col sm={24} md={12} lg={8} className="order__table-footer_columns">
                    <Button type="primary" disabled={existItems} onClick={this.handleSendOrderClick}>Send Order</Button>
                </Col>
            </Row>
        );
    }

    renderMain(orderState, menuState){
        
        this.orderState = orderState;
        this.menuState = menuState;

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
                                
                                <Form.Item
                                    validateStatus={(this.state.form.name.valid)? '':'error'}
                                    help={(this.state.form.name.valid)? '':'This filed is riquired.'}
                                >
                                    <Input placeholder="Customer Name" value={this.orderState.state.customerName}
                                    onChange={this.handleCustomerNameChage}/>
                                </Form.Item>
                            </div>
                            <div className="order__form__item-containe">
                                <h3>Customer's table</h3>
                                <Form.Item
                                    validateStatus={(this.state.form.table.valid)? '':'error'}
                                    help={(this.state.form.table.valid)? '':'This filed is riquired.'}
                                >
                                    <RadioGroup options={tableList} onChange={this.handleTableChage} value={this.orderState.state.table} />
                                </Form.Item>
                            </div>
                            <div className="order__form__item-containe">
                                <Collapse defaultActiveKey={['ff']}>
                                    <Panel header="Breakfast" key="bf">
                                        <div className="order__items-container">
                                            {
                                                    this.menuState.state.breakfastList.map((item, index) => {
                                                        return (
                                                            <ItemCard key={`O-IC-BF-${index}`}
                                                                        button={{
                                                                            label: 'Add',
                                                                            onClick: this.handleAddProductClick
                                                                        }}
                                                                        data={item}/>
                                                        );
                                                    })
                                                }
                                        </div>
                                    </Panel>
                                    <Panel header="Fast Food" key="ff">
                                        <div className="order__items-container">
                                            {
                                                this.menuState.state.fastFoodList.map((item, index) => {
                                                    return (
                                                        <ItemCard   key={`O-IC-FF${index}`}
                                                                    button={{
                                                                        label: 'Add',
                                                                        onClick: this.handleAddProductClick
                                                                    }}
                                                                    data={item}/>
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
                        dataSource={this.orderState.state.products}
                        footer={this.rendereTableFooter}
                        size="small"
                        scroll={{y: 300}}
                        pagination={false}
                          >
                            <Column  className="order__table-price__column-item" dataIndex="name" title="Item" render={this.renderTableName} rowKey="name"/>
                            <Column dataIndex="price"  title="Price"  rowKey="price"/>
                            <Column dataIndex="actio" title="Action"  rowKey="action" render={this.renderTableAction} />
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }

    render() {
        return (
            <Subscribe to={[orderContainer, menuContainer]}>
                {this.renderMain}
            </Subscribe>   
        );
    }
}


export default Order;
