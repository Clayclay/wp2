import React,{ useState,useParams} from 'react';
import { Context } from "../App";
import Profile from './Profile';


    

const Account = ({match}) =>
  
      console.log('match', match) || (
      
       
      <div className="home">
       <h3>ID: {match.params.id}</h3>
      </div>   

    );


export default Account;

