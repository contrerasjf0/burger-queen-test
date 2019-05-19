import React from 'react';


import { Col, Menu, Row } from 'antd';

import Order from '../pages/Order';

function MainLayout() {
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
                                <Menu.Item key="orders">Order</Menu.Item>
                                <Menu.Item key="SList">Order Status</Menu.Item>
                                <Menu.Item key="users">Users</Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col sm={24}>
                    
                    <Order></Order>
                </Col>
            </Row>
        </div>
    );
}

export default MainLayout;
