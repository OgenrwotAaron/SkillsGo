import React, { Component } from 'react';
import styles from './signin.module.css';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom'

class SignIn extends Component {

    state={
        registerError:'',
        loading:false
    }
    items=[
        {
            type: styles.option,
            icon: 'google'
        },
        {
            type: styles.option,
            icon: 'facebook'
        },
        {
            type: styles.option,
            icon: 'twitter'
        },
        {
            type: styles.option,
            icon: 'linkedin'
        }
    ]

    showError = ()=>(
        this.state.registerError !=='' ? 
        <div className={styles.error}>{this.state.registerError}</div>
        :''
    )

    gsign = ()=>{

    }

    fbLogin = ()=>{

    }

    element = (item,i)=>(
        <button key={i} className={item.type}>
                <FontAwesome name={item.icon}/>
        </button>
    )

    circles=()=>{
        return this.items.map((item,i)=> {
            return this.element(item,i)
        })
    }


    render() {
        return (
            <wrapper className={styles.logContainer}>
                <div className={styles.content}>
                    <h3>Login with</h3>
                    <div className={styles.circles}>
                        {this.circles()}
                    </div>
                    {this.showError()}
                    <h3>Or</h3>
                    <Link to="/sign-up"><button>Register Skill</button></Link>
                </div>    
            </wrapper>
        );
    }
}

export default SignIn;