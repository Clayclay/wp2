import React, {useEffect,useState} from 'react';
import './InfoBar.css';

import closeIcon from '../../../icons/closeIcon.png';

import {getUser} from '../../../function/GetUser';


import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


//here we receive room propriety
const InfoBar = ({receiver}) =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] =useState( [] );

    useEffect(() => {
        setLoading(true);
        getUser(receiver)  .then(user => {
          setUser(user);
          setLoading(false);
        })
        ;
      }, [receiver]);
    


return(
<div className="infoBar">
    <div className="leftInnerContainer">

    {loading ? (
          <span className="loader">LOADING...</span>
        ) : error ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : (
          <>

        <Grid container spacing={1}>
        <Grid item >
          <Avatar alt={user.nickname} src={`/uploads/avatar/${user.avatar}`} />
        </Grid>
        <Grid item >
        <Typography gutterBottom variant="h6">
          {user.nickname}
          </Typography>
        </Grid>
      </Grid>

  </>
        )} 
          
    </div>
    <div className="rightInnerContainer">
        <a href="/"><img src={closeIcon} alt="close" /></a>
    </div>
</div>

);
};
export default InfoBar;