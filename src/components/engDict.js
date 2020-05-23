import React,{useState,useEffect} from 'react'
import axios from 'axios'

import styles from './engDict.module.css'

export default function EngDict(props) {
    
    let [engDef,setEngDef] = useState([])
    
    useEffect(()=>{        
        if(props.value!==''){
            axios.get(`https://dictionaryapi.com/api/v3/references/sd4/json/${props.value}?key=5718a61a-2c4a-4afe-b4d7-535445f8da45`)
            .then(res=>{                
                if(res.data[0].meta){                                    
                    setEngDef(res.data[0].shortdef)               
                }               
                else if(typeof res.data==="object"){
                    setEngDef(res.data)
                }                    
                else setEngDef('Sorry. Invalid or misspelled word.')
            })
            .catch((err)=>{
                console.log(err)
            })        
        }
    },[props.value])

    return(
        <div className={styles.main}>
            {
              engDef.map((item,index)=>(
                    <li key={index+1}>
                        {index+1}. {item}
                    </li>
              ))
            }
        </div>
    )    
}
