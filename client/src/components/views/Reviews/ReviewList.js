/**
 * IT16006058
 * Attanayake T.H.M.D.R.M
 */
import React,{Component} from 'react';
import Review from './Review';
import { Divider } from 'antd';

class ReviewList extends Component  {
    constructor(props){
        super(props);

        this.state={
            reviews:[],
            isLoaded:false
        }
    }
    componentDidMount(){
        fetch('http://localhost:5000/display-review')
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            reviews: json,
          })
          console.log(this.state.reviews);
        });

    }
    render(){
        var { reviews, isLoaded } = this.state;
        return (
            <div>
                <h3><b>Comments</b></h3>
                {
                    reviews.map(review => {
                        return (
                            <div>
                                <b>{review.name}</b><br/>
                                {review.comment}<br/>
                                <div style={{color:"blue"}}> Rating : {review.rating} </div>
                               
                                <Divider/>
                            </div>
                        )
                    })
                }
    
            </div>
        )
    }
    
}

export default ReviewList;