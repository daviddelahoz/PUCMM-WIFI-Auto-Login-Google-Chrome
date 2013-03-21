	/* Creado por David De La Hoz */
	var usrnm = "";
	var psswrd = "";
	
	var sisetab = 1;
	var autolgn = 1;
		
	$(document).ready(function(){

			usrnm = localStorage["pucmm_usrnm"];
			psswrd = localStorage["pucmm_psswrd"];
			
			if(localStorage["pucmm_sisetab"] >=0)
			{
				sisetab = localStorage["pucmm_sisetab"];
			}
			
			if(localStorage["pucmm_autolgn"] >=0)
			{
				autolgn = localStorage["pucmm_autolgn"];
			}
			
			usrnm = localStorage["pucmm_usrnm"];
			psswrd = localStorage["pucmm_psswrd"];
			
			$("#username").val(usrnm);
			$("#password").val(psswrd);
			
			$('#cbxSise').prop('checked', parseInt(sisetab));
			$('#cbxAutoLogin').prop('checked', parseInt(autolgn));
			
		function save_opt(usrnm,psswrd, tab, atlogin) {
			localStorage["pucmm_usrnm"] = usrnm;
			localStorage["pucmm_psswrd"] = psswrd;
			localStorage["pucmm_sisetab"] = tab;
			localStorage["pucmm_autolgn"] = atlogin;
			
		};
		
		$("#btnSubmit").click(function(){
			
			if($("#username").val() && $("#password").val())
			{
				var _sise = 0;
				var _auto = 0;
				if ($('#cbxSise').is(':checked')) 
				{
					_sise = 1;
				}
				
				if ($('#cbxAutoLogin').is(':checked')) 
				{
					_auto = 1;
				}
				
				
				save_opt($("#username").val(),$("#password").val(), _sise,_auto);
				$("#status").html("<h2>Usuario & Contraseña Guardado Satisfactoriamente</h2>");
				$("#status").attr("style", "color:green; text-align:center;");
				$("#status").fadeTo(1);
				

				
			}
			else
			{
				$("#status").html("<h2>Ocurrio un error, existe algun campo vacio.</h2>");
				$("#status").attr("style", "color:red; text-align:center;");
				$("#status").fadeTo(1);

			}
			return false;
			
		});
		
	});