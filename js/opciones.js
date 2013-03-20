	/* Creado por David De La Hoz */
	var usrnm = "";
	var psswrd = "";
		
	$(document).ready(function(){

			usrnm = localStorage["pucmm_usrnm"];
			psswrd = localStorage["pucmm_psswrd"];
			$("#username").val(usrnm);
			$("#password").val(psswrd);
			
		function save_opt(usrnm,psswrd) {
			localStorage["pucmm_usrnm"] = usrnm;
			localStorage["pucmm_psswrd"] = psswrd;
		};
		
		$("#btnSubmit").click(function(){
			
			if($("#username").val() && $("#password").val())
			{
				save_opt($("#username").val(),$("#password").val());
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