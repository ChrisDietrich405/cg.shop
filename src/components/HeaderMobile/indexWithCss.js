import "./styles.css"
import { FaShoppingCart, FaSearch, FaHeart } from "react-icons/fa"
import { CgProfile, CgMenu } from "react-icons/cg"; 
import { Link } from "react-router-dom"



export default function HeaderMobile() {

    const toggleBtns = () => { 
        const mobileNav = document.querySelector(".mobile-navigation")
        if(mobileNav.classList.contains("hidden")) {
            mobileNav.classList.remove("hidden")
        } else {
            mobileNav.classList.add("hidden")
        }
      

    }
  
    return (
        <div className="mobile-container">
            <div className="mobile-menu">
                <Link to="/">
                    <FaShoppingCart size={40}/>
                </Link>
                <CgMenu onClick={toggleBtns} size={40}/>
            </div>
          
          <div className="mobile-navigation"> 
                    <Link to="/favorites">
                        <FaHeart />
                        <span>Wishlist</span>
                    </Link>
                    <CgProfile />
                    <span>Login</span>
          </div>
        </div>
    )
}

//logical operators include ||, &&, <, >, =. logical operators return a boolean value to me 
//with the and operator there needs to be two statements and they both need to be truthy