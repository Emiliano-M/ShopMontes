import { initializeApp } from "firebase/app"
import { getDocs, getDoc, doc, addDoc, collection, query, where, writeBatch, getFirestore} from "firebase/firestore"


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };
  
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const getProducts = (key, operator, value) => {

  return new Promise ((resolve, reject) => {
    const collectionQuery = key && operator && value ?
    query(collection(db, "items"), where(key, operator, value)) :
    collection(db, "items")

    getDocs(collectionQuery).then((QuerySnapshot) => {
      const products = QuerySnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() }
      })
      resolve(products)
    }).catch(error => {
      reject("Error obteniendo productos: ", error)
    })
  })

}

export const getProduct = (id) => {

  return new Promise ((resolve, reject) => {

    getDoc(doc(db, "items", id)).then((QuerySnapshot) => {
      const product = {id: QuerySnapshot.id, ...QuerySnapshot.data()}
      resolve(product)
    }).catch((error) => {
        reject("Error obteniendo el producto: ", error)
    })

  })

}

export const getCategories = () => {
  return new Promise ((resolve, reject) => {
    
    getDocs(collection(db, "categories")).then((QuerySnapshot) => {
      const categories = QuerySnapshot.docs.map(doc => {
        return{ id: doc.id, ...doc.data()}
    })
    resolve(categories)
    }).catch(error => {
      reject("Error obteniendo categorias: ", error)
    })

  })
}

export const getTickets = () => {
  return new Promise ((resolve, reject) => {
    
    getDocs(collection(db, "forms")).then((querySnapshot) => {
      const tickets = querySnapshot.docs.map(doc => {
        return{ id: doc.id, ...doc.data()}
    })

    resolve(tickets)

    }).catch(error => {
      reject("Error obteniendo tickets: ", error)
    })

  })
}

export const StockCheck = (Products) => {
  let flag = true

  const batch = writeBatch(db)

  Products.forEach(item => {

    getDoc(doc(db, "items", item.id)).then((QuerySnapshot) => {
      
      if(QuerySnapshot.data().stock >= item.quantity)
      {
        batch.update(doc(db,"items", QuerySnapshot.id), {"stock": QuerySnapshot.data().stock - item.quantity})
      } 
      else 
      {
        flag = false
      }

    }).catch((error) => {
        console.log("Error obteniendo el producto: ", error)
    })

  })

  return {flag, batch};
}

export const commitHandler = (stockChecked, data) => {

  return new Promise((resolve, reject) => {
    addDoc(collection(db, 'forms'), data)
        .then(({ id }) => {
            stockChecked.batch.commit();
            resolve(id) ;
        })
        .catch((error) => {
            reject(error);
        });
  });

}