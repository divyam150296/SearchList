import Axios from 'axios';
import React, { useEffect, useState } from 'react';

const Search=()=>{
    const[term,setTerm]=useState('');
    const[results,setResult]=useState([]);

    console.log(results);  

    console.log("i will run");
    useEffect(()=>{
     const search =async()=>{
         const reponse =await Axios.get('https://en.wikipedia.org/w/api.php',
         {
             params:{
                prop:'pageimages|pageterms',
               action:'query',   
               list:'search',
               origin:'*',
               format:'json',
               piprop:'thumbnail',
               srsearch:term
             }, 
         })
         console.log();
         setResult(reponse.data.query.search);     
          
     };
     const timeout=setTimeout(()=>{
        if(term)
        {
        search();
        }
       },1000);
     return()=>{
         clearTimeout(timeout)
     }; 
    },[term]);

    const renderedResult=results.map((result)=>
        {
        return(
            <div key={result.pageid} className="item">
                <div className="right floated content" >
                    <a className="ui button" style={{textAlign:'right floated content',color:'red'}} href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</a>
                    </div>
                  <div className="header">
                    {result.title}</div>
                  <span dangerouslySetInnerHTML={{__html:result.snippet}}></span>
                  
                </div>
            );
        }
    );
    return(
        <div className="ui secondary pointing menu">
            <div className='ui form'>
                <div className='field'>
                    <label>Enter The Search Term</label>
                    <input
                       value={term}
                       onChange={e=>setTerm(e.target.value)}
                       className="input"
                       />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResult}
            </div>
        </div>
    );
};

export default Search;