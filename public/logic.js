
 //logica de la app (Controler)
var LOGIC = {

    init: function()
    {

    }, 

    update: function(dt)
    {

    }, 
    // Actualización 
    update: function(dt)
    {

    }, 
    //mirar si los datos estan vacios
    writtenData: function()
    {
        var valuenameEvent = document.querySelector("#nameEvent"); 
        var valueDate= document.querySelector("#dateEvent");
        var valueDateFin= document.querySelector("#dateEventFinish");
        var valueHour= document.querySelector("#horaEvent");
        var valueImage= document.querySelector(".imagenUpload");
        var valueOrganizer= document.querySelector("#organizerEvent");
        var valueUbi= document.querySelector("#ubiEvent");
        var valueHourFin= document.querySelector("#horaFinalEvent");
        
        if(!auth.currentUser)
        {
            firebase.auth().signInWithPopup(provider);
        }
        

        if(valueHourFin.value!="" && valueUbi.value!="" && valueOrganizer.value!="" && valuenameEvent.value !="" && 
        valueDate.value !="" && valueDateFin!="" && valueHour.value !="" ){
            // if(!valueImage)
            //     LOGIC.saveImageUpload(valueImage.value);
            
            GFX.createDivEventos(); 
            this.saveDB(); 
            
            
            if(CORE.addEventVotation){
                var VotacionesNew =  document.createElement("a");
                VotacionesNew.classList.add("votacion");
                VotacionesNew.setAttribute("onclick", "GFX.togglePopupVotacion()");
                VotacionesNew.innerText=CORE.nameNewEvent.value;
                var li =  document.createElement("li");
                li.appendChild(VotacionesNew); 
                CORE.navUl.appendChild(li); 
            }
            document.location.reload();
        }
        else{
            alert("Falta un campo o cargar la Imagen"); 
        }
    }, 
    writtenVotation:function()
    {
        this.saveDBvotation(); 
        //DB  
        var data = CORE.Votation[CORE.Votation.length-1]
        insertData(data, "Votation"); 
        document.location.reload();
    }, 
    saveDB: function()
    {
        var data = CORE.DicEvents[CORE.DicEvents.length-1]; 
        insertData(data, "Eventos"); 
    }, 
    saveDBvotation: function()
    {
        // var listOptions = []; 
        // var votlist = []; 
        // for(var i=1; i<CORE.contvoationactual+1; i++)
        // {
        //     var inputs = document.querySelector("#Input"+i); 
        //     listOptions.push(inputs.value); 
        //     votlist.push(0); 
        // }
       var auxVotation = new Votation(CORE.Votation.length, document.querySelector("#nameVotationOverlay").value,  "", document.querySelector("#googleaswer").value, document.querySelector("#googleResp").value); 
       CORE.Votation[CORE.Votation.length] = auxVotation; 
        
    },
    //Ordenar lista en funcion de la fecha
    //obtener info de la votacion o de la idea 
    InfoVotationElement: function(element)
    {
        if(element){
            var id = element.id.substring(8, element.id.length);

            for (var i = 0; i < CORE.Votation.length; i++)
            {
                if(id == CORE.Votation[i].id)
                {
                    CORE.overlayactive =CORE.Votation[i].id; 
                    // var options = CORE.Votation[i].lisoptions; 
                    // var votlist = CORE.Votation[i].votlist; 
                    GFX.addButtonOptionVotation(id, CORE.Votation[i].name, CORE.Votation[i].link, CORE.Votation[i].resp); 
                    //Modificar DB 
                    //this.modVotation(options,votlist); 
                }
            }
        }
        else //borrar hijos de overlay remove
        GFX.removeChildOverlay(); 
        
    }, 
    
    sumValue: function(event)
    {
        var j = CORE.overlayactive; 
        for(var i =0; i<CORE.Votation[j].lisoptions.length; i++)
        {
            if(event.textContent == CORE.Votation[j].lisoptions[i])
            {
                CORE.Votation[j].votlist[i] += 1;  
            }
        }
        writeNewDatavotation(j, "votlist", CORE.Votation[j].votlist)
    }, 
    idChangeToDelate: function(event)
    {
        var id = event.name.substring(6,event.name.length); 
        var indide= false;         
        var db = firebase.database();
        var leg = CORE.Votation.length; 
        for(var i=0; i< leg; i++){
            if(indide){
                var keyoth = CORE.Votation[i].key;
                CORE.Votation[i].id -=1; 
                db.ref("Votation/"+keyoth+"/id").set(CORE.Votation[i].id);
            }
            if(CORE.Votation[i].id == id){
                var k = CORE.Votation[i].key; 
                indide = true; 
                id = -1; 
            }
        }
        
        db.ref("Votation/"+k).remove();
        document.location.reload();
        
    },
    delateAsistant: function(event)
    {
        var Posid= event.id.substring(0, event.id.indexOf("-")); 
        var AsistentPos= event.id.substring(event.id.indexOf("-")+1); 
        
        for(var i=0; i< CORE.DicEvents.length; i++){
            if(CORE.DicEvents[i].id == Posid)
            {
                if (confirm('Vas a borrar un asistente: '+CORE.DicEvents[i].asistentes[AsistentPos].split('/')[0])) {
                   var entra =0; 
                    for(let j=0; j<CORE.admins.length; j++)
                   {
                        if(auth.currentUser.email)
                        {
                            if(auth.currentUser.email == LOGIC.decrypt_data(CORE.DicEvents[i].asistentes[AsistentPos].split('/')[1]) ||
                            LOGIC.encrypt_data(auth.currentUser.email) == CORE.admins[j])
                            {
                                delateasistentEvenDB(event);
                                entra = 1;  
                                document.location.reload();
                                
                            }
                        }
                        else
                        {
                            if(auth.currentUser.uid)
                            {
                                if(auth.currentUser.uid == LOGIC.decrypt_data(CORE.DicEvents[i].asistentes[AsistentPos].split('/')[1]))
                                {
                                    delateasistentEvenDB(event);
                                    entra = 1;  
                                    document.location.reload();
                                    
                                }
                            }
                        }
                       
                    //    else
                    //    {
                        //    }
                    }
                    if(entra==0)
                        alert("No eres el usuario que vas a borrar.");
                }
            }
        }
       
    }, 

    delateEvent: function(event)
    {
        if(!auth.currentUser)
        {
            alert("Inicia Sesión"); 
            firebase.auth().signInWithPopup(provider);
        }
        if(auth.currentUser)
        {
            let person = prompt("Contraseña para borrar:", "");
            
            for (var i =0; i<  CORE.admins.length; i++)
            {
                if(auth.currentUser.email)
                {
                    if (person!=null && (person == LOGIC.decrypt_data(CORE.paswordEliminar) ||
                    auth.currentUser.email == LOGIC.decrypt_data(CORE.admins[i])))
                    {
                        delateEvenDB(event); 
                        document.location.reload();
                    }
                }
            }

        }
        
    },
    EditEventPass: function(event)
    {
        if(!auth.currentUser)
        {
            alert("Inicia Sesión"); 
            firebase.auth().signInWithPopup(provider);
        }
        if(auth.currentUser)
        {
            var IsOrganizer =0; 
            var notPas =0; 
            for(var j=0; j<CORE.DicEvents.length;j++)
            {
                if(event.name == CORE.DicEvents[j].id)
                {
                    if(auth.currentUser.email)
                    {
                        if( auth.currentUser.email == LOGIC.decrypt_data(CORE.DicEvents[j].organizer.split('/')[1]))
                        {
                            GFX.toggleEditPopup(event);
                            IsOrganizer =1; 
                            break; 
    
                        }
                    }
                }

            }
            if(IsOrganizer ==0)
            {
                let person = prompt("Contraseña para editar:", "");
                if(person !=null){
                    for (var i =0; i<  CORE.admins.length; i++)
                    {
                        if(auth.currentUser.email)
                        {
                            if (person == LOGIC.decrypt_data(CORE.paswordEliminar) ||
                            auth.currentUser.email == LOGIC.decrypt_data(CORE.admins[i]))
                            {
                                GFX.toggleEditPopup(event);
                                notPas =1; 
                                break; 
                            }
                        }
                    }
                    if(notPas ==0)
                        alert('No eres el organizador de este event, ni admin de Lesgirls o has introducido mal la contraseña')

                }
            }

                    
            
               
        }
        
    },
    seditEvent: function()
    {
        // let person = prompt("Contraseña para borrar:", "");
        // if (person == CORE.paswordEliminar) {
            var title = document.querySelector("#nameEditEvent").value; 
            var content= CORE.editors.NewEventEditDescription.getData(); //GFX.createLeerMas(CORE.editors.NewEventEditDescription.getData(),CORE.idEdit); 
            var date= document.querySelector("#dateEditEvent").value; 
            var dateFin= document.querySelector("#dateEventEditFinish").value; 
            var hour= document.querySelector("#horaEditEvent").value; 
            var hourFin= document.querySelector("#horaFinalEditEvent").value; 
            var ubi= document.querySelector("#ubiEditEvent").value; 
            var categoria= document.querySelector("#categoriaEdit").value; 
            var id = CORE.idEdit;  
            for(var i=0; i< CORE.DicEvents.length; i++){
                if(CORE.DicEvents[i].id == id)
                {
                    var organizer= document.querySelector("#organizerEditEvent").value +"/"+LOGIC.decrypt_data(CORE.DicEvents[i].organizer.split('/')[1]); 
                    break; 
                }
            }
            if(categoria=="1" || categoria=="2" || categoria=="3" ||
            categoria=="4" || categoria=="5" || categoria=="6" || categoria=="7" ||
            categoria=="8")
                var image = GFX.imageForCategory(categoria); 
            else
            {
                var id = CORE.idEdit;  
    
                for(var i=0; i< CORE.DicEvents.length; i++){
                    if(CORE.DicEvents[i].id == id)
                    {
                        var image = document.querySelector(".ImageOption2 .imagenUpload").value; 
                    }
                }
            }
            editEvenDB( title, image, content,date, dateFin, hour, categoria, organizer, hourFin, ubi); 
            document.location.reload();
           
       // }
       
    },
    // https://es.stackoverflow.com/questions/259945/ordenar-ul-javascript
    ordenarLista: function(idUl){
        //Obtenemos el elemento ul
        let ul = document.getElementById(idUl);    
        //Obtenemos la lista de li
        let lista = ul.getElementsByTagName("li");
        //Creamos el array a partir de los elementos li
        //A continuación ordenamos con sort (hay que ordenar mirando el textContent y evitando la etiqueta li
        //Por último recorremos el array ya ordenado y vamos haciendo el append en el elemento ul (sobrescribiéndolo)
        let arrayCanciones = Array.from(lista);
        arrayCanciones.sort((a, b) => a.textContent.localeCompare(b.textContent))
        .forEach(li => ul.appendChild(li));
       
    },
    ordenarEventDate: function()
    {
        if(document.title=="LesGirls"){
            var listDate = []; 

            for (var i =0; i< CORE.DicEvents.length; i++)
            {
                var dateOrdnear = CORE.DicEvents[i].date; 
                var indexBar = dateOrdnear.indexOf('-'); 
                var year = dateOrdnear.substring(0, indexBar);
                dateOrdnear = dateOrdnear.replace(dateOrdnear.substring(0,indexBar+1),'');
                var indexBar = dateOrdnear.indexOf('-'); 
                var mes = dateOrdnear.substring(0, indexBar);
                var dia = dateOrdnear.substring(indexBar+1, dateOrdnear.length);
                dateOrdnear = mes+'/'+dia+'/'+year; 

                var time = CORE.DicEvents[i].hour;
                var timeParts = time.split(":");
                var milisegHour =(+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000);
        
                listDate.push(Date.parse(dateOrdnear)+milisegHour); 
            }
            listDate = Array.from(listDate);
            listDate.sort(); 

            var listOrdenarId = []; 
            for(var i =0; i<CORE.DicEvents.length; i++)
            {
                var inside = false; 
                var dateOrdnear = CORE.DicEvents[i].date; 
                var indexBar = dateOrdnear.indexOf('-'); 
                var year = dateOrdnear.substring(0, indexBar);
                dateOrdnear = dateOrdnear.replace(dateOrdnear.substring(0,indexBar+1),'');
                var indexBar = dateOrdnear.indexOf('-'); 
                var mes = dateOrdnear.substring(0, indexBar);
                var dia = dateOrdnear.substring(indexBar+1, dateOrdnear.length);
                dateOrdnear = mes+'/'+dia+'/'+year; 
        
                var time = CORE.DicEvents[i].hour;
                var timeParts = time.split(":");
                var milisegHour =(+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000);
                dateOrdnear = Date.parse(dateOrdnear) +milisegHour; 

                for(var j =0; j<CORE.DicEvents.length; j++)
                {
                    if(dateOrdnear == listDate[j] && !inside && !listOrdenarId[j])
                    {
                        listOrdenarId[j]= CORE.DicEvents[i].id; 
                        inside = true; 
                    }
                }
            }

            var parent = document.getElementById('AddEvents');
            parent.innerHTML = "";
            // parent.innerHTML = "<h2>Eventos &nbsp;&nbsp;&nbsp; <button id ='ViewAllEvents' onclick='GFX.seeAllEvents()'>Ver todos los eventos</button></h2>";

            var OrdenarDiv = []; 
            for(var i =0; i< listOrdenarId.length; i++)
            {
                for(var j=0; j<CORE.DicEvents.length; j++)
                {
                    if(CORE.DicEvents[j].id==listOrdenarId[i]){
                        GFX.printEvent(j); 
                        OrdenarDiv.push(CORE.DicEvents[j]); 
                    }
                }
            }
            CORE.DicEvents = OrdenarDiv;
            delatenodeDBforTime(); 
        }

        // let divCalendar = document.querySelector("#DivCalendar"); 
        // let divEvents = document.querySelector("#EventsTrnasf"); 
        // let CalendarHeight = divCalendar.clientHeight;
        // let divVotationNav = document.querySelector("#VotationNav"); 
        // let divFooter = document.querySelector("main"); 
        // divEvents.style.transform = "translate(0px,-"+CalendarHeight+"px)";
        // divVotationNav.style.transform = "translate(0px,-"+CalendarHeight+"px)";
        // divFooter.style.height = divFooter.clientHeight-220 +"px"; 
        
        
    }, 
    saveImageUpload:function(downloadURL)
    {
        CORE.imageUploadURL = downloadURL; 
    }, 
    copyInfoAgenda: function()
    {
        var message= String.fromCodePoint(0x1F308) +" AGENDA " + String.fromCodePoint(0x1F308) +"\n"; 
        for(var i=0; i< CORE.DicEvents.length; i++)
        {
            const MESES = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
                "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
              ];
              const date = new Date(CORE.DicEvents[i].date);
              
               // Devuelve el mes actual en formato de texto

            message += "*"+LOGIC.spaceTitle(CORE.DicEvents[i].title) + "* " + date.getDate() +" de " + MESES[date.getMonth()] + " ha las " + CORE.DicEvents[i].hour +"h\n"; 
        }

        message += "\nMás información en https://lesgirls.es/ \n¡No te olvides de apuntarte!"; 
        GFX.togglePopupShareAgenda(); 
        GFX.ShowAgenda(message); 
    }, 
    DatetoString: function(date)
    {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); 
        var yyyy = date.getFullYear();

        var StringDate = yyyy+ '-'+ mm + '-' + dd;

        return StringDate; 
    }, 
    spaceTitle: function(title)
    {
        if(title[title.length-1] == ' ')
            title = title.substring(0, title.length-1);
        if(title[0] ==' ')
            title = title.substring(1, title.length);
        return title; 
    }, 
    sshareEvent: function(ss)
    {
        var TitleEvent= ""; 
        var imageEvent= ""; 
        var DateInitEvent = ""; 
        var DateFinishEvent = "";
        var HourEvent = "";  
        var ContentEvent = "";  

        for(var i =0; i< CORE.DicEvents.length; i++)
        {
            if(CORE.DicEvents[i].id == ss.name)
            {
                TitleEvent = LOGIC.spaceTitle(CORE.DicEvents[i].title); 
                imageEvent = CORE.DicEvents[i].image; 

                //Quitar img/ ... .png
                if(imageEvent.indexOf("img/")!=-1)
                    imageEvent = imageEvent.substring(4, imageEvent.length-4);
                
                if(imageEvent =="pp")
                    imageEvent=""; 
        
                DateInitEvent =  new Date(CORE.DicEvents[i].date); 
                DateFinishEvent = new Date(CORE.DicEvents[i].dateFin); 
                HourEvent = CORE.DicEvents[i].hour; 
                ContentEvent = CORE.DicEvents[i].content;   
                break; 
            }
        }
        var URLactual = window.location; 
        var StringCopyPortapapeles= "*"+TitleEvent+"* \nFecha: "+ LOGIC.WhatDayWeekIs(DateInitEvent)+" "+ 
        DateInitEvent.toLocaleDateString("es-ES")+ "- "+ LOGIC.WhatDayWeekIs(DateFinishEvent)+" "+
        DateFinishEvent.toLocaleDateString("es-ES") +" Hora: "+ HourEvent+ "\n"+ ContentEvent +"\n"+ 
        imageEvent+ "\nApúntate en:  " + URLactual.href+"#Evento"+CORE.DicEvents[i].id; 

        var div = document.createElement("div");
        StringCopyPortapapeles = LOGIC.URLify(StringCopyPortapapeles); 
        div.innerHTML = StringCopyPortapapeles;
        StringCopyPortapapeles = div.textContent || div.innerText || "";
        StringCopyPortapapeles += "\nPara más información entra en la web: "+URLactual.href; 
        StringCopyPortapapeles = StringCopyPortapapeles.replace("...", "");
        const el = document.createElement('textarea');
        el.value = StringCopyPortapapeles;	//str is your string to copy
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');	// Copy command
        alert("Copiado portapapeles");
        document.location.reload();


    },
    WhatDayWeekIs:function(Fecha){
        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

        var day = days[Fecha.getDay()];
        return day; 
    },
    //Borrar <a href= ... </a> para http.....com
    URLify: function(string){
        var urls = string.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)/g);
        var linkA = string.match(/<a(.*?)<\/a>/g);
        if(urls != null && linkA!= null)
        {
            for(var i =0; i< urls.length; i++)
            {
                string = string.replace(linkA[i],  urls[i]);
            }
        }
        
        return string;
    }, 
    seeReadMore: function(event)
    {
        var id = event.id.substring("ReadMoreDescripction".length, event.id.length);
        var dots = document.getElementById("dots"+id);
        var moreText = document.getElementById("more"+id);
        var btnText = document.getElementById("ReadMoreDescripction"+id);
        if(dots){
            if (dots.style.display === "none") {
                dots.style.display = "inline";
                btnText.innerHTML = "Leer más"; 
                moreText.style.display = "none";
            } else {
                dots.style.display = "none";
                btnText.innerHTML = "Leer menos";
                moreText.style.display = "inline";
            // if(moreText.style.display == "none") 
            //     moreText.style.display = "";
            // else
            //     moreText.style.display = "none"
            }
        }
    },
    RegisterUser: function(event)
    {
        event.preventDefault(); 
    }, 
    InitUser: function(event)
    {
        event.preventDefault(); 
        const InitEmail = document.querySelector("");

    }, 
    encrypt_data:function(string) {
        string = unescape(encodeURIComponent(string));
        var newString = '',
           char, nextChar, combinedCharCode;
        for (var i = 0; i < string.length; i += 2) {
        char = string.charCodeAt(i);

      if ((i + 1) < string.length) {


      nextChar = string.charCodeAt(i + 1) - 31;


      combinedCharCode = char + "" + nextChar.toLocaleString('en', {
       minimumIntegerDigits: 2
      });

      newString += String.fromCharCode(parseInt(combinedCharCode, 10));

      } else {


      newString += string.charAt(i);
      }
      }
      return newString.split("").reduce((hex,c)=>hex+=c.charCodeAt(0).toString(16).padStart(4,"0"),"");
    },
    decrypt_data:function(string) {

        var newString = '',
        char, codeStr, firstCharCode, lastCharCode;
        string = string.match(/.{1,4}/g).reduce((acc,char)=>acc+String.fromCharCode(parseInt(char, 16)),"");
        for (var i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char > 132) {
        codeStr = char.toString(10);
  
        firstCharCode = parseInt(codeStr.substring(0, codeStr.length - 2), 10);
  
        lastCharCode = parseInt(codeStr.substring(codeStr.length - 2, codeStr.length), 10) + 31;
  
        newString += String.fromCharCode(firstCharCode) + String.fromCharCode(lastCharCode);
        } else {
        newString += string.charAt(i);
        }
        }
        return newString;
    },  
    // cambiarIDIfRepite: function()
    // {
        
    //     for(var i=0; i<CORE.DicEvents.length; i++)
    //     {

    //     }
    // }
    
}; 
CORE.modules.push(LOGIC); 