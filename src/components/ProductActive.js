import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ROOT_URL } from '../env';
import swal from 'sweetalert';

class ProductActive extends React.Component{
    state={
        productList:[],
        visibility:false,
        productId:0,
        msg:''
    }

    componentWillMount(){
        this.getProductList();
    }
    getProductList(){
        axios.get(`${ROOT_URL}api/getProductList`)
        .then((response)=>{
            this.setState({productList:response.data.data})
        });
    }

    modalToggle(e){
       if(e.target.checked) {
        this.setState(
            {
             visibility:!this.state.visibility,
             productId:e.target.id
         })
       }else{
           //CODE FOR INACTIVE 
       }
    }

    renderProductList(){
       return this.state.productList.map((item,index)=>{
           const imgUrl = ROOT_URL +"/images/"+ item.productImage;
         
            return (
                <tr key={index}>
                    <td>{item.productName}</td>
                    <td> <img src={imgUrl} width='55' alt=''/></td>
                    <td> {item.productPrice}</td>
                    <td>
                        {item.productIsActive?"Active":"Inactive"}
                    </td>
                    <td>
                        <label>
                            <input type="checkbox" id={item.productId} class="filled-in" onClick={this.modalToggle.bind(this)} checked={item.productIsActive?'checked':false}/>
                            <span>Filled in</span>
                        </label>
                    </td>
                </tr>
            )
        })
    }

    onSubmitFormHandle(e){
        e.preventDefault();
        const productId = this.state.productId;
        const productIncrementalAmount =  e.target.incrementalAmount.value;
        const productBiddingTime =  e.target.biddingTime.value;
        const productIsActive = true;

        if(productIncrementalAmount <= 0){
          
           alert('Please Provide Proper Incremental Amount');
        }else{
            const config = { headers: { 'x-auth-token':this.props.token } };

            axios.post(`${ROOT_URL}api/liveProductForBidding`,{productId,productIncrementalAmount,productBiddingTime,productIsActive},config)
            .then((response)=>{
                alert(response.data.message);
                window.location.reload();
            })
            .catch((err)=>{
                alert(err.response.data.message);
            });
        }
       
       
    }
    render(){

        return (
            <div>
                <div id="modal1" className="modal" style={{display:this.state.visibility===true?'block':'none'}}>
                    <div className="modal-content">
                        <form onSubmit={this.onSubmitFormHandle.bind(this)}>
                              <input placeholder="Incremental Amount"  id="incrementalAmount" type="number" className="validate" required/>
                              <input placeholder="Bidding Time"  id="biddingTime" type="number" className="validate" required/>
                              <button className="waves-effect waves-light btn">Submit</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <a href="javascript:void(0)" onClick={()=>{this.setState({visibility:!this.state.visibility})}} className="modal-close waves-effect waves-green btn-flat">close</a>
                    </div>
                </div>
                <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>Product Price</th>
                        <th>Product Is Active?</th>
                        <th>Product Active</th>
                    </tr>
                </thead>

                <tbody>
                   {this.renderProductList()}
                </tbody>
            </table>
            </div>
          
        )
    }
}

const mapStateToProp = (state)=>{
    return {
        token:state.auth.token
    }
}
export default connect(mapStateToProp)(ProductActive);