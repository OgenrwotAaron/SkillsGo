import React, { Component } from 'react';
import styles from './register.module.css';
import FormFields from '../widgets/FormFields/formFields';
import { firebase } from '../../firebase';

class Register extends Component {

    state = {
        registerError:'',
        loading: false,
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email-input',
                    type:'email',
                    placeholder:'Enter your Email'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'password-input',
                    type:'password',
                    placeholder:'Enter your Password'
                },
                validation:{
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }

    updateForm = (element)=>{
        const newFormdata= {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.event.target.value;
        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }

        newElement.touched = element.blur
        newFormdata[element.id]=newElement;

        this.setState({
            formdata:newFormdata
        })
    }

    validate = (element)=>{
        let error = [true,''];

        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be a valid email':''}`;
            error = !valid ? [valid,message]:error
        }

        if(element.validation.password){
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Must be greater than five':''}`;
            error = !valid ? [valid,message]:error
        }

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required':''}`;
            error = !valid ? [valid,message]:error
        }
        return error;
    }

    submitForm = (event,type)=>{
        event.preventDefault();
        if(type!==null){

            let dataToSubmit = {};
            let formIsValid = true;

            for(let key in this.state.formdata){
                dataToSubmit[key]=this.state.formdata[key].value
            }
            for(let key in this.state.formdata){
                formIsValid = this.state.formdata[key].valid && formIsValid
            }
            if(formIsValid){
                this.setState({
                    loading:true,
                    registerError:''
                })
                if(type){
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    ).then(()=>{
                        this.props.history.push('/')
                    }).catch(error=>{
                        this.setState({
                            loading:false,
                            registerError:error.message 
                        })
                    })
                }else{
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    ).then(()=>{
                        this.props.history.push('/')
                    }).catch(error=>{
                        this.setState({
                            loading:false,
                            registerError:error 
                        })
                    })
                }
            }

        }
    }

    submitButton = ()=>(
        this.state.loading ?
        'Loading...'
        :
        <div>
            <button onClick={(event)=>this.submitForm(event,false)}>Register Now</button>
            <button onClick={(event)=>this.submitForm(event,true)}>Log in</button> 
        </div>
        
    )
    showError = ()=>(
        this.state.registerError !=='' ? 
        <div className={styles.error}>{this.state.registerError}</div>
        :''
    )

    render() {
        return (
            <div className={styles.logContainer}>
                <form onClick={(event)=>this.submitForm(event,null)}>
                    <h2>Register / Login</h2>
                    <FormFields
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=>this.updateForm(element)}
                    />
                    <FormFields
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element)=>this.updateForm(element)}
                    />
                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        );
    }
}

export default Register;