import React,{Component} from 'react';
import styles from './floatButton.module.css';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome'

class FloatButton extends Component {

    state={
        skills:
            [{
                text:'Mechanics',
                icon:'wrench'
            },
            {
                text:'Tailors',
                icon:'scissors'
            },
            {
                text:'Developers',
                icon:'laptop'
            }]
    }

    renderNavButton=(type)=>{
        let template=null;

        switch(type){
            case('skills'):
                template=this.state.skills.map((item,i)=>(
                        <div key={i} className={styles.bottomNavItems}>
                            <FontAwesome 
                                name={item.icon}
                                style={{
                                    fontSize:'25px',
                                    paddingBottom:'2px',
                                    color:'#03a9f0'
                                }}
                            />
                            <div onClick={this.props.clicked} className={styles.bottomNavButton}>{item.text}</div>
                        </div> 
                    )
                )
            break;
            default:template=null
        }
        return template
    }

    renderButton=(type)=>{
        let template=null;
        switch(type){
            case('Post'):
                template=(
                    <div>
                        <Link to="/dashboard">
                            <div className={styles.toTop}>
                                <FontAwesome
                                    name='pencil'
                                    style={{
                                        fontSize:'25px',
                                        padding:'15px'
                                    }}
                                />
                            </div>
                        </Link>
                    </div>
                )
            break;
            default:template=null
        }

        return template
    }

    render(){
        return(
            <div>
                {this.renderButton(this.props.type)}
                <div className={styles.bottomNav}>{this.renderNavButton(this.props.type)}</div>
            </div>
        )
    }
};

export default FloatButton;