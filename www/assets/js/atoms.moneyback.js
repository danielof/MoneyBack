/**
 * moneyback - App de registro de deudas y pagos pendientes
 * @version v1.0.0
 * @link    http://tapquo.com
 * @author   ()
 * @license MIT
 */
(function(){"use strict";var extend=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child},hasProp={}.hasOwnProperty,slice=[].slice;__.Entity.Persona=function(superClass){function Persona(){return Persona.__super__.constructor.apply(this,arguments)}return extend(Persona,superClass),Persona.fields("name","debo","debe","created_at"),Persona.createOrUpdate=function(attributes){var entity;return entity=Persona.findBy("name",attributes.name),null!=entity?entity.updateAttributes(attributes):Persona.create(attributes)},Persona.prototype.parse=function(){return{text:this.name,description:"Me Debe: "+this.debe+" - Le Debo "+this.debo,info:this.created_at}},Persona}(Atoms.Class.Entity),Atoms.Atom.Title=function(superClass){function Title(){return Title.__super__.constructor.apply(this,arguments)}return extend(Title,superClass),Title["extends"]=!0,Title.events=["change"],Title.prototype.value=function(value){return null!=value?this.el.text(value):this.el.val()},Title}(Atoms.Atom.Label),Atoms.Organism.Inicio=function(superClass){function Inicio(){return Inicio.__super__.constructor.apply(this,arguments)}return extend(Inicio,superClass),Inicio.scaffold("assets/scaffold/inicio.json"),Inicio.prototype.onButtonTouch=function(){var dispatcher,event,hierarchy;event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?slice.call(arguments,2):[]},Inicio.prototype.fetch=function(){return __.proxy("GET","persona").then(function(error,value){var i,len,persona,ref,results;for(ref=value.personas||[],results=[],i=0,len=ref.length;len>i;i++)persona=ref[i],results.push(__.Entity.Persona.createOrUpdate(persona));return results})},Inicio.prototype.addPerson=function(){var dispatcher,event,hierarchy;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?slice.call(arguments,2):[],this["new"].newpersonform.clean(),Atoms.Url.path("inicio/new")},Inicio.prototype.onSelectPersona=function(){var dispatcher,event,hierarchy,personaName;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?slice.call(arguments,2):[],personaName=dispatcher.attributes.text,__.proxy("GET","persona").then(function(error,value){var i,len,persona,ref,results;for(ref=value.personas||[],results=[],i=0,len=ref.length;len>i;i++)persona=ref[i],results.push(persona.name===personaName?__.Dialog.Persona.show(persona):void 0);return results})},Inicio.prototype.cargarDatosPersona=function(persona){return this.persona.personaForm.name.value(persona.name),this.persona.personaForm.debeLabel.value(persona.debe),this.persona.personaForm.deboLabel.value(persona.debo)},Inicio.prototype.onSearchChange=function(){var dispatcher,event,hierarchy,persona;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?slice.call(arguments,2):[],persona=dispatcher.value(),persona?this.personas.personas.select(function(entity){return entity.name.match(persona)?entity:void 0}):this.personas.personas.all()},Inicio.prototype.onSearchSubmit=function(){var dispatcher,event,hierarchy;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?slice.call(arguments,2):[],console.log(this.list.personas),this.personas.personas.findBy("name",dispatcher.value())},Inicio.prototype.onFormSubmit=function(){var dispatcher,event,hierarchy;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?slice.call(arguments,2):[],"personaForm"===dispatcher.attributes.id?__.proxy("PUT","persona",dispatcher.value()).then(function(error,value){return value?Atoms.Url.path("inicio/personas"):void 0}):__.proxy("POST","persona",dispatcher.value()).then(function(error,value){return value?(__.Entity.Persona.create(value.persona),Atoms.Url.path("inicio/personas")):void 0})},Inicio}(Atoms.Organism.Article),new Atoms.Organism.Inicio,Atoms.Organism.Menu=function(superClass){function Menu(){return Menu.__super__.constructor.apply(this,arguments)}return extend(Menu,superClass),Menu.scaffold("assets/scaffold/menu.json"),Menu.prototype.onButtonTouch=function(){var dispatcher,event,hierarchy;event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?slice.call(arguments,2):[]},Menu.prototype.onInicioPressed=function(){var dispatcher,event,hierarchy;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?slice.call(arguments,2):[],Atoms.Url.path("inicio/personas")},Menu}(Atoms.Organism.Aside),new Atoms.Organism.Menu,Atoms.Organism.Persona=function(superClass){function Persona(){return Persona.__super__.constructor.apply(this,arguments)}return extend(Persona,superClass),Persona.scaffold("assets/scaffold/persona.json"),Persona.prototype.show=function(selected){return this.selected=selected,this.persona.personaForm.clean(),this.persona.personaForm.value(this.selected),Persona.__super__.show.apply(this,arguments)},Persona.prototype.onClose=function(){return this.hide(),!1},Persona.prototype.onDelete=function(){return __.proxy("DELETE","persona",this.selected).then(function(_this){return function(error,value){return value?(_this.hide(),__.Article.Inicio.fetch(),!0):void 0}}(this))},Persona.prototype.onFormSubmit=function(){var dispatcher,event,hierarchy;return event=arguments[0],dispatcher=arguments[1],hierarchy=3<=arguments.length?slice.call(arguments,2):[],"personaForm"===dispatcher.attributes.id?__.proxy("PUT","persona",dispatcher.value()).then(function(_this){return function(error,value){return value?(_this.hide(),__.Article.Inicio.fetch(),!0):void 0}}(this)):void 0},Persona}(Atoms.Organism.Dialog),new Atoms.Organism.Persona,Atoms.$(function(){return console.log("------------------------------------------------------------"),console.log("Atoms v"+Atoms.version+" (Atoms.App v"+Atoms.App.version+")"),console.log("------------------------------------------------------------"),Atoms.Url.path("inicio/personas"),__.Article.Inicio.fetch()}),__.proxy=function(type,method,parameters,background){var promise,token;return null==parameters&&(parameters={}),null==background&&(background=!1),promise=new Hope.Promise,background||__.Dialog.Loading.show(),token="undefined"!=typeof session&&null!==session?session.token:null,$$.ajax({url:"http://127.0.0.1:8888/api/"+method,type:type,data:parameters,contentType:"application/x-www-form-urlencoded",dataType:"json",headers:{Authorization:token},success:function(response){return background||__.Dialog.Loading.hide(),promise.done(null,response)},error:function(){return function(xhr,error){return background||__.Dialog.Loading.hide(),error={code:error.status,message:error.response},console.error("__.proxy [ERROR "+error.code+"]: "+error.message),promise.done(error,null)}}(this)}),promise}}).call(this);