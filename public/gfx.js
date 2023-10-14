//Graficos (VER)
var GFX =
{
    //canvas : null, 
    init: function()
    {
        this.addEventDB(); //setInterval('contador()',1000); Para que cada 1000 mili segundos se vaya actualizando
        
    }, 

    draw: function()
    {
        
    },
    togglePopup: function()
    {
        document.getElementById("popup-AddEvent").classList.toggle("active"); 
        window.scrollTo(0,1);
    },
    toggleEditPopup: function(event)
    {
        if(event)
            CORE.idEdit = event.name; 
        document.getElementById("popup-EditEvent").classList.toggle("active"); 
        window.scrollTo(0,1);
        GFX.FillInfo(); 
    },
    downbotom: function()
    {
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    },
    UPbotom: function()
    {
        window.scrollTo(0,1);
    },
    togglePopupVotacion: function(element)
    {
        document.getElementById("popup-Votacion").classList.toggle("active"); 
        LOGIC.InfoVotationElement(element); 
    }, 
    togglePopupInitGoogle: function(element)
    {
        document.getElementById("popup-InitGoogle").classList.toggle("active"); 
        LOGIC.InfoVotationElement(element); 
    }, 
    togglePopupInitEmail: function(element)
    {
        document.getElementById("popup-InitEmail").classList.toggle("active"); 
        LOGIC.InfoVotationElement(element); 
    }, 
    togglePopupHoroscopo: function(val)
    {
        window.scrollTo(0,1);
        document.getElementById("popup-Horoscopo").classList.toggle("active"); 
        if(val){
            document.getElementById("Value-Horoscopo").innerHTML =val;
            switch (val) {
                case "Aries":
                  document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Aries; 
                  break;
                case "Tauro":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Tauro; 
                  break;
                case "géminis":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Geminis; 
                  break;
                case "cáncer":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Cancer; 
                    break;
                case "leo":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Leo; 
                    break;
                case "virgo":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Virgo; 
                    break;
                case "libra":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Libra; 
                    break;
                case "escorpio":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Escorpio; 
                    break;
                case "sagitario":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Sagitario; 
                    break;
                case "capricornio":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Capricornio; 
                    break;
                case "acuario":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Acuario; 
                    break;
                case "piscis":
                    document.getElementById("Explication_Horoscopo").innerHTML = CORE.des_Horosc.Piscis; 
                    break;
              }
        }
        
    }, 
    togglePopupShareAgenda: function()
    {
        document.getElementById("popup-shareAgenda").classList.toggle("active"); 
        window.scrollTo(0,1);
    },
    togglePopupVot: function()
    {
        document.getElementById("popup-Vot").classList.toggle("active"); 
        CORE.contvoationactual = 0; 
        window.scrollTo(0,1);
    },
    addInput: function()
    {
        var divOverlay = document.querySelector("#addOtherInput"); 

        var inputdiv = document.createElement("input");
        CORE.contvoationactual +=1; 

        inputdiv.id = "Input"+CORE.contvoationactual;
        divOverlay.appendChild(inputdiv); 

    },
    FillInfo: function()
    {
        var id = CORE.idEdit;  
        for(var i=0; i< CORE.DicEvents.length; i++){
            if(CORE.DicEvents[i].id == id)
            {
                document.querySelector("#nameEditEvent").value = CORE.DicEvents[i].title; 
                document.querySelector("#dateEditEvent").value = CORE.DicEvents[i].date; 
                document.querySelector("#dateEventEditFinish").value = CORE.DicEvents[i].dateFin; 
                document.querySelector("#horaEditEvent").value = CORE.DicEvents[i].hour; 
                document.querySelector("#horaFinalEditEvent").value = CORE.DicEvents[i].hourFin; 
                document.querySelector("#ubiEditEvent").value = CORE.DicEvents[i].ubi; 
                document.querySelector("#categoriaEdit").value = CORE.DicEvents[i].categoria; 
                document.querySelector("#organizerEditEvent").value = CORE.DicEvents[i].organizer.split('/')[0]; 
                if(document.querySelector("#categoriaEdit").value=="SubirImagen")
                    GFX.selection2Value(document.querySelector("#categoriaEdit")); 
                if(document.querySelector(".ImageOption2 .imagenUpload"))
                    document.querySelector(".ImageOption2 .imagenUpload").value = CORE.DicEvents[i].image; 
                CORE.editors.NewEventEditDescription.setData(CORE.DicEvents[i].content); 
                CORE.editors.NewEventEditDescription.setData(CORE.editors.NewEventEditDescription.getData().replace("...", ""));
                break;
            }
        }
    },
    addlistnav:function()
    {
        if(document.title=="LesGirls"){
            var divnav = document.querySelector("#ulnav"); 
            var liEvent = document.createElement("li"); 
            var aEvent = document.createElement("a"); 
            aEvent.setAttribute("onclick", "GFX.togglePopupVotacion(this)");
            aEvent.classList.add("votacion");
            var leng =CORE.Votation.length-1;  
            aEvent.id = "votacion"+leng;
            aEvent.innerText = CORE.Votation[CORE.Votation.length-1].name.charAt(0).toUpperCase() +CORE.Votation[CORE.Votation.length-1].name.slice(1); 
            liEvent.appendChild(aEvent); 
            divnav.appendChild(liEvent); 
        }
    },
    addEventDB:function()
    {
        seeData("Eventos"); 
        seeData("Votation"); 
        seeData("PassWord"); 
        seeData("Admin"); 
    },
    addAsistent:function(event)
    {
        if(!auth.currentUser)
        {
            alert("Inicia Sesión"); 
            firebase.auth().signInWithPopup(provider);
        }
        else
        {
            var evalurarEmailExistente =0; 
            for(var i=0; i< CORE.DicEvents.length; i++){
                if(CORE.DicEvents[i].id == event.name)
                {
                    for(var j=0; j< CORE.DicEvents[i].asistentes.length; j++){
                        if(auth.currentUser.email)
                        {
                            if( auth.currentUser.email == LOGIC.decrypt_data(CORE.DicEvents[i].asistentes[j].split('/')[1]))
                                evalurarEmailExistente =1; 
                            for(var k=0; k< CORE.admins.length; k++)
                            {
                                if( LOGIC.encrypt_data(auth.currentUser.email) == CORE.admins[k])
                                    evalurarEmailExistente =0; 
                            }
                        }
                    }
                }

            }
            if(evalurarEmailExistente == 0)
            {
                var value = document.querySelector('#Asistencia'+event.name).value; 
                if(value!="")
                {
                    writeNewPost(event.name, 'asistentes', value) 
                    this.seeAsistentes(event,  value); 
                    // document.querySelector('#Asistencia'+event.name).value = ""; 
                    var el = document.querySelector('#Evento'+event.name);
                    el.remove(); // Removes the div with the 'div-02' id
                    document.location.reload();
                }
                else
                    alert("Introduce nombre"); 
            }
            else{
                alert("Ya estas apuntado en el evento"); 
            }
        }

    },
    imageOpen:function(event) {
        // var largeImage = document.getElementById('largeImage');
        // event.style.display = 'block';
        // event.style.width=200+"px";
        // event.style.height=200+"px";
        var url=event.getAttribute('src');
        window.open(url,'Image','width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
        // img = '<img src="'+url+'">';
        // popup = window.open();
        // popup.document.write(img);                        
        // popup.print();
    },
    displayButtonRegisterGoogle: function()
    {
        const signInWithGoogleButton = document.getElementById('signInWithGoogle');
        const signOutWithGoogleButton = document.getElementById('singout');

        signInWithGoogleButton.style.display = "";
        signOutWithGoogleButton.style.display = "none";
    },
    displayButtonSalirGoogle: function()
    {
        const signInWithGoogleButton = document.getElementById('signInWithGoogle');
        const signOutWithGoogleButton = document.getElementById('singout');

        signInWithGoogleButton.style.display = "none";
        signOutWithGoogleButton.style.display = "";
    },
    seeAsistentes:function(event, value)
    {
        var ulEvent = document.querySelector("#ul"+event.name);
        var liEvent = document.createElement("li"); 
        liEvent.innerText = value; 
        ulEvent.appendChild(liEvent); 

        var contAsisten = document.querySelector('.ContadorAsistentes'+event.name); 
        for(var i=0; i<CORE.DicEvents.length; i++)
        {
            if(CORE.DicEvents[i].id == event.name)
            {
                if(CORE.DicEvents[i].asistentes)
                    contAsisten.innerText = "Asistentes: "+ CORE.DicEvents[i].asistentes.length; 
                else
                    contAsisten.innerText = "Asistentes: 0"; 
            }
        }
        

    },
    createDivEventos: function()
    {
        var valuenameEvent = document.querySelector("#nameEvent"); 
        var valueDate= document.querySelector("#dateEvent");
        var valueDateFin= document.querySelector("#dateEventFinish");
        var valueHour= document.querySelector("#horaEvent");
        var valueHourFin= document.querySelector("#horaFinalEvent");
        var valueUbi= document.querySelector("#ubiEvent");
        var valueorganizerEvent =""; 
        if(auth.currentUser.email)
            valueorganizerEvent = document.querySelector("#organizerEvent").value +"/"+ auth.currentUser.email; 
        else{
            if(auth.currentUser.uid)
                valueorganizerEvent = document.querySelector("#organizerEvent").value +"/"+ auth.currentUser.uid; 
        }

        var select = document.getElementById('categoria');
        var valueCategoria = select.options[select.selectedIndex].value;
        var categoria = valueCategoria; 

        
        var descriptionEvent = document.createElement("div");
        descriptionEvent.classList.add("description-event");
        // var proba= document.querySelectorAll(".ck.ck-editor__main p");
        descriptionEvent.innerHTML  = CORE.editors.NewEventDescription.getData();
         
        // for (var i =0; i<proba.length; i++){
        //     descriptionEvent.innerHTML += proba[i].innerHTML + "<br>" ; 
        // }
        
        
        var valueImage= document.querySelector(".imagenUpload");
        if(CORE.imageUploadURL==""){
            var image = 'img/les.webp'; 
            if(categoria == 'SubirImagen')
                var image =valueImage.value; 
            
        }
        else
            var image = CORE.imageUploadURL; 
        
        var id = CORE.DicEvents.length; 

        if(id!=0)
        {
            for(var i =1; i<(Math.max(...Object.values(CORE.arrayID))+2); i++)
            {
                if(!CORE.arrayID[i]){
                    id = i; 
                    break; 
                }
            }
        }
        // var initDescription = descriptionEvent.innerHTML.substring(0, 120);
        // initDescription += "<span id='dots"+id+"'>...</span><span id='more"+id+"' style='display: none'>"
        // var finDescription = descriptionEvent.innerHTML.substring(120, descriptionEvent.length);
        // finDescription = finDescription +"</span>"; 
        // initDescription = GFX.createLeerMas(descriptionEvent.innerHTML, id); 
        initDescription =  descriptionEvent.innerHTML; 
        

        if(!image || image =="")
            var image = 'img/les.webp'; 
        var newEve = new News(id, valuenameEvent.value, image, initDescription, valueDate.value, valueDateFin.value, valueHour.value, categoria, "", [], valueorganizerEvent, valueHourFin.value, valueUbi.value); 
        CORE.DicEvents[CORE.DicEvents.length]=newEve; 
        //var newEvenCalendar = new EventCalendar(valuenameEvent.value, valueDate.value, valueDate.value, ""); 
       // CORE.calendarEvents[CORE.calendarEvents.length]=newEvenCalendar;
    }, 
    createLeerMas: function(event, id){
        var initDescription = event.substring(0, 120);
        initDescription += "<span id='dots"+id+"'>...</span><span id='more"+id+"' style='display: none'>"
        var finDescription = event.substring(120, event.length);
        finDescription = finDescription +"</span>"; 
        initDescription = initDescription + finDescription; 
        return initDescription; 
    },
    createDivEventosDB: function(title, id, date,dateFin, hour, image, categoria, content, asistentes, key, asistenteskey, organizer, hourFin, ubi)
    {
        if(document.title=="LesGirls"){
            var valueDate= date;
            var valueDateFin= dateFin;
            var valueHour= hour;
            var valueHourFin= hourFin;
            var valueUbi= ubi;
            
            var imgEvent; 
            var index = image.indexOf("/img/");
            imgEvent = image.substring(index, image.length);
            
            if(CORE.initDB){
                for(let i=0; i<asistentes.length; i++)
                {
                    asistentes[i]= asistentes[i].split('/')[0]+'/'+LOGIC.encrypt_data(asistentes[i].split('/')[1]);
                }
                var newEve = new News(id, title, imgEvent, content, valueDate,valueDateFin, valueHour, categoria, asistentes, key, organizer,valueHourFin,valueUbi); 
                if(asistentes){
                    newEve.asistentes = asistentes; 
                    newEve.asistenteskey = asistenteskey; 
                }
                CORE.DicEvents[CORE.DicEvents.length]=newEve; 
                //var newEvenCalendar = new EventCalendar(title, valueDate, valueDate, ""); 
                //CORE.calendarEvents[CORE.calendarEvents.length]=newEvenCalendar;
                if(calendarDiv){
                    calendarDiv.addEvent({
                        title: title,
                        start: valueDate+"T"+valueHour,
                        end: valueDateFin+"T"+valueHour, 
                        url: ""
                    });

                }
                //calendarDiv.addEvent(CORE.calendarEvents[CORE.calendarEvents.length]);  
            }
            CORE.DicEvents[CORE.DicEvents.length-1].key =key; 
            CORE.arrayID[id] = id; 
        }
        
    },
    printEvent: function(indexEvent)
    {
        var nameEvent = document.createElement("h4");titleEvent
        var titleEvent = document.createElement("h2");
        var valuenameEvent = document.querySelector("#nameEvent"); 
        var valueDate= CORE.DicEvents[indexEvent].date;
        var valueDateFin= CORE.DicEvents[indexEvent].dateFin;
        var valueHour= CORE.DicEvents[indexEvent].hour;
        var valueHourFin= CORE.DicEvents[indexEvent].hourFin;
        var valueUbi= CORE.DicEvents[indexEvent].ubi;
        var valueOrganizer= CORE.DicEvents[indexEvent].organizer.split('/')[0];
        var titleUpdate = CORE.DicEvents[indexEvent].title.charAt(0).toUpperCase() +CORE.DicEvents[indexEvent].title.slice(1);
        var mydate = new Date(valueDate); 
        var mydateFin = new Date(valueDateFin); 
        var dias=["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

        titleEvent.innerText = titleUpdate; 
        nameEvent.innerText =  "📅: "+dias[mydate.getUTCDay()]+ " "+  
        mydate.toLocaleDateString("es-ES") +" - "+ dias[mydateFin.getUTCDay()] +" "+ 
        mydateFin.toLocaleDateString("es-ES")+" \n⌛: "+valueHour+ "-"+valueHourFin+"\n📌: "+valueUbi+
        "\nOrganizador: "+ valueOrganizer; 

        if(mydate.toLocaleDateString("es-ES") == mydateFin.toLocaleDateString("es-ES"))
        {
            nameEvent.innerText =  " 📅: "+dias[mydate.getUTCDay()]+ " "+  
            mydate.toLocaleDateString("es-ES") +"\n⌛: "+valueHour+ "-"+valueHourFin+"\n📌: "+valueUbi+ 
            "\nOrganizador: "+ valueOrganizer; 
        }
        
        
        var descriptionEvent = document.createElement("div");
        descriptionEvent.classList.add("description-event");
        descriptionEvent.innerHTML =  CORE.DicEvents[indexEvent].content; 
        descriptionEvent.style.fontWeight = "200";
        descriptionEvent.style.display = "none";
        //Poner LINK en los links
        if(descriptionEvent.querySelectorAll("a"))
        {
            for(var i=0; i<descriptionEvent.querySelectorAll("a").length; i++){
                if(descriptionEvent.querySelectorAll("a")[i].text!="LINK")
                    descriptionEvent.querySelectorAll("a")[i].text="LINK"; 
            }
            
        }
        
        
        var imgEvent = document.createElement("img");
        var index = CORE.DicEvents[indexEvent].image.indexOf("/img/");
        imgEvent.src = CORE.DicEvents[indexEvent].image.substring(index, CORE.DicEvents[indexEvent].image.length);
        imgEvent.alt = "img_event"; 
        imgEvent.title = "img_event"; 
        imgEvent.setAttribute("class", "img_Event");
        imgEvent.setAttribute("onclick", "GFX.imageOpen(this)");
        
        
        var AsistenciaEvent = document.createElement("input"); 
        var AsisDescEvent = document.createElement("label"); 
        AsisDescEvent.innerText= "\n"; 
        AsisDescEvent.style.fontWeight = "200";
        
        AsistenciaEvent.id="Asistencia"+CORE.DicEvents[indexEvent].id; 
        AsistenciaEvent.setAttribute("class", "AsistenciaInput");
        AsistenciaEvent.setAttribute("placeholder", "Nombre");

        
        var brdiv = document.createElement("br"); 
        var divINPUT = document.createElement("div"); 
        divINPUT.setAttribute("class", "InputElementsEvents");

        var bSubmit = document.createElement("button"); 
        bSubmit.setAttribute("type", "button");
        bSubmit.setAttribute("class", "delateEvent fa fa-plus");
        bSubmit.setAttribute("name", CORE.DicEvents[indexEvent].id);
        // bSubmit.value = "+"; 
        // bSubmit.style.fontWeight = "800";
        bSubmit.setAttribute("onclick", "GFX.addAsistent(this)");

        var bInfo = document.createElement("input"); 
        bInfo.setAttribute("type", "submit");
        bInfo.setAttribute("class", "bInfo");
        bInfo.setAttribute("name", CORE.DicEvents[indexEvent].id);
        bInfo.value = "Más información"; 
        bInfo.style.fontWeight = "800";
        bInfo.setAttribute("onclick", "GFX.seeInfo(this)");

        var ulEvent = document.createElement("ul");
        ulEvent.setAttribute("id", "ul"+CORE.DicEvents[indexEvent].id);
        ulEvent.style.display = "none";
        if(CORE.DicEvents[indexEvent].asistentes){
            for (var i = 0; i<CORE.DicEvents[indexEvent].asistentes.length; i++){
                var liEvent = document.createElement("li"); 
                    liEvent.innerText = CORE.DicEvents[indexEvent].asistentes[i].split('/')[0].charAt(0).toUpperCase() + CORE.DicEvents[indexEvent].asistentes[i].split('/')[0].slice(1); 
                    liEvent.style.fontWeight = "800";
                    liEvent.setAttribute("class", "li"+CORE.DicEvents[indexEvent].id+"-"+i);

                var delateli = document.createElement("div");
                    delateli.innerText= "X";
                    delateli.setAttribute("class", "close-btn-Asistant");
                    delateli.setAttribute("id", CORE.DicEvents[indexEvent].id+"-"+i);
                    delateli.setAttribute("onclick", "LOGIC.delateAsistant(this)");
                    
                    var tooltipli = document.createElement("div");
                    tooltipli.innerText= "Borrar asistente";
                    tooltipli.setAttribute("class", "tooltiptext");
                    
                    delateli.appendChild(tooltipli); 
                    liEvent.appendChild(delateli); 
                    ulEvent.appendChild(liEvent); 
                }
            }
            var contEvent = document.createElement("div"); 
            contEvent.classList.add("ContadorAsistentes"+CORE.DicEvents[indexEvent].id);
            if(CORE.DicEvents[indexEvent].asistentes){
                contEvent.innerText = "Asistentes: "+CORE.DicEvents[indexEvent].asistentes.length; 
                contEvent.style.fontWeight = "800";
            }
            else{
                contEvent.innerText = "Asistentes: 0"; 
            contEvent.style.fontWeight = "800";
        }

        var ReadMore = document.createElement("a"); 
        ReadMore.innerText = "Leer más"; 
        ReadMore.setAttribute("id", "ReadMoreDescripction"+CORE.DicEvents[indexEvent].id);
        ReadMore.setAttribute("class", "ReadMoreDescripction");
        ReadMore.setAttribute("onclick", "LOGIC.seeReadMore(this)");

        var delatebutton = document.createElement("button"); 
        delatebutton.setAttribute("type", "button");
        // delatebutton.innerText = "Eliminar Evento"; 
        delatebutton.setAttribute("class", "shareEvent fa fa-trash-o");
        delatebutton.setAttribute("name", CORE.DicEvents[indexEvent].id);
        delatebutton.setAttribute("onclick", "LOGIC.delateEvent(this)");

        var sharebutton = document.createElement("button"); 
        sharebutton.setAttribute("type", "button");
        // sharebutton.innerText = "Share Evento"; 
        sharebutton.setAttribute("class", "shareEvent fa fa-share-alt");
        sharebutton.setAttribute("name", CORE.DicEvents[indexEvent].id);
        sharebutton.setAttribute("onclick", "LOGIC.sshareEvent(this)");

        var editbutton = document.createElement("button"); 
        editbutton.setAttribute("type", "button");
        // editbutton.innerText = "Edit Evento"; 
        editbutton.setAttribute("class", "shareEvent fa fa-pencil-square-o");
        editbutton.setAttribute("name", CORE.DicEvents[indexEvent].id);
        editbutton.setAttribute("onclick", "LOGIC.EditEventPass(this)");
        
        var cont1Event = document.createElement("div"); 
        cont1Event.classList.add("content"); 
        
        var div1Event = document.createElement("div"); 
        var div1Img = document.createElement("div"); 
        var divButtoms = document.createElement("div"); 
        divButtoms.setAttribute("class", "Butt_Events");

        div1Event.classList.add("Evento"); 
        div1Event.setAttribute("id", "Evento"+CORE.DicEvents[indexEvent].id);
        
        this.colorBackgroundEvent( CORE.DicEvents[indexEvent].categoria, div1Event); 
        
        div1Img.appendChild(imgEvent); 
        div1Event.appendChild(div1Img); 
        cont1Event.appendChild(titleEvent); 
        cont1Event.appendChild(nameEvent); 
        cont1Event.appendChild(bInfo); 
        // cont1Event.appendChild(brdiv); 
        cont1Event.appendChild(AsisDescEvent); 
        divINPUT.appendChild(AsistenciaEvent); 
        divINPUT.appendChild(bSubmit); 
        cont1Event.appendChild(divINPUT); 
        cont1Event.appendChild(ulEvent); 
        cont1Event.appendChild(descriptionEvent); 
        divButtoms.appendChild(delatebutton); 
        divButtoms.appendChild(sharebutton); 
        divButtoms.appendChild(editbutton); 
        divButtoms.appendChild(contEvent); 
        cont1Event.appendChild(divButtoms); 
        div1Event.appendChild(cont1Event); 
        CORE.addEvents.appendChild(div1Event); 
    }, 
    seeInfo: function(event)
    {
        var divE = document.querySelector("#Evento"+event.name+" .description-event"); 
        var divAS = document.querySelector("#ul"+event.name); 
        
        var Info = document.querySelector("#Evento"+event.name+" .bInfo"); 
        if(divE.style.display === "none")
        {
            divE.style.display ="block"; 
            divAS.style.display ="block"; 
            Info.value ="Menos información"; 
        }
        else{
            divE.style.display = "none"; 
            divAS.style.display = "none"; 
            Info.value ="Más información"; 

        }
    },
    seeCalendar: function(event)
    {
        let divFilter = document.querySelector("#Filter"); 
        let divCalendar = document.querySelector("#DivCalendar"); 
        let divEvents = document.querySelector("#EventsTrnasf"); 
        let divVotationNav = document.querySelector("#VotationNav"); 
        
        let divFooter = document.querySelector("main"); 
        let CalendarHeight = divCalendar.clientHeight;
        if(divCalendar.style.visibility === "hidden")
        {
            divCalendar.style.visibility ="visible"; 
            divFilter.innerHTML ="Ocultar Filtro"; 
            divEvents.style.transform = "translate(0px,0px)"; 
            divVotationNav.style.transform = "translate(0px,0px)"; 
            divEvents.style.transition = "all 0.4s"; 
            divVotationNav.style.transition = "all 0.4s"; 
            // divFooter.style.height = divFooter.clientHeight-330 +"px"; 
        }
        else{
            divCalendar.style.visibility = "hidden"; 
            divFilter.innerHTML ="Desplegar Filtro"; 
            divEvents.style.transform = "translate(0px,-"+CalendarHeight+"px)"; 
            divVotationNav.style.transform = "translate(0px,-"+CalendarHeight+"px)"; 
            // divFooter.style.height = divFooter.clientHeight-330 +"px"; 
            divEvents.style.transition = "all 0.4s"; 
            divVotationNav.style.transition = "all 0.4s"; 
            
        }
    },
    ShowAgenda: function(msg)
    {
        var divShareAgenda = document.querySelector("#shareAgenda"); 
        //delate child
        while (divShareAgenda.firstChild) {
            divShareAgenda.removeChild(divShareAgenda.lastChild);
        }
        var textarea = document.createElement("textarea"); 
        textarea.setAttribute("style", "background: white; height: 300px; width: 100%; ");

        textarea.value = msg; 

        divShareAgenda.appendChild(textarea); 

    },
    colorBackgroundEvent: function(category, div1Event)
    {
        // switch (category) {
        //     case "1": // Senderismo
        //         div1Event.setAttribute("style", "border-top-color: #004D40;");
        //       break;
        //     case "2": // Girls-bcn
        //         div1Event.setAttribute("style", "border-top-color: #26A69A;");
        //       break;
        //     case "3": // Fiesta/Bar --
        //         div1Event.setAttribute("style", "border-top-color: #80CBC4;");
        //       break;
        //     case "4": // Cultura ---
        //         div1Event.setAttribute("style", "border-top-color: #B2DFDB;");
        //       break;
        //     case "5": // Gastronomía ---
        //         div1Event.setAttribute("style", "border-top-color: #00BFA5;");
        //       break;
        //     case "6": // Deporte --
        //         div1Event.setAttribute("style", "border-top-color: #C8E6C9;");
        //       break;
        //     case "7": // Cine --
        //         div1Event.setAttribute("style", "border-top-color: #66BB6A;");
        //         break;
        //     case "8": // Juegos ---
        //         div1Event.setAttribute("style", "border-top-color: #C8E6C9;");
        //       break;
        //     default: // Subir imagen 
        //         div1Event.setAttribute("style", "border-top-color: #00897B;");
        //   }
          
    },
    addButtonOptionVotation: function(id, name, link, resp)
    {
        var divInfoVotation = document.querySelector("#InfoVotacionDB"); 
        var title = document.createElement("h4");
        title.innerText = name; 
        divInfoVotation.appendChild(title); 

        var linkgoog = document.createElement("h4");
        linkgoog.innerText = "Link votación"; 
        divInfoVotation.appendChild(linkgoog); 
        var lik = document.createElement("a");
        lik.title = "Google aswer";
        lik.href =  link; 
        lik.innerText = 'Link Votación'; 

        divInfoVotation.appendChild(lik); 
        var br = document.createElement("br");
        divInfoVotation.appendChild(br); 

        var linkres = document.createElement("h4");
        linkres.innerText = "Link respuestas"; 
        divInfoVotation.appendChild(linkres); 
        var r = document.createElement("a");
        r.title = "Google resp";
        r.href =  resp; 
        r.innerText = 'Link respuestas'; 
        divInfoVotation.appendChild(r); 
        
        {/* <input type="submit" value="Borrar" onclick="LOGIC.idChangeToDelate(this)">  */}
        var sub = document.createElement("input");
        sub.setAttribute("type", "submit");
        sub.setAttribute("value", "Eliminar");
        sub.setAttribute("onclick", "LOGIC.idChangeToDelate(this)");
        sub.setAttribute("name", "submit"+id);
        
        divInfoVotation.appendChild(br); 
        divInfoVotation.appendChild(sub); 

    }, 
    removeChildOverlay: function()
    {
        var divInfoVotation = document.querySelector("#InfoVotacionDB"); 

        while (divInfoVotation.firstChild) {
            divInfoVotation.removeChild(divInfoVotation.lastChild);
            }
    }, 
    loadFile: function(event)
    {
        var imageShowDOM= document.querySelector("#ShowImageUpload");
        
        imageShowDOM.src = URL.createObjectURL(event.target.files[0]);
    }, 
    //Opciones de categoria e imagen 
    selection2Value: function(selection)
    {
        if (selection.value == "SubirImagen") {
            var inputImage = document.createElement("input");
            inputImage.setAttribute("type","url");
            inputImage.setAttribute("class", "imagenUpload");
            inputImage.setAttribute("pattern", "https://.*");
            inputImage.setAttribute("placeholder", "https://imagen.png");
            inputImage.setAttribute("name", "imagen");
            var labelimage = document.createElement("label");
            labelimage.innerText= "Link imagen:"; 
            labelimage.setAttribute("class", "imagenUploadLabel");

            labelimage.appendChild(inputImage); 
            //var imageDiv = document.querySelector(".ImageOption"); 
            var imageDiv2 = document.querySelector(".ImageOption2"); 
            
           
            imageDiv2.appendChild(labelimage);
            for(var i=0; i< CORE.DicEvents.length; i++){
                if(CORE.DicEvents[i].id == CORE.idEdit)
                {
                    if(document.querySelector(".ImageOption2 .imagenUpload"))
                        document.querySelector(".ImageOption2 .imagenUpload").value = CORE.DicEvents[i].image;
                }
            }
            // if(imageDiv2)
            //     imageDiv2.appendChild(labelimage);
        }
        else{
            var imageDiv = document.querySelector(".ImageOption2"); 
            while (imageDiv.firstChild)
                imageDiv.removeChild(imageDiv.lastChild);
            GFX.imageForCategory(selection.value); 
            
        }
    },
    selectionValue: function(selection)
    {
        // if (selection.value == "SubirImagen") {
           
        //     var inputImage = document.createElement("input");
        //     inputImage.setAttribute("type","file");
        //     inputImage.setAttribute("id", "imagenUpload");
        //     inputImage.setAttribute("name", "imagen");
        //     inputImage.setAttribute("accept", "image/png, image/jpeg, image/jpg");
        //     inputImage.setAttribute("onchange", "GFX.loadFile(event)");

        //     var labelimage = document.createElement("label");
        //     labelimage.innerText= "Imagen:"; 
        //     labelimage.appendChild(inputImage); 
        //     labelimage.appendChild(inputImage); 

        //     var buttonImage = document.createElement("button");
        //     buttonImage.setAttribute("onclick", "UploadImage()");
        //     buttonImage.innerText= "Subir Imagen"; 
            
        //     var infoProcess = document.createElement("div");
        //     infoProcess.setAttribute("id", "UploadImageProcess");
        //     infoProcess.innerText= "No subida la imagen"
            
        //     var imageshow = document.createElement("img");
        //     imageshow.setAttribute("id", "ShowImageUpload");
        //     imageshow.setAttribute("style", "width: 50%; height: 50%; margin-left: 25%;");

        //     var imageDiv = document.querySelector("#ImageOption"); 
        //     imageDiv.appendChild(labelimage); 
        //     imageDiv.appendChild(buttonImage); 
        //     imageDiv.appendChild(imageshow); 
        //     imageDiv.appendChild(infoProcess); 
              
        // }
        if (selection.value == "SubirImagen") {
            var inputImage = document.createElement("input");
            inputImage.setAttribute("type","url");
            inputImage.setAttribute("class", "imagenUpload");
            inputImage.setAttribute("pattern", "https://.*");
            inputImage.setAttribute("placeholder", "https://imagen.png");
            inputImage.setAttribute("name", "imagen");
            var labelimage = document.createElement("label");
            labelimage.innerText= "Link imagen:"; 
            labelimage.setAttribute("class", "imagenUploadLabel");

            labelimage.appendChild(inputImage); 
            var imageDiv = document.querySelector(".ImageOption"); 
            imageDiv.appendChild(labelimage);
            // if(imageDiv2)
            //     imageDiv2.appendChild(labelimage);
        }
        else{
            var imageDiv = document.querySelector(".ImageOption"); 
            while (imageDiv.firstChild)
                imageDiv.removeChild(imageDiv.lastChild);
            GFX.imageForCategory(selection.value); 
            
        }
            
    }, 
    imageForCategory:function(selection)
    {
        if(selection == "1") //Senderismo ----------------
                CORE.imageUploadURL = 'img/naturaleza.png'; 
            if(selection == "2") //girls-bcn
                CORE.imageUploadURL = ""; 
            if(selection == "3") //Bar FIESTA ---------------------
                CORE.imageUploadURL = 'img/fiesta.png'; 
            if(selection == "4") //Cultura --------
                CORE.imageUploadURL = 'img/cultura.png'; 
            if(selection == "5") //Gastronomia ---------------
                CORE.imageUploadURL = 'img/comida.png'; 
            if(selection == "6") //Deporte ------------------
                CORE.imageUploadURL = 'img/deporte.png'; 
            if(selection == "7") //Cine  ------------------------
                CORE.imageUploadURL = 'img/cinemas.png'; 
            if(selection == "8") //Juegos --------------------
                CORE.imageUploadURL = 'img/juego.png'; 
            return CORE.imageUploadURL; 
    },
    //Click calendar hidden events
    hiddenEvents: function(dateclick)
    {
        for(var i=0; i< CORE.DicEvents.length; i++)
        {
            var EventDiv = document.querySelector("#Evento"+CORE.DicEvents[i].id);  
            var mydate = new Date(CORE.DicEvents[i].date); 
            var myDateStirng = LOGIC.DatetoString(mydate); 
            var dateFin = new Date(CORE.DicEvents[i].dateFin); 
            dateFin = new Date(dateFin.getTime() + (1000 * 60 * 60 * 24));
            dateFin = LOGIC.DatetoString(dateFin); 
            if(CORE.DicEvents[i].date != dateclick)
            {
                EventDiv.style.display = "none";
                while(dateFin > myDateStirng && dateclick >= myDateStirng){
                    EventDiv.style.display = "none";
                    if(myDateStirng == dateclick){
                        EventDiv.style.display = "";
                        break; 
                    }
                    mydate = new Date(mydate.getTime() + (1000 * 60 * 60 * 24));
                    myDateStirng = LOGIC.DatetoString(mydate); 
                }
            }
            else{
                EventDiv.style.display = "";
                
            }
            
            
        }

    }, 
    seeAllEvents:function()
    {
        for(var i=0; i< CORE.DicEvents.length; i++)
        {
            var EventDiv = document.querySelector("#Evento"+CORE.DicEvents[i].id); 
            EventDiv.style.display = "";
        }
    },
    printOut: function(str) {
        var i = 0;
        var timePerLetter = 200,
        text = document.createTextNode('');
        document.getElementById('test').appendChild(text);
        (function main() {
          var char = str[i++];
          
          text.nodeValue += char;
          if(i < str.length){
            setTimeout(main, timePerLetter);
            
          }
          else
          {
            // text.nodeValue = ' ';
            text.nodeValue  = text.nodeValue .substring(1); 
            
            i=0;
            setTimeout(main, timePerLetter);
            
          }
          if(text.nodeValue.length > 20 ){
            text.nodeValue  = text.nodeValue .substring(1); 
            
          }
        
        })();
      }
    
}


CORE.modules.push(GFX); 
