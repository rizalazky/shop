import React,{useState,useEffect} from 'react'
import './history.css'
import {auth,db} from '../config/Firebase'
import Navbar from '../components/navbar/Navbar'
import ListItemHistory from '../components/listItemHistory/ListItemHistory'


const History=()=>{
    const [user,setUser]=useState()
    const [transaksi,setTransaksi]=useState([])
    


    useEffect(()=>{
        auth.onAuthStateChanged((res)=>{
            setUser(res)
        })
    },[])


    useEffect(()=>{
        db.collection('transaksi').where('checkout','==',"true")
        .onSnapshot(res=>{

            if(!res.empty){
                // console.log(res.docs)
                setTransaksi(res.docs.map(doc=>({id:doc.id,data:doc.data()})))
            }
            // console.log(transaksi,'transaksi')  
        })
            
    },[])

    const logout=()=>{
        auth.signOut()
        setUser(null)
    }


    
    return(
        <div>
            <Navbar user={user} logout={logout}/>
            <div className='keranjang-container'>
                    {
                        transaksi.length >0 ?
                        transaksi.map(ker=>{
                            return(
                                <ListItemHistory data={ker} key={ker.id}/>
                            )
                        })
                        :
                        (
                            <div>Belum ada transaksi masuk</div>
                        )
                    }
                
            </div>
        </div>
    )
}




export default History