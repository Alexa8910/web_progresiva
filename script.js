if('serviceWorker' in navigator)
{
	navigator.serviceWorker.register("js/sw.js")
	.then(reg=>console.log("Registro de SW exitoso",reg))
	.catch(err=>console.warn("Error al tratar de registrar SW",err))
}