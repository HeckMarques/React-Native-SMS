import { firebase } from '../back-end/firebase'

export const verificarLogin = () =>{
        return firebase.auth()
}
export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(retorno => resolve(retorno))
            .catch(erro => reject(erro))
    })
}


export const create = (email, password) => {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(retorno => resolve(retorno))
            .catch(erro => reject(erro))
    })
}

export const logof = () => {
    return new Promise((resolve, reject) => {
        firebase
            .auth()
            .signOut()
            .then(retorno => resolve(retorno))
            .catch(erro => reject(erro))
    })
}