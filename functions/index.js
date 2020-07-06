const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();


// Send SMS with TotalVOICE - Configuration
const totalvoice = require('totalvoice-node');
const client = new totalvoice("TOKEN-DE-ACESSO"); // Obtenha o token no site da TotalVoice

// referencia: https://fireship.io/lessons/cloud-functions-scheduled-time-trigger/
// data: https://www.devmedia.com.br/date-javascript-trabalhando-com-data-e-hora-em-js/37222
exports.sendSMS = functions.runWith({ memory: '512MB' }).pubsub
    .schedule('* * * * *').onRun(async context => {
        console.log('rodando send SMS');
        let usersRef = db.collection('users');
        usersRef.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }

                // percorrendo  users
                snapshot.forEach(doc => {
                    //console.log(doc.id, '=>', doc.data());
                    var user = doc.data()

                    // Obtendo somente SMSs com status de "Agendado"
                    let RefSMS = db.collection('users').doc(user.key).collection('sms')
                    .where('status', '==', 'Agendado');

                    RefSMS.get()
                        .then(snapshot => {
                            // percorrendo sms de users
                            snapshot.forEach(sms => {

                                //console.log(sms.id, '=>', sms.data());
                                numeros = sms.data().numeros;
                                //console.log(numeros)

                                // Comparando datas
                                var d = new Date();

                                var dia = d.getDate()
                                var mes = d.getMonth() + 1 // (mes de 0-11)
                                var ano = d.getFullYear()

                                var hora = d.getHours() - 3 // -3 devido a fuso horario do firebase
                                var minuto = d.getMinutes()

                                if (mes < 10) {
                                    mes = '0' + mes;
                                }
                                if (dia < 10) {
                                    dia = '0' + dia;
                                }
                                var dataAtual = `${dia}/${mes}/${ano} ${hora}:${minuto}`
                                console.log('DataAtual: ' + dataAtual)

                                var dataProgramada = `${sms.data().data} ${sms.data().hora}`

                                if (dataAtual == dataProgramada) {
                                    console.log('HORA PROGRAMADA - DISPARANDO...')

                                    //percorrendo numeros do array para disparar sms
                                    for (var n in numeros) {
                                        // console.log('numero: ' + numeros[n])
                                        // Enviando SMS pela TotalVOICE
                                        client.sms.enviar(numeros[n], sms.data().mensagem)
                                    }

                                    // Atualizando Status do agendamento
                                    db.collection('users').doc(user.key).collection('sms')
                                        .doc(sms.data().key)
                                        .update({ status: "Enviado" }).then(() => {
                                            console.log('Status: Enviado')
                                        }).catch((e) => {
                                            console.log(e.message)
                                        })
                                }
                            })
                        })
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    });

