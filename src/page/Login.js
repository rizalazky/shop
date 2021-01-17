import React, {useState} from 'react'
import './login.css'
import {auth} from '../config/Firebase'
import {useHistory} from 'react-router'


function Login(){
	const [isRegister,setIsRegister]=useState(false)
	const [nama,setNama]=useState('')
	const [noTelp,setNoTelp]=useState('')
	const [email,setEmail]=useState('')
	const [password,setPassword]=useState('')
	const history=useHistory()
	const register=()=>{

		
		auth.createUserWithEmailAndPassword(email,password)
		.then(res=>{
			res.user.updateProfile({
				displayName:nama,
				phoneNumber:noTelp
			}).then(res=>{
				history.push('/')
			}).catch(err=>{
				console.log(err)
			})
			
		}).catch(err=>{
			alert(err.message)
		})
	}

	const login=()=>{
		auth.signInWithEmailAndPassword(email,password)
		.then(res=>{
			history.push('/')
		}).catch(err=>{
			alert(err.message)
		})
	}

	return(
		<div className='login'>

			<div className='form-login'>
				<div className='form-login-header'>
					<h3>Shop</h3>
				</div>
				{
					isRegister && (
						<>
						<label>Nama</label>
						<input type='Nama' className='inp-form' value={nama} onChange={(e)=>setNama(e.target.value)}/>
						<label>No Telp</label>
						<input type='text' className='inp-form' value={noTelp} onChange={(e)=>setNoTelp(e.target.value)}/>
						</>
					)
				}
				<label>Email</label>
				<input type='email' className='inp-form' value={email} onChange={(e)=>setEmail(e.target.value)}/>
				<label>Password</label>
				<input type='password' className='inp-form' value={password} onChange={(e)=>setPassword(e.target.value)}/>
				{
					isRegister ? (
						<input type='submit' className='btn-login' value='Register' onClick={register}/>
					):(
						<input type='submit' className='btn-login' value='Login' onClick={login}/>
					)
				}
				
				
				<span className='text-register' onClick={()=>setIsRegister(!isRegister)}>
					
						{
							!isRegister ?`belum punya akun?klik disini` :'sudah punya akun?klik disini'
						}
					
				</span>
			</div>
		</div>
	)
	
}

export default Login