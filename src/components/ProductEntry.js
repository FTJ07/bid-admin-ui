import React from 'react'
import axios from 'axios';
import { ROOT_URL } from '../env';
import { withRouter } from 'react-router-dom';

class ProductEntry extends React.Component{
    state = {
        imageFile: null,
        message:''
    }

    onImageChange(e) {
        this.setState({ imageFile: e.target.files[0] })
    }

    handleSubmitForm(event){
       
        event.preventDefault();
        console.log();
        const config = { headers: { 'Content-Type': 'multipart/form-data','x-auth-token':localStorage.getItem('ad-token') } };
        var bodyFormData = new FormData();
        if(event.target.productPrice.value < 0){
          
            this.setState({message:'Please Provide Actual Product Price'});
        }else if(this.state.imageFile.type !== 'image/jpeg' && this.state.imageFile.type !== 'image/png'){
            this.setState({message:'Provide Actual image'});
        }
        else{
            bodyFormData.set('productName', event.target.productName.value);
            bodyFormData.set('productDescription', event.target.productDescription.value);
            bodyFormData.set('productPrice', event.target.productPrice.value);
            bodyFormData.set('productImage', this.state.imageFile);
    
            event.target.productName.value = "";
            event.target.productDescription.value = "";
            event.target.productPrice.value = "";
            event.target.productImage.value = "";
            
            axios.post(`${ROOT_URL}api/createProduct`,bodyFormData,config)
            .then((response)=>{
                this.setState({message:'Successfully inserted product'});
            })
            .catch((err)=>{
                console.log(err.response.status);
                if(err.response.status === 400){
                    localStorage.removeItem('ad-token');
                    this.props.history.push('/');
                }
                this.setState({message:'Unseccess with porudct insertion'});
            })
        }


      
    }
    render(){
        return (
            <div className="row">
                <form onSubmit={this.handleSubmitForm.bind(this)} className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                           
                            <input placeholder="Product Name"  id="productName" type="text" className="validate" required/>
                          
                        </div>
                        <div className="input-field col s12">
                            <input placeholder="Product Description" id="productDescription" type="text" className="validate" required/>
                      
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="Product Price" id="productPrice" type="number" className="validate" required/>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="productImage" type="file" onChange={this.onImageChange.bind(this)} className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">                 
                                <button className="waves-effect waves-light btn">Product Entry</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">                 
                               {this.state.message}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(ProductEntry);