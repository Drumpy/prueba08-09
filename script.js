const AUTOS = 'https://ferqueve.github.io/autorizo/automoviles.json';
const PROPIETARIOS = 'https://ferqueve.github.io/autorizo/propietarios.json';

var getJSONData = function (url) {
	var result = {};
	return fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw Error(response.statusText);
			}
		})
		.then(function (response) {
			result.status = "ok";
			result.data = response;
			return result;
		})
		.catch(function (error) {
			result.status = "error";
			result.data = error;
			return result;
		});
};

document.addEventListener("DOMContentLoaded", function (e) {

	const contenidoDOM = document.getElementById("contenido");

	getJSONData(PROPIETARIOS).then(function (resultObj) {
		if (resultObj.status === "ok") {
			let propietarios = resultObj.data;

			getJSONData(AUTOS).then(function (resultObj) {
				if (resultObj.status === "ok") {
					let autos = resultObj.data;

					// for (let propietario of propietarios) {
					// 	contenidoDOM.innerHTML += `<br><b>${propietario.nombre}</b>`
					// 	for (let auto of autos) {
					// 		if (propietario.id === auto.idprop) {
					// 			contenidoDOM.innerHTML += `<br><code>${auto.marca} ${auto.modelo} ${auto.anio}</code>`
					// 		}
					// 	}
					// };

					propietarios.forEach((propietario) => {
						contenidoDOM.innerHTML += `<b>${propietario.nombre} ${propietario.apellido}</b>`;

						autos.forEach((auto) => {
							if (propietario.id === auto.idprop) {
								contenidoDOM.innerHTML += `<code>${auto.marca} ${auto.modelo} ${auto.anio}</code>`;
							}
						});
					});
				}
			});
		}
	});
});