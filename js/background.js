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
					return true;
				}
				else
				{
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
			
			var usrnm = localStorage["pucmm_usrnm"];
			var psswrd = localStorage["pucmm_psswrd"];
			var serialized = "username="+usrnm+"&password="+psswrd+"&buttonClicked=4&err_flag=0&err_msg=&info_flag=0&info_msg=&redirect_url=http%3A%2F%2Fgoogle.com.do%2F&acepto=on";
					$.post("https://stwlan.pucmm.edu.do/login.html", serialized,
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
                           {file:'js/cookies.js'});			   
			}
			
			if(parseInt(autolgn) > 0)
			{
				chrome.webNavigation.onCommitted.addListener(function(e) {
							if(doConnect(true))
							{
								chrome.tabs.update(e.tabId,	{url:"success.html"});
								setTimeout ( function(){
										chrome.tabs.remove(e.tabId, function(e){});
											}, 1000 * 4);
							}
						}, {url: [{hostSuffix: 'stwlan.pucmm.edu.do'}]});
			}
		
			if(parseInt(sisetab) > 0)
			{
				chrome.webNavigation.onDOMContentLoaded.addListener(function(e) {
					 displayDiv(e);
				}, {url: [{hostSuffix: 'pucmm.edu.do'}]});
				
				chrome.webNavigation.onCompleted.addListener(function(e) {
					 displayDiv(e);
				}, {url: [{hostSuffix: 'pucmm.edu.do'}]});
			}
		
		chrome.browserAction.onClicked.addListener(function(tab) {
				doConnect(false);
			});
			
	});