
import {Container} from 'unstated';

class Order extends Container {
    state={
            customerName: '',
            table: 0,
            products: [],
            total: 0,
            orderNumber: '',
            discountCode: ''
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
        this.setState({discountCode})
    }

}

export default Order;
