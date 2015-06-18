Feature: Contact
	Como Usuario
	Quiero administrar mi cuenta de usuario
	Para poder tener mis datos actualizados
	


@AltaContacto
Scenario: Alta de contaco
	Given email 'maxiunlm@gmail.com'
	And password '123456'
	When presiono el boton Aceptar
	Then el sistema da de alta al nuevo contacto

@AltaContacto
Scenario: Alta de contaco pre existente
	Given email de usuario pre existente'a@a.com'
	And password '654321'
	When presiono el boton Aceptar habiendo un usuario pre existente
	Then el sistema arroja exepcion controlada de usuario pre existente



@ObtenerContacto
Scenario: Obtener la lista de contactos
	When el Usuario ingresa a la pantalla de contactos
	Then el Sistema carga la lista completa de contactos

@ObtenerContacto
Scenario: Obtener un Contacto por e-mail para consultas internas del sistema
	Given email 'maxiunlm@gmail.com'
	When el sistema necesita un contacto por su e-mail
	Then el sistema obetiene el contacto

@ObtenerContacto
Scenario: Obtener un Contacto por Id
	Given email 'maxiunlm@gmail.com'
	And Id de contacto
	When el sistema necesita un contacto por su Id
	Then el sistema obetiene el contacto



@ModificarContacto
Scenario: Modifica los datos de un Contacto
	Given email 'a@a.com'
	And Id de contacto
	And  el nuevo email 'b@b.com'
	When el usuario presiona el boton Aceptar de la Modificaicon
	Then el sistema guarda los cambios sel contacto
	
@ModificarContacto
Scenario: Modifica los datos de un Contacto con un email en uso
	Given email de usuario pre existente'a@a.com'
	And email de usuario pre existente'b@b.com'
	And Id de contacto habiendo un usuario pre existente para el nuevo email
	And el nuevo email 'a@a.com'
	When el usuario presiona el boton Aceptar de la Modificaicon habiendo un usuario pre existente
	Then el sistema arroja exepcion controlada de usuario pre existente



@EliminarContacto
Scenario: Eliminar un Contacto
	Given Id de contacto
	When el usuario presiona el boton Aceptar de la Baja
	Then el sistema elimina al contacto
