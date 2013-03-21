		/* Creado por David De La Hoz */
		$(document).ready(function()
		{
			
			var sisetab = 1;
			var autolgn = 1;
			cargar_datos();
			function cargar_datos()
			{
				var usrnm = localStorage["pucmm_usrnm"];
				var psswrd = localStorage["pucmm_psswrd"];
				if(localStorage["pucmm_sisetab"] >=0)
				{
					sisetab = localStorage["pucmm_sisetab"];

				}
				
				if(localStorage["pucmm_autolgn"] >=0)
				{
					autolgn = localStorage["pucmm_autolgn"];
				}
				if(usrnm != "" && psswrd != "" &&  usrnm != "undefined" && psswrd != "undefined")
				{
					$("#username").val(usrnm);
					$("#password").val(psswrd);						
					return true;
				}
				else
				{
					$("#username").val("");
					$("#password").val("");	
					return false;
				}
			}
			
			function title(tit)
			{
				return chrome.browserAction.setTitle({title:tit});
			}

			function doConnect(redirect)
			{
							chrome.browserAction.setIcon({path: "images/icons_color/icon_yellow.png"});
			title("Conectando....");
			if(!cargar_datos())
			{
				
				chrome.browserAction.setIcon({path: "images/icons_color/icon_red.png"});
				title("No se ha especificado Usuario o Contraseña.");
				chrome.tabs.create({url: "options.html"});
				return false;
			}
			else
			{
			
				$form = $('#form_login');
				
					$.post($form.attr("action"), $form.serialize(),
						function(data, status){	
					
						var statusCode = data.match(/statusCode=([0-9]+)/);
						if(statusCode == null || statusCode[1]== 1)
						{
							if(statusCode == null)
							{
								chrome.browserAction.setIcon({path: "images/ok.png"});
								setTimeout ( function(){
											chrome.browserAction.setIcon({path: "images/icons_color/icon_green.png"});
								}, 1000 * 4);
							}
							else
							{
								chrome.browserAction.setIcon({path: "images/icons_color/icon_green.png"});
							}
							
							title("Conectado!");
							
							
						}
						else if(statusCode[1]== 5)
						{
							var err = "ERROR: Usuario o Contraseña invalidos";
							title(err);
							chrome.browserAction.setIcon({path: "images/icons_color/icon_red.png"});
							chrome.tabs.create({url: "options.html"});
							alert(err);
							return false;
						}
					}).fail(function() {
						chrome.browserAction.setIcon({path: "images/icons_color/icon_red.png"}); 
						title("No se pudo establecer conexion con el servidor.");
						return false;
					});
				
				
			}	
			return true;
			}
			
			function displayDiv(e)
			{
				chrome.tabs.executeScript(e.tabId,
                           {code:"document.getElementById(\"ctl00_MsgError\").style.display=\"none\"; 			document.getElementById(\"menus\").style.display=\"block\";  document.getElementById(\"ctl00_Contenido\").style.display=\"block\";"});	
			}
			
			if(parseInt(autolgn) > 0)
			{
				chrome.webNavigation.onCommitted.addListener(function(e) {
						doConnect(true);
					}, {url: [{hostSuffix: 'stwlan.priv'}]});
			}
		
			if(parseInt(sisetab) > 0)
			{
				chrome.webNavigation.onDOMContentLoaded.addListener(function(e) {
					 displayDiv(e);
				}, {url: [{hostSuffix: 'pucmmsti.edu.do'}]});
				
				chrome.webNavigation.onCompleted.addListener(function(e) {
					 displayDiv(e);
				}, {url: [{hostSuffix: 'pucmmsti.edu.do'}]});
			}
		
		chrome.browserAction.onClicked.addListener(function(tab) {
				doConnect(false);
			});
			
	});