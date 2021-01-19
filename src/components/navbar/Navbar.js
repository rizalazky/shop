import './navbar.css'
import {
	Link
} from 'react-router-dom'
import React,{useState} from 'react'

function Navbar({user,logout,keranjang}){

	const [displayLogout,setDisplayLogout]=useState(false)

	
	return(
		<nav className='navbar'>
			<div>
				<h3><Link to='/'>Shop</Link></h3>	
			</div>
			{
				user ?(
					<div className='navbar-profile'>
						<button className='btn-profile' onClick={()=>setDisplayLogout(!displayLogout)}>{user.displayName}</button>
						<br></br>
						{
							displayLogout && <ul className='ul-profile'>
								<li>{user.email}</li>
								<li>
									<Link to={`/keranjang`}>
									Keranjang <span className='text-jml-keranjang'>{0}</span>
									</Link>
								</li>
								<li>
									<Link to={`/history`}>
									History transaction
									</Link>
								</li>
								<li onClick={logout}>Log Out</li>
							</ul>
						}
						
					</div>
				):(
					<div className='navbar-action'>
						<button className='navbar-btn'>
							<Link to="/login">Login</Link>
						</button>
						<button className='navbar-btn'>
							<Link to="/login">Register</Link>
						</button>
					</div>
				)
			}
		</nav>
	)
}


export default Navbar