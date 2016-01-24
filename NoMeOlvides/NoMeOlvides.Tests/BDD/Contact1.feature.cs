﻿// ------------------------------------------------------------------------------
//  <auto-generated>
//      This code was generated by SpecFlow (http://www.specflow.org/).
//      SpecFlow Version:1.9.0.77
//      SpecFlow Generator Version:1.9.0.0
//      Runtime Version:4.0.30319.42000
// 
//      Changes to this file may cause incorrect behavior and will be lost if
//      the code is regenerated.
//  </auto-generated>
// ------------------------------------------------------------------------------
#region Designer generated code
#pragma warning disable
namespace NoMeOlvides.Tests.BDD
{
    using TechTalk.SpecFlow;
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("TechTalk.SpecFlow", "1.9.0.77")]
    [System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [NUnit.Framework.TestFixtureAttribute()]
    [NUnit.Framework.DescriptionAttribute("Contact")]
    public partial class ContactFeature
    {
        
        private static TechTalk.SpecFlow.ITestRunner testRunner;
        
#line 1 "Contact.feature"
#line hidden
        
        [NUnit.Framework.TestFixtureSetUpAttribute()]
        public virtual void FeatureSetup()
        {
            testRunner = TechTalk.SpecFlow.TestRunnerManager.GetTestRunner();
            TechTalk.SpecFlow.FeatureInfo featureInfo = new TechTalk.SpecFlow.FeatureInfo(new System.Globalization.CultureInfo("en-US"), "Contact", "Como Usuario\r\nQuiero administrar mi cuenta de usuario\r\nPara poder tener mis datos" +
                    " actualizados", ProgrammingLanguage.CSharp, ((string[])(null)));
            testRunner.OnFeatureStart(featureInfo);
        }
        
        [NUnit.Framework.TestFixtureTearDownAttribute()]
        public virtual void FeatureTearDown()
        {
            testRunner.OnFeatureEnd();
            testRunner = null;
        }
        
        [NUnit.Framework.SetUpAttribute()]
        public virtual void TestInitialize()
        {
        }
        
        [NUnit.Framework.TearDownAttribute()]
        public virtual void ScenarioTearDown()
        {
            testRunner.OnScenarioEnd();
        }
        
        public virtual void ScenarioSetup(TechTalk.SpecFlow.ScenarioInfo scenarioInfo)
        {
            testRunner.OnScenarioStart(scenarioInfo);
        }
        
        public virtual void ScenarioCleanup()
        {
            testRunner.CollectScenarioErrors();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Alta de contaco")]
        [NUnit.Framework.CategoryAttribute("AltaContacto")]
        public virtual void AltaDeContaco()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Alta de contaco", new string[] {
                        "AltaContacto"});
#line 9
this.ScenarioSetup(scenarioInfo);
#line 10
 testRunner.Given("email \'maxiunlm@gmail.com\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 11
 testRunner.And("password \'123456\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 12
 testRunner.When("presiono el boton Aceptar", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 13
 testRunner.Then("el sistema da de alta al nuevo contacto", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Alta de contaco pre existente")]
        [NUnit.Framework.CategoryAttribute("AltaContacto")]
        public virtual void AltaDeContacoPreExistente()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Alta de contaco pre existente", new string[] {
                        "AltaContacto"});
#line 16
this.ScenarioSetup(scenarioInfo);
#line 17
 testRunner.Given("email de usuario pre existente\'a@a.com\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 18
 testRunner.And("password \'654321\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 19
 testRunner.When("presiono el boton Aceptar habiendo un usuario pre existente", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 20
 testRunner.Then("el sistema arroja exepcion controlada de usuario pre existente", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Obtener la lista de contactos")]
        [NUnit.Framework.CategoryAttribute("ListContacts")]
        public virtual void ObtenerLaListaDeContactos()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Obtener la lista de contactos", new string[] {
                        "ListContacts"});
#line 24
this.ScenarioSetup(scenarioInfo);
#line 25
 testRunner.Given("Id de contacto", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 26
 testRunner.When("el Usuario ingresa a la pantalla de contactos", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 27
 testRunner.Then("el Sistema carga la lista completa de contactos", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Obtener un Contacto por e-mail para consultas internas del sistema")]
        [NUnit.Framework.CategoryAttribute("ObtenerContacto")]
        public virtual void ObtenerUnContactoPorE_MailParaConsultasInternasDelSistema()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Obtener un Contacto por e-mail para consultas internas del sistema", new string[] {
                        "ObtenerContacto"});
#line 31
this.ScenarioSetup(scenarioInfo);
#line 32
 testRunner.Given("email \'maxiunlm@gmail.com\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 33
 testRunner.When("el sistema necesita un contacto por su e-mail", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 34
 testRunner.Then("el sistema obetiene el contacto", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Obtener un Contacto por Id")]
        [NUnit.Framework.CategoryAttribute("ObtenerContacto")]
        public virtual void ObtenerUnContactoPorId()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Obtener un Contacto por Id", new string[] {
                        "ObtenerContacto"});
#line 37
this.ScenarioSetup(scenarioInfo);
#line 38
 testRunner.Given("email \'maxiunlm@gmail.com\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 39
 testRunner.And("Id de contacto", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 40
 testRunner.When("el sistema necesita un contacto por su Id", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 41
 testRunner.Then("el sistema obetiene el contacto", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Modifica los datos de un Contacto")]
        [NUnit.Framework.CategoryAttribute("ModificarContacto")]
        public virtual void ModificaLosDatosDeUnContacto()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Modifica los datos de un Contacto", new string[] {
                        "ModificarContacto"});
#line 46
this.ScenarioSetup(scenarioInfo);
#line 47
 testRunner.Given("email \'a@a.com\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 48
 testRunner.And("Id de contacto", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 49
 testRunner.And("el nuevo email \'b@b.com\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 50
 testRunner.When("el usuario presiona el boton Aceptar de la Modificaicon", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 51
 testRunner.Then("el sistema guarda los cambios sel contacto", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Modifica los datos de un Contacto con un email en uso")]
        [NUnit.Framework.CategoryAttribute("ModificarContacto")]
        public virtual void ModificaLosDatosDeUnContactoConUnEmailEnUso()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Modifica los datos de un Contacto con un email en uso", new string[] {
                        "ModificarContacto"});
#line 54
this.ScenarioSetup(scenarioInfo);
#line 55
 testRunner.Given("email de usuario pre existente\'a@a.com\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 56
 testRunner.And("email de usuario pre existente\'b@b.com\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 57
 testRunner.And("Id de contacto habiendo un usuario pre existente para el nuevo email", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 58
 testRunner.And("el nuevo email \'a@a.com\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "And ");
#line 59
 testRunner.When("el usuario presiona el boton Aceptar de la Modificaicon habiendo un usuario pre e" +
                    "xistente", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 60
 testRunner.Then("el sistema arroja exepcion controlada de usuario pre existente", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Eliminar un Contacto")]
        [NUnit.Framework.CategoryAttribute("EliminarContacto")]
        public virtual void EliminarUnContacto()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Eliminar un Contacto", new string[] {
                        "EliminarContacto"});
#line 65
this.ScenarioSetup(scenarioInfo);
#line 66
 testRunner.Given("Id de contacto", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 67
 testRunner.When("el usuario presiona el boton Aceptar de la Baja", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 68
 testRunner.Then("el sistema elimina al contacto", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Buscar los Contactos de un Contacto determinado sin Filtros de busqueda")]
        [NUnit.Framework.CategoryAttribute("SearchContacts")]
        public virtual void BuscarLosContactosDeUnContactoDeterminadoSinFiltrosDeBusqueda()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Buscar los Contactos de un Contacto determinado sin Filtros de busqueda", new string[] {
                        "SearchContacts"});
#line 71
this.ScenarioSetup(scenarioInfo);
#line 72
 testRunner.Given("Id de contacto", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 73
 testRunner.When("el usuario presiona el boton de Busqueda", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 74
 testRunner.Then("el Sistema carga la lista completa de contactos", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
        
        [NUnit.Framework.TestAttribute()]
        [NUnit.Framework.DescriptionAttribute("Buscar los Contactos de un Contacto determinado con todos los Filtros de busqueda" +
            "")]
        [NUnit.Framework.CategoryAttribute("SearchContacts")]
        public virtual void BuscarLosContactosDeUnContactoDeterminadoConTodosLosFiltrosDeBusqueda()
        {
            TechTalk.SpecFlow.ScenarioInfo scenarioInfo = new TechTalk.SpecFlow.ScenarioInfo("Buscar los Contactos de un Contacto determinado con todos los Filtros de busqueda" +
                    "", new string[] {
                        "SearchContacts"});
#line 77
this.ScenarioSetup(scenarioInfo);
#line 78
 testRunner.Given("Id de contacto", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 79
 testRunner.Given("email \'a@a.com\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 80
 testRunner.Given("alias \'Pepe\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 81
 testRunner.Given("name \'Jose\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 82
 testRunner.Given("surname \'Perez\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 83
 testRunner.Given("phone \'1234\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 84
 testRunner.Given("cellphone \'12345\'", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Given ");
#line 85
 testRunner.When("el usuario presiona el boton de Busqueda con filtros", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "When ");
#line 86
 testRunner.Then("lista de sus contactos los contactos que corresponden a la busqueda", ((string)(null)), ((TechTalk.SpecFlow.Table)(null)), "Then ");
#line hidden
            this.ScenarioCleanup();
        }
    }
}
#pragma warning restore
#endregion