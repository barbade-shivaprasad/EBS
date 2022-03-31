import Cookie from 'js-cookie'
import {Link} from 'react-router-dom';

import './navbar.css';

const Navbar = ({isAuthenticated, setisAuthenticated, setRedirect}) => {
    const handleButton = () => {
        if (isAuthenticated) {
            Cookie.remove('token')
            localStorage.removeItem('token')
            setRedirect('')
            setisAuthenticated({...isAuthenticated, status: false})
        }
    }
    return (
        <div className="color shadow-sm">
            <nav className="navbar navbar-light" style={{padding: 'none'}}>
                <div className="container-fluid">
                    <Link to="/" style={{textDecoration: 'none', color: '#fff'}}><h5 className='title'><span style={{color: "#1976d2"}}>S</span>GC <span style={{color: "#1976d2"}}>E</span>vents</h5></Link>
                    <div className="d-flex mr-4">
                        <Link to="/" className="btn btn-light mr-3 nav-btn">Home</Link>
                        <Link to='/login' className="btn btn-light mr-2 nav-btn" onClick={(e) => handleButton(e)}>{isAuthenticated.status ? 'Logout' : 'Login'}</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
