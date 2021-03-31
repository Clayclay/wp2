import React, {useContext ,useState , useEffect} from 'react';
import {authContext} from '../../App';
import {   makeStyles } from '@material-ui/core/styles';
import {getUser} from '../../function/GetUser';

const useStyles = makeStyles((theme) => ({
 
}));

const MatchCard = ({userId}) => {

    const classes = useStyles();
    const { state: authState }  = useContext(authContext);
    const [user,setUser]=useState([]);
    const [loading, setLoading] = useState(false);
    const [error, /*setError*/] = useState(null);

    const [isMatch, setIsMatch] = useState(false)
    
    const friendWith = authState.user.friends.includes(userId); 
  // and
    const friendBy = authState.user.friendsby.includes(userId);

    
    useEffect(()  =>  {
        if( friendWith === true && friendBy === false){
        setLoading(true);
        setIsMatch(true)
        getUser(userId)
        .then( response => {
        setUser(response)
        })
        setLoading(false);
    }

    },[authState.token,userId,friendWith,friendBy]);


    return ( 
        isMatch && /*= true ? */user != null &&
<div>
{userId}
        {loading ? (
            <span className="loader">LOADING...</span>
            ) : error ? (
            <span className="error">AN ERROR HAS OCCURED</span>
            ) : (
            <>

   
    {user.nickname}

  


</>
)}

</div>
    )
}

export default MatchCard ;