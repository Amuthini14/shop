/**
 * IT16006058
 * Attanayake T.H.M.D.R.M
 */
import React, { Component } from 'react';
import { Card, Row, Col, Button } from 'antd';
import axios from 'axios';

class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            isLoaded: false

        }
    }
    
    deleteItem=()=>{
        axios.delete('http://localhost:5000/delete-wishlist/:id' + this.props.obj._id)
        .then((res) => {
            console.log('Item successfully deleted!')
        }).catch((error) => {
            console.log(error)
        })

    }

    componentDidMount(){
        fetch('http://localhost:5000/display-wishlist')
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            products: json,
          })
          console.log(this.state.products);
        });
    }

    render() {
        var { products, isLoaded } = this.state;
        return (
            <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>
                <h2> Wishlist</h2>

                <Row>
                    {products.map(product => {
                        return (
                            <Col span={8}>
                                <Card
                                    style={{ width: 300 }}
                                    cover={<img src={product.img} width={500} height={300} />}
                                >
                                    <h2>{product.name}</h2>
                                    <Button type="primary" >View Details</Button>
                                    <Button type="danger" onClick={this.deleteItem}>Remove</Button>
                                </Card>
                            </Col>
                        )
                    })}

                </Row>

            </div>
        )
    }
}

export default Wishlist;