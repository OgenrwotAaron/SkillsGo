import React from 'react';
import {NavLink, Link} from 'react-router-dom';

import FontAwesome from 'react-fontawesome';

import style from './header.module.css';
import SideNav from './SideNav/sideNav';

const Header = (props) => {

    const items=[
        {
            type: style.option,
            icon: 'home',
            text: 'Home',
            link: '/',
            login:''
        },
        {
            type: style.option,
            icon: 'gears',
            text: 'Home',
            link: '/news',
            login:''
        },
        {
            type: style.option,
            icon: 'share',
            text: 'Home',
            link: '/videos',
            login:''
        }
    ]

    const navBars=()=>(
        <div>
            <FontAwesome name="bars"
                onClick={props.onOpenNav}
                style={{
                    color:'#dfdfdf',
                    padding:'10px',
                    cursor:'pointer'
                }}
            />
        </div>
    )

    const showItems=()=>{
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
        
    )

    const logo=() =>(
            <Link to="/" className={style.logo}>
                <img alt="nba logo" src="/images/nba_logo.png"/>
            </Link>
    )
    

    return (
       <header className={style.header}>
            <SideNav {...props}/>
           <div className={style.headerOpt}>
                {navBars()}
                {logo()}
           </div>
           <div className={style.myNav}>
                {showItems()}
           </div>
       </header>
    )
}

export default Header;