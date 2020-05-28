const CACHE_NAME="v1_cache_prueba",
urlsToCache=[
'./',
'style.css',
'script.js',
'img/imagen1.jpg',
'img/favicon_16.png',
'img/favicon_96.png'
]

// durante la fase de instalacion generalmente se almacena en cache los acitvos estaticos
self.addEventListener("install",evento=>{
	evento.waitUntil(caches.open(CACHE_NAME)
	.then(cache=>{
		return cache.addAll(urlsToCache)
		.then(()=>self.skipWaiting())
	})
	.catch(err=>console.log("Fallo registro de cache",err))
	)
	
})
//una vez que se instala SW se activa y busca los recursos para hacer que funcione sin conexion
self.addEventListener("active",evento=>{
	const cacheWhitelist=[CACHE_NAME]
	evento.waitUntil(
		caches.keys()
		.then(cachesNames=>{
			cacheNames.map(cacheName=>{
				//Eliminamos lo que ya no se necesita en cache
				if(cacheWhitelist.indexOf(cacheName)=== -1)	{
					return caches.delete(cacheName)
				}
			})
		})
		//le indica al SW activar el cache actual
		.then(()=>self.clients.claim())
	)
	
})
//cuando el navegador recupera una url
self.addEventListener("fetch",evento=>{
	//Responde ya sea con el objeto en cache o continuar y buscar la url real
	evento.respondWith(
		caches.match(evento.request)
		.then(res=>{
			if(res){
				// recuperando de la cache
				return res
			}
			//recupera de la peticion de la url
			return fetch(evento.request)
		})
	)
	
	
})