let productos = JSON.parse(localStorage.getItem('productos'));
if (!productos) {
  localStorage.setItem("productos", JSON.stringify([]));
}

const btG=document.querySelector("#guardar")
  btG.addEventListener('click', ()=>{
    agregarProducto();
  })



const agregarProducto = () => {
  productos = JSON.parse(localStorage.getItem('productos'));
  const nom = document.querySelector("#nombre").value;
  const can = document.querySelector("#cantidad").value;
  const pre = document.querySelector("#precio").value;
  const pro = document.querySelector("#proveedor").value;
  let id = document.querySelector("#id").value;
  if(nom.trim()===""||can.trim()===""||pre.trim()===""||pro.trim()===""){
    
    Swal.fire({
      icon: 'error',
      title: 'oops...',
      text:'falta rellenar espacios'
     })
    return;
    
  }
  if(id==""){
    id=uuid.v1();
    console.log(id)
    const producto = { id, nom, can, pre, pro};
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
    Swal.fire({
      title: 'se agrego correctamente',
      text: 'uwu',
      icon: 'success',
      confirmButtonColor: '#d33'
      })
    
    
    }else{
      const indice = productos.findIndex((item, indice)=>{
        if(item.id===id){
        return true;
        }
      })
      const producto = { id, nom, can, pre, pro};
      productos[indice]=producto;
      localStorage.setItem("productos", JSON.stringify(productos));
      Swal.fire({
      title: 'Edit',
      text: 'Se Edito Correctamente!!',
      icon: 'success',
      confirmButtonColor: '#d33'
      })
    }
  clean();
  listProductos();
}
const listProductos = () => {
  let productohtml = ``;
  let productos = JSON.parse(localStorage.getItem("productos"));
  productos.map(item => {
    productohtml += `
    <br>
    <div id=qw>
         <div id=a>
         
         ID ${item.id}
         </div>
         <div>
           <p id="a">Nombre:${item.nom}</p> <br>
         <p id="a">Cantidad: ${item.can}</p> <br>
         <p id="a">Precio: ${item.pre}</p> <br>
         <p id="a">Proveedor: ${item.pro}</p> <br>
           <button id="editar" onclick="editarProductos('${item.id}')"type="button" class="btn btn-info"><i class="bi bi-pen-fill"></i></button>
           <button id="borrar" onclick="borrar('${item.id}')" type="button" class="btn btn-danger" ><i class="bi bi-trash3-fill"></i></button>
         </div>
         </div>
         <br>
    `;
    document.querySelector("#a").innerHTML = productohtml;
  })
}
const clean=()=>{
  document.querySelector("#id").value="";
  document.querySelector("#formProducto").reset();
}
const btC = document.querySelector("#clean")
btC.addEventListener('click', () => {
  clean();
})

const borrar = (idEliminar) => {
  Swal.fire({
      title: 'Deseas eliminar?',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        let productos = JSON.parse (localStorage.getItem("productos"));
        const producto = productos.filter ((item) => item.id !== idEliminar);
        localStorage.setItem("productos", JSON.stringify(producto));
        listProductos();
      }
    })
}

const editarProductos = (idEditar) => {
  productos = JSON.parse(localStorage.getItem('productos'));
  var array = productos.filter(producto=>{return producto.id == idEditar
  });
  
  var producto = (array.length > 0) ? array[0]: null;
  document.querySelector("#nombre").value = producto.nom;
  document.querySelector("#cantidad").value = producto.can;
  document.querySelector("#precio").value = producto.pre;
  document.querySelector("#proveedor").value = producto.pro;
 
  document.querySelector("#id").value = producto.id;
}
