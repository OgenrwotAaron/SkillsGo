import React from 'react';

import TeamInfo from '../../Elements/teamInfo'
import PostData from '../../Elements/postData'

const Header = (props) => {

    const teamInfo=(team)=>{
        return team? (
            <TeamInfo team={team}/>
        ):null;
    }
    const postData=(date,author)=>(
        <PostData data={{date,author}}/>
    )

    return (
        <div>
            {teamInfo(props.teamData)}
            {postData(props.date,props.author)}
        </div>
    );
};

export default Header;