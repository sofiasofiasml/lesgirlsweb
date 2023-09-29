 // Import the functions you need from the SDKs you need
//  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
//  import { getDatabase, ref,get,set,child,update,remove } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-database.js";
//  // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//  let prueba = 'https://nominatim.openstreetmap.org/reverse?lat=41.63125237270472&lon=-4.742565007934635&format=json';

const firebaseConfig = {
    apiKey: "AIzaSyBWbTUhd1Jg2mN4Lnd5vOi7YF4nRTo4qHQ",
    authDomain: "lesgirlsweb.firebaseapp.com",
    projectId: "lesgirlsweb",
    storageBucket: "lesgirlsweb.appspot.com",
    messagingSenderId: "110953578081",
    appId: "1:110953578081:web:a8604fd0ee1ab7869a3420",
    measurementId: "G-G5EDL9QTYD"
  };
 

 // Initialize Firebase
 const app = firebase.initializeApp(firebaseConfig);
 const analytics = firebase.analytics();
 var database = firebase.database();
 var storage = firebase.storage();
 var storageRef = storage.ref();
 var provider = new firebase.auth.GoogleAuthProvider();
 
 const signInWithGoogleButton = document.getElementById('signInWithGoogle');
 const signOutWithGoogleButton = document.getElementById('singout');
 const signOutWithEmailButton = document.getElementById('Emailbuton');
 const signFueraWithEmailButton = document.getElementById('Emailbutonout');
 
 var auth = firebase.auth(); 

 
 const signInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    GFX.displayButtonSalirGoogle(); 
    auth.signInWithPopup(googleProvider)
    .then(() => {
        console.log("ENTRO Google acount");
    //    window.location.assign('./index.html');
    })
    .catch(error => {
      console.error(error);
    })
    
  }


  signInWithGoogleButton.addEventListener('click', signInWithGoogle);

  const signup = () => {
    firebase.auth().signInWithPopup(provider);
  firebase.auth()
  .getRedirectResult()
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
    GFX.displayButtonSalirGoogle(); 
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
};
//   firebase.auth().signOut().then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//   });

 function googlesingOut()
 {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("SALIO Google acount")
      }).catch((error) => {
        // An error happened.
      });
    GFX.displayButtonRegisterGoogle(); 
 }
 signOutWithGoogleButton.addEventListener('click', googlesingOut);



 function EmailAuth()
 {
    var email = document.getElementById("emailEmail").value; 
    var password = document.getElementById("passEmail").value; 
    
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in 
//     var user = userCredential.user;
//     // ...
//     alert("uer ceated sucefully");
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ..
//     alert(errorMessage); 

//   });
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    alert("uer ceated sucefully");
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage); 

  });

  

 }
 signOutWithEmailButton.addEventListener('click', EmailAuth);

 function EmailAuthOut()
 {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("uer fueraaa");
    
      }).catch((error) => {
        // An error happened.
      });
 }

 signFueraWithEmailButton.addEventListener('click', EmailAuthOut);


 render();
function render(){
	window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
	recaptchaVerifier.render();
}
	// function for send message
function phoneAuth(){
	var number = document.getElementById('number').value;
    if(number[0]!='+')
    {
        alert("Añadir +34 o el correspondiente"); 
    }
	firebase.auth().signInWithPhoneNumber(number, window.recaptchaVerifier).then(function(confirmationResult){
		window.confirmationResult = confirmationResult;
		coderesult = confirmationResult;
		document.getElementById('sender').style.display = 'none';
		document.getElementById('verifier').style.display = 'block';
	}).catch(function(error){
		alert(error.message);
	});
}
	// function for code verify
function codeverify(){
	var code = document.getElementById('verificationcode').value;
	coderesult.confirm(code).then(function(){
		document.getElementsByClassName('p-conf')[0].style.display = 'block';
		document.getElementsByClassName('n-conf')[0].style.display = 'none';
	}).catch(function(){
		document.getElementsByClassName('p-conf')[0].style.display = 'none';
		document.getElementsByClassName('n-conf')[0].style.display = 'block';
	})
}
//BD


function insertData(data, name){
    
    var ref = database.ref(name); 
    var result = ref.push(data); 
}

 function seeData(name){
     var ref = database.ref(name); 
     ref.on('value', gotData,errData); 
 }
// Añadir asistentes en db
 function writeNewPost(id, campo, value) {

    for(var i=0; i< CORE.DicEvents.length; i++){
        if(CORE.DicEvents[i].id == id)
        var k = CORE.DicEvents[i].key; 
        CORE.DicEvents[i].asistentes.push(value); 
    }
    var db = firebase.database();

    db.ref("Eventos/"+k+"/"+campo).push(value +'/'+auth.currentUser.email);
        
}
//Delate Event
function delatenodeDBforTime() 
{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    for(var i=0; i< CORE.DicEvents.length; i++){
        var dateOrdnear = CORE.DicEvents[i].dateFin; 
        var indexBar = dateOrdnear.indexOf('-'); 
        var year = dateOrdnear.substring(0, indexBar);
        dateOrdnear = dateOrdnear.replace(dateOrdnear.substring(0,indexBar+1),'');
        var indexBar = dateOrdnear.indexOf('-'); 
        var mes = dateOrdnear.substring(0, indexBar);
        var dia = dateOrdnear.substring(indexBar+1, dateOrdnear.length);
        dateOrdnear = mes+'/'+dia+'/'+year; 
        //cuando ya ha pasado el día se borra el evento
        if(Date.parse(today)>Date.parse(dateOrdnear))
        {
            var k = CORE.DicEvents[i].key; 
            var db = firebase.database();
            // if(CORE.DicEvents[i].categoria =="SubirImagen")
            // {
            //     var imgRef = storageRef.child(CORE.DicEvents[i].image); 
            //     imgRef.delete().then(() => {
            //         console.log("Borrado ok Image"); 
            //       }).catch((error) => {
            //         console.log("No borrada image"); 
            //       });
            // }
            db.ref("Eventos/"+k).remove();

        }
    }        
}

function delateasistentEvenDB(event)
{
    var index = event.id.indexOf("-");  
    var id = event.id.substring(0,index); 
    var pos = event.id.substring(index+1, event.id.length); 

   
    for(var i=0; i< CORE.DicEvents.length; i++){
        if(CORE.DicEvents[i].id == id)
        {
            var k = CORE.DicEvents[i].key; 
            var key = CORE.DicEvents[i].asistenteskey[pos]; 
            var db = firebase.database();
            db.ref("Eventos/"+k +"/asistentes/"+key).remove();
            var value = document.querySelector(".li"+event.id); 
            value.style.display = "none"; 

            var asi = document.querySelector(".ContadorAsistentes"+id); 
            var posvalue = asi.textContent.indexOf(": "); 

            var value = asi.textContent.substring(posvalue+2,asi.textContent.length); 

            var intvalue = parseInt(value); 
            intvalue -=1; 
            asi.textContent = 'Asistentes: '+intvalue; 

        }
    }        
    
}

function delateEvenDB(event){
    var id = event.name; 
    //var idElement = "Evento"+id; 

    for(var i=0; i< CORE.DicEvents.length; i++){
        if(CORE.DicEvents[i].id == id)
        {
            var k = CORE.DicEvents[i].key; 
           
            var db = firebase.database();
            
            db.ref("Eventos/"+k ).remove();
           
        }
    }        
}

function editEvenDB( title, image, content,date, dateFin, hour, categoria, organizer, hourFin, ubi){
    var id = CORE.idEdit;  
    
    for(var i=0; i< CORE.DicEvents.length; i++){
        if(CORE.DicEvents[i].id == id)
        {
            var k = CORE.DicEvents[i].key; 
           
            var db = firebase.database();
            const updates = {};
            updates[ `/id`] =  CORE.DicEvents[i].id;
            updates[ `/key`] =  CORE.DicEvents[i].key;
            updates[ `title`] =  title;
            if(image=="")
                updates[`image`] =  CORE.DicEvents[i].image;
            else
                updates[`image`] =  image;
            updates[`content`] =  content;
            updates[ `date`] =  date;
            updates[ `dateFin`] =  dateFin;
            updates[ `hour`] =  hour;
            updates[ `categoria`] =  categoria;
            updates[ `asistentes`] =  CORE.DicEvents[i].asistentes;
            updates[ `organizer`] =  organizer;
            updates[ `hourFin`] =  hourFin;
            updates[ `ubi`] =  ubi;


           firebase.database().ref("Eventos/"+k).update(updates);
           CORE.idEdit =-1; 
        }
    }        
}
// Añadir votacion db
function writeNewDatavotation(id, campo, value) {

    for(var i=0; i< CORE.Votation.length; i++){
        if(CORE.Votation[i].id == id)
        var k = CORE.Votation[i].key; 
        //CORE.Votation[i].asistentes.push(value); 
    }
    var db = firebase.database();

    db.ref("Votation/"+k+"/"+campo).set(value);
        
}


function gotData(data)
{
    var scores = data.val(); 
    if(scores && data.key =="Eventos"){
        var keys = Object.keys(scores); 
        //console.log(keys); 
        if(CORE.initDB){ // añadir evento del db
            for (var i =0; i<keys.length; i++)
            {
                var k = keys[i]; 
                var title =  scores[k].title; 
                var id =  scores[k].id; 
                var key =  k; 
                var date =  scores[k].date; 
                var dateFin =  scores[k].dateFin; 
                var hour =  scores[k].hour; 
                var image =  scores[k].image; 
                var categoria =  scores[k].categoria; 
                var content =  scores[k].content;
                var hourFin =  scores[k].hourFin;
                var ubi =  scores[k].ubi;
                var organizer =  scores[k].organizer;
                organizer = organizer.split('/')[0] +"/"+ LOGIC.encrypt_data(organizer.split('/')[1]); 
                var asistentes  = [];  
                var asistenteskey = []; 
                if(scores[k].asistentes){
                    asistentes = Object.values(scores[k].asistentes); 
                    
                    asistenteskey= Object.keys(scores[k].asistentes); 
                   
                }
                GFX.createDivEventosDB(title, id, date,dateFin, hour, image, categoria, content, asistentes, key, asistenteskey, organizer,hourFin,ubi); 
            }
            LOGIC.ordenarEventDate(); 
            //LOGIC.cambiarIDIfRepite(); 
            CORE.initDB = false; 
        }
       
    }
    if(scores && data.key== "Votation")
    {
        var keys = Object.keys(scores); 
        if(CORE.initDBVot){ // Solo se carga una vez toda la db 
            for (var i =0; i<keys.length; i++)
            {
                var k = keys[i]; 
                var key =  k; 
                var name =  scores[k].name; 
                var id =  scores[k].id; 
                var link =  scores[k].link; 
                var resp =  scores[k].resp; 
                CORE.Votation[CORE.Votation.length] = new Votation(id,name, key, link, resp); 
                GFX.addlistnav(); 

            }
            CORE.initDBVot = false; 
        }
        
    }
    if(scores && data.key =="PassWord")
    {
        var keys = Object.keys(scores); 
        if(CORE.initDBPass){ // Solo se carga una vez toda la db 
            for (var i =0; i<keys.length; i++)
            {
                var k = keys[i]; 
                var key =  k; 
                CORE.paswordEliminar = LOGIC.encrypt_data(scores[k].pass); 
                
               
            }
            CORE.initDBPass = false; 
        }
    }
    if(scores && data.key =="Admin")
    {
        var keys = Object.keys(scores); 
        if(CORE.initDBAdmin){ // Solo se carga una vez toda la db 
            for (var i =0; i<keys.length; i++)
            {
                var k = keys[i]; 
                var key =  k; 
                CORE.admins.push( LOGIC.encrypt_data(scores[k].admin)); 
            }
            CORE.initDBAdmin = false; 
        }
    }
}
 function errData(err)
 {
     console.log('Error! '+ err); 
 }

 function UploadImage()
 {
    var imagenUpload = document.querySelector(".imagenUpload").files[0];
    if(imagenUpload){
        LOGIC.saveImageUpload(imagenUpload); 
        CORE.imageokupload = false; 
        // Upload the file
        var uploadTask = storage.ref().child('fotos/'+imagenUpload.name).put(imagenUpload);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            var infoProcess = document.querySelector("#UploadImageProcess"); 
            infoProcess.innerText= 'Imagen subiendose: ' + progress + '% '; 
            switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                infoProcess.innerText= 'Error'; 
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                infoProcess.innerText= 'Imagen Subida';
                break;
            }
        },
        (error) => {
            // Handle unsuccessful uploads
            alert("No se ha subido bien la imagen"); 
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                LOGIC.saveImageUpload(downloadURL); 
                console.log('File available at', downloadURL);
                CORE.imageokupload = true; 
            });
        }
        );
    }
 }

 //Calendario 
 document.addEventListener('DOMContentLoaded', function() {
    if(document.title=="LesGirls"){
        var calendarEl = document.getElementById('calendar');
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); 
        var yyyy = today.getFullYear();

        today = yyyy +'-'+ mm + '-' + dd;
        calendarDiv = new FullCalendar.Calendar(calendarEl, {
        initialDate: today,
        initialView: 'dayGridMonth',
        //   nowIndicator: true,
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,listYear'
        },
        firstDay: 1,//  1(Monday) this can be changed to 0(Sunday) for the USA system
        locales: 'es',
        eventColor: '#75c9a3',
        contentHeight:"auto",
        dateClick: function(info) {
            
            GFX.hiddenEvents(info.dateStr); 
            $(".day-highlight").removeClass("day-highlight");
            info.dayEl.classList.remove('fc-day-future')
            info.dayEl.classList.add('day-highlight'); 
        },

        selectable: true,
        });

        calendarDiv.render();
    }
  });
  let menu = document.querySelector('.menu');
  let toggle = document.querySelector('.toggle');
  
  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });






  
 
 