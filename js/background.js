		/* Creado por David De La Hoz */
		$(document).ready(function()
		{
			cargar_datos();

			function cargar_datos()
			{
				var usrnm = localStorage["pucmm_usrnm"];
				var psswrd = localStorage["pucmm_psswrd"];
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
			
		
		chrome.browserAction.onClicked.addListener(function(tab) {
			chrome.browserAction.setIcon({path: "images/icons_color/icon_yellow.png"});
			title("Conectando....");
			if(!cargar_datos())
			{
				
				chrome.browserAction.setIcon({path: "images/icons_color/icon_red.png"});
				title("No se ha especificado Usuario o Contraseña.");
				chrome.tabs.create({url: "options.html"});
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
						}
					}).fail(function() {
						chrome.browserAction.setIcon({path: "images/icons_color/icon_red.png"}); 
						title("No se pudo establecer conexion con el servidor.");
					});
				
				
			}	
			});
			
	});