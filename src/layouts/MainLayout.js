import React, { Component } from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';

import { Col, Menu, Row } from 'antd';

import Order from '../pages/Order';
import OrderStatus from '../pages/OrderStatus';

class MainLayout extends Component {
    render(){
        return (
            <div className="">
                <Row>
                    <Col sm={24}>
                        <Row>
                            <Col sm={3}>
                                <h3 className="logo-text">Burger Queen</h3>
                            </Col>
                            <Col>
                                    <Menu
                                        theme="dark"
                                        mode="horizontal"
                                        defaultSelectedKeys={['orders']}
                                    >
                                        <Menu.Item key="orders">
                                            <Link to="/order">Order</Link>
                                        </Menu.Item>
                                        <Menu.Item key="SList">
                                            <Link to="/order-status">Order Status</Link>
                                        </Menu.Item>
                                        <Menu.Item key="users">Users</Menu.Item>
                                    </Menu>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={24}>
                        <Switch>
                            <Redirect  from="/" to="/order" exact/>
                            <Route  path='/order-status' component={OrderStatus}/>
                            <Route  path='/order' component={Order}/>        
                        </Switch>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MainLayout;
