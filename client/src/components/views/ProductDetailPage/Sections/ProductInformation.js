//product information omponent
import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';
import Review from '../../Reviews/Review';
import ReviewList from '../../Reviews/ReviewList';

function ProductInformation(props) {

    const [Product, setProduct] = useState({})

    useEffect(() => {
        setProduct(props.detail)
    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }

    
    const addToWishlsit = () => {
        console.log("Added to wishlist");
    }


    return (
        <div>
            <Descriptions title="Product Information">
                <Descriptions.Item label="Price"> {Product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="View"> {Product.views}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div className="btn-group">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={addToCarthandler}
                >
                    Add to Shopping Cart
                    </Button>&nbsp;&nbsp;&nbsp;

                    <Button size="large" shape="round" type="primary"
                    onClick={addToWishlsit}
                >
                    Add to wish list
                    </Button>
            </div>
        </div>

<Review/>
<ReviewList/>
</div>
    )
}

export default ProductInformation


///
// import React, { useEffect, useState } from 'react'
// import { Button, Descriptions } from 'antd';
// import Review from '../../Reviews/Review';
// import ReviewList from '../../Reviews/ReviewList';

// function ProductInformation(props) {

//     const [Product, setProduct] = useState({})

//     useEffect(() => {
//         setProduct(props.detail)
//     }, [props.detail])

//     const addToCarthandler = () => {
//         props.addToCart(props.detail._id)
//     }

//     const addToWishlsit = () => {
//         console.log("Added to wishlist");
//     }


//     return (
//         <div>
//             <Descriptions title="Product Information">
//                 <Descriptions.Item label="Price"> {Product.price}</Descriptions.Item>
//                 <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
//                 <Descriptions.Item label="View"> {Product.views}</Descriptions.Item>
//                 <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
//             </Descriptions>

//             <br />
//             <br />
//             <br />
//             <div className="btn-group">
//             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                 <Button size="large" shape="round" type="danger"
//                     onClick={addToCarthandler}
//                 >
//                     Add to Shopping Cart
//                     </Button>
                
                
    
        
//             <Button size="large" shape="round" type="primary"
//                     onClick={addToWishlsit}
//                 >
//                     Add to wish list
//                     </Button>
//             </div>
//             </div>
          
        
//             <Review/>
//             <ReviewList/>
           
//         </div>
//     )
// }

// export default ProductInformation

