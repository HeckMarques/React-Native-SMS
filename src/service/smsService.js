import { db } from '../back-end/firebase'
import { firebase } from '../back-end/firebase'



export const saveSMS = (trabalho) => {
    return new Promise((resolve, reject) => {
        db.collection(`users`).doc(firebase.auth().currentUser.uid).
        collection('sms')
            .add(trabalho)
            .then(result => resolve(result.id))
            .catch(erro => reject(erro))
    })
}


export const updateSMSid = (id) => {
    return new Promise((resolve, reject) => {
        db.collection(`users`).doc(firebase.auth().currentUser.uid).
            collection('sms')
            .doc(id).update({key: id})
            .then(result => resolve())
            .catch(erro => reject(erro))
    })
}

export const deleteSMS = (work) => {
    return new Promise((resolve, reject) => {
        db.collection(`users`).doc(firebase.auth().currentUser.uid).
        collection('sms')
            .doc(work.key)
            .delete()
            .then(() => resolve())
            .catch(erro => reject(erro))
    })
}

export const getSMS = () => {
    return new Promise((resolve, reject) => {
        db.collection(`users`).doc(firebase.auth().currentUser.uid).
        collection('sms')
            .get()
            .then(snapchot => {
                let worksLista = []
                snapchot.forEach((item) => {
                    //const { title, description } = item.data()
                    worksLista.push({
                        ...item.data(),
                        key: item.id
                    })
                })
                resolve(worksLista)
            })
            .catch(erro => reject(erro))
    })
}