import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { 
    Button,
    Col,
    Divider,
    List,
    Row,
    Select,
    Table
} from 'antd';

const Column = Table,
        Option = Select.Option;

const data = [
    {
        nameCustomer: 'Customer One',
        orderNumber: '21321',
        payment: '18.00',
        status: 'Ordered',
        table: '1'
    },
    {
        nameCustomer: 'Customer Two',
        orderNumber: '6534',
        payment: '18.00',
        status: 'Prepared',
        table: '2'
    },
    {
        nameCustomer: 'Customer Three',
        orderNumber: '32342',
        payment: '18.00',
        status: 'Delivered',
        table: '3'
    }
],
statusList = [
    {
        label: 'Ordered',
        value: 'ordered'
    },
    {
        label: 'Prepared',
        value: 'prepared'
    },
    {
        label: 'Delivered',
        value: 'delivered'
    }
];

class OrderStatus extends Component {
    static propTypes = {

    }

    tagStatusRender(tag){
        return (
            <Select defaultValue={tag}>
                {
                    statusList.map((item)=>
                        (<Option value={item.value}>{item.label}</Option>)
                    )
                }
            </Select>
        );
    }

    actionRender(_, record){
        return (
            <Button type="primary">Update</Button>
        );
    }

    expandedRowRender(record){
        const data=[
            'Hamburguesa Simple',
            'Hamburguesa Simple',
            'Bottled water'
        ];
       const header = (<div><h3>The products of this order are:</h3></div>);

        return(
            <div className="orderstatus__table__expanded-row__container">
                <List
                header={header}
                className="orderstatus__table__expanded-row__list"
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
                />
            </div>
        );
    }

    render() {
        return (
            <div className="page-container">
                <div className="order__header-container">
                    <h2>Order status</h2>
                    <p>
                    We always have to be aware of our orders
                    </p>
                </div>
                <Divider />
                <Row type="flex" justify="center">
                    <Col sm={20}>
                            <Table dataSource={data}
                                    pagination={false}
                                    expandedRowRender={this.expandedRowRender}>
                                <Column title="Order Number" dataIndex="orderNumber" key="orderNumber" />
                                <Column title="Customer" dataIndex="nameCustomer" key="nameCustomer" />
                                <Column title="Table" dataIndex="table" key="table" />
                                <Column title="Payment" dataIndex="payment" key="payment"/>
                                <Column title="Status" dataIndex="status" key="status" render={this.tagStatusRender}/>
                                <Column title="Update" dataIndex="update" key="update" render={this.actionRender}/>
                            </Table>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default OrderStatus;
