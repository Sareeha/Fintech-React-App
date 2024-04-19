import styles from './Home.module.css';

//library
import React, {useState} from "react";

//styling library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck , faXmark} from '@fortawesome/free-solid-svg-icons';

//images
import dollar from '../assets/dollar.png'
import dollar2 from '../assets/dollar2.png'

function Home({isloggedin, setIsloggedin}) {

    const [form , setForm] = useState({
        username: "",
        email:"",
        password:"",
    })

    const login = {
        username: "group5",
        email:"group5@sctp.com",
        password:"reactisfun",
    }

    const handlerFormChange = (e) => {
        setForm((prevForm)=> 
        ({ ... prevForm, [e.target.name]: e.target.value}))
    }

    const handlerFormSubmit = (e) => {
        e.preventDefault();
        setIsloggedin(true);
        console.log("login --->", isloggedin)
    }

    let correct = <FontAwesomeIcon icon={faCheck} beat style={{color: "#1dfc37",}} />
    let wrong = <FontAwesomeIcon icon={faXmark} bounce style={{color: "#f00000",}} />

    return(
        <div className={styles.Home}>
            
            {isloggedin? <h3>Welcome back! Please check out our features above!</h3>  : <h3>Please log in to access our features!</h3>}

            {isloggedin &&    
                 <div>
                    <div className={styles["spinning-image"]}>
                        <img src = {dollar2} alt="spinning dollar" className={styles["spin-image"]}/>
                    </div>
                </div>}


            <form  onSubmit={handlerFormSubmit}>
            {!isloggedin && 
                <div className={styles.form}>
                    <div> 
                        <label> Username</label>
                        {form.username == login.username?  correct : wrong }
                    </div>
                    <input name="username" 
                            value={form.username} 
                            onChange={handlerFormChange} 
                            placeholder="group5" 
                            required/>
                    <div> 
                        <label> Email</label>
                        {form.email == login.email?  correct : wrong }
                    </div>
                    <input name="email" 
                            value={form.email} 
                            onChange={handlerFormChange} 
                            placeholder="group5@sctp.com"
                            required />
                    <div> 
                        <label> Password</label>
                        {form.password == login.password?  correct : wrong }
                    </div>
                    <input name="password" 
                            value={form.password} 
                            onChange={handlerFormChange} 
                            placeholder="reactisfun"
                            required />
                    <button className={styles.loginBtn} 
                            disabled={form.username !== login.username ||
                            form.email !== login.email ||
                            form.password !== login.password}
                            >Login</button>
                </div>}
                {isloggedin && <div className={styles.form}>
                    <button className={styles.button} onClick={()=> {setIsloggedin(false) ; 
                    console.log("login --->", isloggedin)}}
                    >Logout</button> 
                    </div> }
            </form>


            <h4 style = {{color:"white"}}>Zhen Jian completed 20231011 https://github.com/zjzjzjzjzjzjzj</h4>

        </div>
    );
}

export default Home;