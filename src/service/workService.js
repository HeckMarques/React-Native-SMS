import { db } from '../back-end/firebase'
import { firebase } from '../back-end/firebase'

export const saveWork = (trabalho, chave) => {

    if (chave === "") {
        return new Promise((resolve, reject) => {
            db.collection(`users`).doc(firebase.auth().currentUser.uid).
                collection('contato')
                .add(trabalho)
                .then(result => resolve(result.id))
                .catch(erro => reject(erro))
        })
    } else {
        return new Promise((resolve, reject) => {
            db.collection(`users`).doc(firebase.auth().currentUser.uid).
                collection('contato')
                .doc(chave)
                .update(trabalho)
                .then(() => resolve())
                .catch(erro => reject(erro))
        })
    }
}

export const saveEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.collection(`users`).doc(firebase.auth().currentUser.uid)
            .set({ email: email, key: firebase.auth().currentUser.uid })
            .then(result => resolve())
            .catch(erro => reject(erro))
    })

}

export const deleteWork = (work) => {
    return new Promise((resolve, reject) => {
        db.collection(`users`).doc(firebase.auth().currentUser.uid).
            collection('contato')
            .doc(work.key)
            .delete()
            .then(() => resolve())
            .catch(erro => reject(erro))
    })
}

export const getWorks = () => {
    return new Promise((resolve, reject) => {
        db.collection(`users`).doc(firebase.auth().currentUser.uid).
            collection('contato')
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