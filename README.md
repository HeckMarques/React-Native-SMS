# React-Native-SMS
	Agendamento de disparos de SMS usando a API TotalVoice

# Rodar projeto
	* git clone https://github.com/HeckMarques/React-Native-SMS
	* cd React-Native-SMS
	* npm install

# Adicionar seu Banco de dados Firebase Firestore
	Crie o projeto no firebase
	Adicione um aplicativo da web, de um nome exemplo SMS.
	Copie as credenciais do firebase e altere em \SMS\src\back-end\firebase.js


# Adicione o TOKEN da TotalVoice
	Crie uma conta na TotalVoice
	Gere o Token de acesso e copie.
	Cole o Token em /functions/index.js
		em const client

# Envie a function sendSMS para o Firebase Functions
	Instale o firebase-functions, firebase-admin e firebase-tools
	 	npm install firebase-functions@latest firebase-admin@latest --save
		npm install -g firebase-tools
	Faça login 
  		firebase login
	Inicialize o functions linkando com o projeto que criou no firebase
		firebase init functions
	E finalmente, envia a função para o firebase:
  		firebase deploy --only functions



