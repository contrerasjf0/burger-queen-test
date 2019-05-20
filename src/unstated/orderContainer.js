
import {Container} from 'unstated';
import { discountCodeRef, orderRef } from '../firebase';

class Order extends Container {
    state={
            customerName: '',
            table: '0',
            products: [],
            total: 0,
            orderNumber: 0,
            discountCode: {
                code: '',
                percentage: 0,
                id: ''
            }
    };

    setCustomerName = (customerName) =>{
        this.setState({customerName});
    }

    setTable = (table) =>{
        this.setState({table})
    }

    setProducts = (product) =>{
        const products = [...this.state.products, product];

        this.setState({products});
    }

    setTotal = (total) =>{
        this.setState({total})
    }

    setOrderNumber = (orderNumber) =>{
        this.setState({orderNumber})
    }

    setDiscountCode = (discountCode) =>{
        this.setState({
            discountCode: {
                code: discountCode
            }
        })
    }

    removeProduct = (productId, timestamp) => {
        let products = [...this.state.products];
        products = products.filter(item => item.id !== productId && item.timestamp !== timestamp);
        const total = products.reduce((vBefor, vCurrent) => (vBefor + parseInt(vCurrent.price)) , 0);

        this.setState({products, total});
    }

    getDiscountCode = (discountCode) => {
        discountCodeRef.orderByChild("code")
                        .limitToLast(1)
                        .equalTo(discountCode)
                        .on('value', (snapshot) =>{
                            let val = snapshot.val();
                            let hashDC = 0;

                            if(!val) return;
                            
                            hashDC = Object.keys(val)[0];
                            val = val[hashDC];

                            this.setState({
                                discountCode:{
                                    code: val.code,
                                    percentage: val.percentage,
                                    id: val.id
                                }
                            });
                            
                            
                        });
    }

    getOrderNumber = () =>{
        orderRef.orderByChild("orderNumber")
                .limitToLast(1)
                .on('value', (snapshot) => {
                    let val = snapshot.val();
                    let hashDC = 0;

                    if(!val) {
                        this.setState({ orderNumber: 1 });
                        return;
                    }
                            
                    hashDC = Object.keys(val)[0];
                    val = val[hashDC];

                    this.setState({ orderNumber: val.orderNumber + 1 });
                });
    }

    sendOrder = async() => {
        const newOrder = orderRef.push();
        
        newOrder.set({...this.state});
        orderRef.on('child_added', (snapshot) => {
                    
                    if(!snapshot.val()) return;

                    this.setState({
                            customerName: '',
                            table: '0',
                            products: [],
                            total: 0,
                            orderNumber: 0,
                            discountCode: {
                                code: '',
                                percentage: 0,
                                id: ''
                            }
                    });
                    this.getOrderNumber();
                  });
    } 

}

export default Order;
