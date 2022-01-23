import React, { useState, useContext,  } from "react";
import CartContext from "../../Context/CartContext";
import { Link, useNavigate } from 'react-router-dom';
import { commitHandler, StockCheck } from "../../service/firebase/firebase"
import { Timestamp } from "firebase/firestore"

const Form = () => {

    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Phone, setPhone] = useState("")
    //const [StockFlag, setStockFlag] = useState(false);

    const navigate = useNavigate()

    const {clear, all, Products} = useContext(CartContext)

    const formSubmit = (event) => {

        event.preventDefault()
        

        if( Name.length !== 0 && Email.length !== 0 && Phone > 0 ) {

            const data = {
                buyer : {
                name : Name,
                email : Email,
                phone : Phone,
                },

                items : Products,

                date : Timestamp.fromDate(new Date()),

                total : all().price

            }

            let Stock = StockCheck(data.items)

            if(Stock.length)
            {
               commitHandler(Stock, data) 
            }
            else 
            {
                alert("NO HAY STOCK")
            }
            

            navigate("/dashboard")
            clear()

        }

        else {
            alert("Debe completar todos los campos!")
        }
    }

    return all().price !== 0 ? (
        <div className='container'>
            <form>

                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nameInput" placeholder="Emiliano Montes" onChange={ (input) => setName(input.target.value) }/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" id="emailInput" placeholder="emiliano0montes@gmail.com" onChange={ (input) => setEmail(input.target.value) }/>    
                </div>

                <div className="mb-3">
                    <label className="form-label">Telefono</label>
                    <input type="number" className="form-control" id="PhoneInput" placeholder="541150223320" onChange={ (input) => setPhone(input.target.value) }/>      
                </div>
      
                <div id="emailHelp" className="form-text mb-3">Nunca compartiremos tus datos.</div>
                <button onClick={formSubmit} type="submit"  className="btn btn-primary">Enviar</button>

            </form>
        </div>
    ) 
    : 
    (
        <div>
            <p className="h5">Finalice Su Compra y Aqui Podra Completarla</p>
            <Link className="btn btn-secondary btn-lg mt-3" to="/"> Home </Link>
        </div>
    )
    
    
}

export default Form


