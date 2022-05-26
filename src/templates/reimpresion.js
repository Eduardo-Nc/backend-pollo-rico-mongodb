module.exports = (compras) => {

    const moment = require('moment');
    moment.locale('es');


    return `

<!DOCTYPE html>
<html lang="es-MX">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
     <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <title>Ticket</title>
      <style>
      
      .content-pdf-main{
        margin:0;
        padding:0;
        box-sizing: border-box;
        display: flex;
        justify-content:center;
        align-items:center;
    }
    
    
    .content-all-pdf{
        display:flex;
        flex-flow: column nowrap;
        width: 100%;
        text-transform: capitalize;
        font-weight: normal;
    }
    
    .encabezado{
        display:flex;
        width: 100%;
        flex-flow: column nowrap;
        justify-content:center;
        align-items:center;
        text-align: center;
        margin:0px;
        padding:0px;
    }
    
    .content-detalle-corte > table {
        width: 100%;
        align-items:center;
        text-align: center;
    }
    
    #nom{
        border-bottom:1px dashed black;
        width: 100%;
        margin-bottom: 6px;
    }
    
    .encabezado h2{
        padding:5px;
        font-weight: bold;
        font-size: 25px;
        width: 25%;
        color:black; 
        text-align: center; 
    }
    
    
    #dvendedor{
        font-weight: normal;
        font-size: 16px;
        width: 100%;
        color:black;
        text-align: center; 
        margin:0px;
        padding:0px;
        padding-top: 20px;
    }
    
    #folio-pdf{
        font-weight: normal;
        font-size: 16px;
        width: 100%;
        color:black;
        text-align: center; 
        margin:0px;
        padding:0px;
    }
    
    #tel{
        font-weight: normal;
        font-size: 16px;
        width: 100%;
        color:black;
        text-align: center; 
        margin:0px;
        padding:0px;
    }
    
    #direc{
        font-weight: normal;
        font-size: 16px;
        width: 100%;
        color:black;
        text-align: center; 
        margin:0px;
        padding:0px;
    }
    
    #fecha{
        font-weight: normal;
        font-size: 16px;
        width: 100%;
        color:black;
        text-align: center; 
        margin:0px;
        padding:0px;
        border-bottom:1px dashed black;
        padding-bottom: 20px;
    }
    
    
    .encabezado #fcorte{
        font-weight: normal;
        font-size: 15px;
        width: 100%;
        color:black;
        /* color:#dd4b39; */
        text-align: center; 
    }
    
    .content-detalle-corte{
        display:flex;
        flex-flow: column nowrap;
        overflow: hidden;
        width: 100%;
       
    }
    
    .content-description{
        display:flex;
        justify-content:center;
        flex-flow: row nowrap;
        overflow: hidden;
        width: 100%;
        border-bottom:1px  dashed  black;
        font-size: 13px;
        padding-bottom: 20px;
    }
    
    
    .content-data{
        margin-top: 6px;
        display:flex;
        align-items: center;
        text-align: center;
        justify-content:center;
        flex-flow: row nowrap;
        overflow: hidden;
        width: 100%;
        font-size: 11px;
    }
    
    .cant{
        display:flex;
        align-items: center;
        text-align: center;
        justify-content:center;
        flex-flow: row nowrap;
        overflow: hidden;
        width: 100%;
    }
    
    .nom_p{
        display:flex;
        align-items: center;
        text-align: center;
        justify-content:center;
        flex-flow: row nowrap;
        overflow: hidden;
        width: 100%;
    }
    
    .precio{
        display:flex;
        align-items: center;
        text-align: center;
        justify-content:center;
        flex-flow: row nowrap;
        overflow: hidden;
        width: 100%;
    }
    
    .content-total{
        margin-top: 20px;
        display:flex;
        align-items: right;
        text-align: right;
        justify-content:flex-end;
        flex-flow: row nowrap;
        overflow: hidden;
        width: 100%;
        font-size: 22px;
    }
    
    .content-folio-footer{
        width: 100%;
        margin-top: 30px;
        display:flex;
        align-items:center;
        text-align: center;
        justify-content:center;
        flex-flow: column nowrap;
        overflow: hidden;
        width: 100%;
        font-size: 18px;
    }
    
    .img-ticket{
        margin-top:10px;
        width: 100%;
        height: 100%;

    }

    .img-ticket img{
        width: 100%;
        height: 100%;
    }

    #separador1{
        border-bottom:1px dashed black;
        width: 100%;
   
    }


      </style>
   </head>
   <body>
   <div class="content-pdf-main">

   <div class="content-all-pdf">

       <div class="encabezado">
            <h2 id="nom">El Pollo Rico "${compras[0].nombre_sucursal}"</h2>
            <h2 id="folio-pdf">Folio: ${compras[0].folio}</h2>
            <h2 id="tel">Telefóno: ${compras[0].numero_tel}</h2>
            <h2 id="direc">Dirección: ${compras[0].direccion}</h2>
            <h2 id="tel">RFC:CANJ570416953</h2>
            <h2 id="fecha">Fecha: ${moment(new Date(compras[0].fecha_venta)).format('YYYY-MM-DD HH:mm:ss A')}</h2>
       </div>

           <div class="content-detalle-corte">


           <table>
           <tr>
               <th>Cant</th>
               <th>Descripción</th>
               <th>Precio</th>
           </tr>
           ${compras.map(element =>
        `<tr>
               <td>${element.cantidad}</td>
               <td>${element.nombre_producto}</td>
               <td>$${element.cantidad * element.precio}.00</td>
           </tr>`
    )}
       </table>
               
               <div class="content-total">
                   
                   <div>Total: $${compras[0].total_venta}.00</div>
                   <div>Efectivo: $${compras[0].efectivo}.00</div>
                   <div>Cambio: $${compras[0].cambio}.00</div>

               </div>

           </div>
       <div class="content-folio-footer">
       <div>${compras[0].nota}</div>
                   <div>Gracias por su visita, vuelva pronto.</div>
                   <div>Síguenos fb/elpollorico</div>
                  
                   <br></br>
                   <div>******Reimpresión******</div>

       </div>

   </div>
</div>
   


   </body>
</html>




`;
};