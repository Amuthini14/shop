/**
 * IT16006058
 * Attanayake T.H.M.D.R.M
 */
import React, { Component } from "react";
import { Divider, Form, Input, InputNumber, Button } from "antd";
import Rating from "../StarRating/Rating";
import axios from 'axios';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
       rating:'',
       comment:''
    }
  }
  onChangeRating=(e)=>{
    this.setState({ rating: e.target.value })
  }

  onChangeComment=(e)=>{
    this.setState({ comment: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

   let reviewObj = {
      rating: this.state.rating,
      comment: this.state.comment,
    };
    axios.post('http://localhost:5000/add-review', reviewObj)
      .then(res => console.log(res.data));

    this.setState({ rating: '', comment: ''})
  };
  


  render() {
    return (
      <div>
        <Divider />
        <h3><b>Product Review</b></h3>
        <Form name="review form" onFinish={this.onSubmit} >
          <b>Rate the Product</b>
          <Rating onChange={this.onChangeRating}/>
          <br />
          <b>Comment</b>
          <Form.Item name={['user', 'review']} onChange={this.onChangeComment} >
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Post
         </Button>
          </Form.Item>
        </Form>
        <Divider />
      </div>

    )
  }
}

export default Review;