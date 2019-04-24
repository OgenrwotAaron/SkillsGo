import React from 'react';
import {Switch} from 'react-router-dom';

import Home from './components/Home/home';
import Layout from './hoc/layout/layout';
import NewsArticle from './components/Articles/News/Posts/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import NewsMain from './components/NewsMain/newsMain';
import VideosMain from './components/VideosMain/videosMain'
import Signin from './components/SignIn/signIn';
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/dashboard';
import SkillsMain from './components/Skills/index'
import PublicRoutes from './components/AuthRoutes/publicRoutes';
import PrivateRoutes from './components/AuthRoutes/privateRoutes'

const Routes =(props)=> {
        return (
            <Layout user={props.user}>
                <Switch>
                    <PublicRoutes {...props} restricted={false} path="/" exact component={Home}/>
                    <PublicRoutes {...props} restricted={false} path="/news" exact component={NewsMain}/>
                    <PublicRoutes {...props} restricted={false} path="/mechanics" exact component={SkillsMain}/>
                    <PublicRoutes {...props} restricted={false} path="/videos" exact component={VideosMain}/>
                    <PublicRoutes {...props} restricted={false} path="/articles/:id" exact component={NewsArticle}/>
                    <PublicRoutes {...props} restricted={false} path="/videos/:id" exact component={VideoArticle}/>
                    <PublicRoutes {...props} restricted={false} path="/sign-in" exact component={Register}/>
                    <PublicRoutes {...props} restricted={false} path="/sign-up" exact component={Signin}/>
                    <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
                </Switch>
            </Layout>
            
        );
}

export default Routes;