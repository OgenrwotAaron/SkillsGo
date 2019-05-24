import React,{Component} from 'react';
import { Link} from 'react-router-dom';

import FontAwesome from 'react-fontawesome';

import style from './header.module.css';
import SideNav from './SideNav/sideNav';

class Header extends Component {
    state={
        showNav:false
    }

    toggleSidenav=(action)=>{
        this.setState({
            showNav:action
        })
    }

    /*const items=[
        {
            type: style.option,
            icon: 'home',
            text: 'Home',
            link: '/',
            login:''
        },
        {
            type: style.option,
            icon: 'map-marker',
            text: 'Home',
            link: '/news',
            login:''
        },
        {
            type: style.option,
            icon: 'tachometer',
            text: 'Home',
            link: '/videos',
            login:''
        }
    ]*/

    navBars=()=>(
        <div>
            <FontAwesome name="bars"
                onClick={()=>this.toggleSidenav(true)}
                style={{
                    color:'#fff',
                    padding:'10px',
                    cursor:'pointer'
                }}
            />
        </div>
    )

    /*const showItems=()=>{
        return items.map((item,i)=> {
            return headers(item,i)
        })
    }

    const headers = (item,i)=>(
        <div key={i} className={style.headers}>
            <NavLink to={item.link} activeClassName={style.navLink}>
                <FontAwesome name={item.icon}
                    style={{
                        color:'#fff',
                        padding:'10px 10px 5px 10px',
                        cursor:'pointer'
                    }}
                />
            </NavLink>
        </div>
        
    )*/

    logo=() =>(
            <Link to={this.props.link} className={style.logo}>
                {/*<img alt="nba logo" src="/images/nba_logo.png"/>*/}
                <div>{this.props.headerText}</div>
            </Link>
    )
    

    render(){
        return (
            <header className={style.header}>
                <SideNav user={this.props.user}showNav={this.state.showNav} onHideNav={()=>this.toggleSidenav(false)}/>
                <Link to="/user">
                    <div className={style.account}>
                        <FontAwesome
                            name="user"
                            style={{
                                color:'#fff',
                                paddingRight:'5px',
                                fontSize:'25px'
                            }}
                        />
                    </div>
                </Link>

                <div className={style.headerOpt}>
                    {this.navBars()}
                    {this.logo()}
                </div>
                {/*<div className={style.myNav}>
                    {showItems()}
                </div>*/}
            </header>
        )
    }
}

export default Header;