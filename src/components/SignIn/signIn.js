import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import styles from './signin.module.css';
import FormFields from '../widgets/FormFields/formFields';
import { firebase,firebaseDistricts, firebaseUsers } from '../../firebase';
import Uploader from '../widgets/FileUploader/fileUploader';
import FontAwesome from 'react-fontawesome';
import { Marker} from '@urbica/react-map-gl';
import CompleteRegistration from '../CompleteRegister/completeRegister';

class SignIn extends Component {

    state = {
        lng:'',
        lat:'',
        registerError:'',
        loading: false,
        formdata:{
            firstName:{
                element:'input',
                value:'',
                config:{
                    name:'email-input',
                    type:'text',
                    placeholder:'Firstname'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            image:{
                element:'image',
                value:'',
                valid:true
            },
            lastName:{
                element:'input',
                value:'',
                config:{
                    name:'lastname-input',
                    type:'text',
                    placeholder:'Lastname'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email-input',
                    type:'email',
                    placeholder:'Email address'
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
                    placeholder:'Password'
                },
                validation:{
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            businessName:{
                element:'input',
                value:'',
                config:{
                    name:'businessName-input',
                    type:'text',
                    placeholder:'Business Name'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            district:{
                element:'select',
                value:'',
                config:{
                    name:'district-input',
                    options:[]
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            address:{
                element:'input',
                value:'',
                config:{
                    name:'address-input',
                    type:'address',
                    placeholder:'Street Address'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }

    componentDidMount(){
        this.loadDistricts()
    }
    clicked=(e)=>{
        console.log(e.lngLat.lng,e.lngLat.lat)
        this.setState({
            lng:e.lngLat.lng,
            lat:e.lngLat.lat
        })
    }

    setMarker=()=>(
        <Marker
            longitude={this.state.lng}
            latitude={this.state.lat}
        >
            <div style={{
            color: 'red',
            cursor: 'pointer',
            fontSize: '25px',
          }}>
                <FontAwesome
                    name="map-marker"
                />
            </div>
        </Marker>
    )

    loadDistricts = ()=>{
        firebaseDistricts.once('value')
        .then((snapshot)=>{
            let team=[]

            snapshot.forEach((childSnapshot) => {
                team.push({
                    id:childSnapshot.val().id,
                    name:childSnapshot.val().district
                })
            });

            const newFormdata ={...this.state.formdata}
            const newElement = { ...newFormdata['district']}

            newElement.config.options=team;
            newFormdata['district']= newElement;

            this.setState({
                formdata:newFormdata
            })

        })
    }

    updateForm = (element, content='')=>{
        const newFormdata= {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }

        //newElement.value = element.event.target.value;
        if(content===''){
            newElement.value = element.event.target.value;
        }else{
            newElement.value = content
        }

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
            const message = `${!valid ? '  Must be a valid email':''}`;
            error = !valid ? [valid,message]:error
        }

        if(element.validation.password){
            const valid = element.value.length >= 5;
            const message = `${!valid ? '  Must be greater than five':''}`;
            error = !valid ? [valid,message]:error
        }

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? '  This field is required':''}`;
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
                if(!type){
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    )
                    .then(()=>{
                        firebaseUsers.orderByChild('id')
                        .limitToLast(1).once('value')
                        .then( snapshot =>{
                            let userId= null;

                            snapshot.forEach(childSnapshot=>{
                                userId = childSnapshot.val().id
                            })
                            dataToSubmit['date']= firebase.database.ServerValue.TIMESTAMP;
                            dataToSubmit['id']=+1;
                            dataToSubmit['district'] = parseInt(dataToSubmit['district'],10);
                            /*firebase.auth().onAuthStateChanged((user)=>{
                                if(user){
                                    dataToSubmit['uid']=user.uid
                                }else{
                                    console.log('no user')
                                }
                            })*/

                            firebaseUsers.push({
                                firstName:dataToSubmit.firstName,
                                lastName:dataToSubmit.lastName,
                                businessName:dataToSubmit.businessName,
                                email:dataToSubmit.email,
                                district:dataToSubmit.district,
                                address:dataToSubmit.address,
                                date:dataToSubmit.date,
                                id:dataToSubmit.id,
                                lng:this.state.lng,
                                lat:this.state.lat
                            })
                            .then( (user) =>{
                                console.log(user)
                                this.props.history.push("/")
                            }).catch(e=>{
                                this.setState({
                                postError:e.message
                            })
                            })
                            return userId;
                        })
                        console.log(dataToSubmit)
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
            <Link to={"/"}>
                <button>Cancel</button>
            </Link>
            <button onClick={(event)=>this.submitForm(event,false)}>Register Now</button>
        </div>
        
    )
    showError = ()=>(
        this.state.registerError !=='' ? 
        <div className={styles.error}>{this.state.registerError.message}</div>
        :''
    )
    storeFilename=(filename)=>{
        this.updateForm({id:'image'},filename)
    }

    render() {
        return (
            <div className={styles.registerMain}>
                <CompleteRegistration clicked={(e)=>this.clicked(e)} setMarker={this.setMarker()}/>
            <div className={styles.logContainer}>
                <form onSubmit={(event)=>this.submitForm(event,null)}>
                    <h2 style={{color:'gray'}}>Register</h2>
                    <div className={styles.avatar}>
                        <Uploader 
                            imageFolder={'userAvatar'}
                            fileName={(filename)=>{this.storeFilename(filename)}}
                        />
                    </div>
                    <div className={styles.names}>
                        <FormFields
                            id={'firstName'}
                            formdata={this.state.formdata.firstName}
                            change={(element)=>this.updateForm(element)}
                        />
                        <FormFields
                            id={'lastName'}
                            formdata={this.state.formdata.lastName}
                            change={(element)=>this.updateForm(element)}
                        /> 
                    </div>
                    <div className={styles.normalInput}>
                        <FormFields
                            id={'businessName'}
                            formdata={this.state.formdata.businessName}
                            change={(element)=>this.updateForm(element)}
                        />
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
                    </div>
                    <div className={styles.names}>
                        <FormFields
                            id={'district'}
                            formdata={this.state.formdata.district}
                            change={(element)=>this.updateForm(element)}
                        />
                        <FormFields
                            id={'address'}
                            formdata={this.state.formdata.address}
                            change={(element)=>this.updateForm(element)}
                        />
                    </div>
                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
            </div>
        );
    }
}

export default SignIn;