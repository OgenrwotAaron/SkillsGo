import React,{ Component} from 'react';
import FontAwesome from 'react-fontawesome';
import Header from '../Header/header';
import styles from './user.module.css';
import NewsList from '../widgets/NewsList/newsList';
import SkillsCard from '../widgets/SkillCard/skillsCard';

class UserProfile extends Component{
    items=[
        {
            type: styles.option,
            icon: 'phone'
        },
        {
            type: styles.option,
            icon: 'facebook'
        },
        {
            type: styles.option,
            icon: 'map-marker'
        }
    ]

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

    render(){
        return (
            <div className={styles.profile}>
                <Header
                    user={this.props.user}
                    headerText={"Profile"}
                    link={"/user"}
                />
                <div className={styles.cover}>
                    <div className={styles.imageBox} style={{
                        backgroundImage:'url("images/articles/carWash.jpg")',
                        backgroundSize:'cover',
                        backgroundRepeat:'no-repeat'
                    }}>
        {/*<img src='images/articles/carWash.jpg' alt='category'/>*/}  
                    </div>
                    <div className={styles.coverContent}>
                        <div className={styles.editCover}>
                            <FontAwesome
                                name='camera'
                                style={{
                                    fontSize:'15px',
                                    color:'#03a9f0'
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.avatar}>
                        <img alt='avatar' src='images/articles/TEES.jpg'/> 
                        <p>User Name</p>
                    </div>
                </div>
                <div className={styles.mainInfo}>
                    <ul>
                        <li>COMPANY NAME</li>
                    </ul>
                
                    <div className={styles.info}>
                        <p>RATING</p>
                        <p>Nkrumah Avenue Plot 17, Gulu</p>
                        <p>5 years experience</p>
                        <div>
                            {this.circles()}
                        </div>
                    </div>
                    <div className={styles.nav}>
                        <div style={{fontSize:'18px',fontWeight:300,paddingLeft:'5PX',paddingTop:'5px',textAlign:'center',color:'gray',background:'rgb(236, 236, 236)'}}>TRENDING UPDATES</div>
                        <NewsList
                            type="card"
                            loadmore={false}
                            start={1}
                            amount={10}
                        />
                    </div>
                </div>
                <div className={styles.feeds}>
                    <SkillsCard/>
                </div>
            </div>
        );
    };
}

export default UserProfile;