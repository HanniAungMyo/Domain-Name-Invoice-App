// // data
const products=[
    {
        id:1,
        name:"Domain",
        price:13,
    },
    {
        id:2,
        name:"Hosting",
        price:60,
    },
    {
        id:3,
        name:"Design Package",
        price:250,
    },
    {
        id:4,
        name:"Web Design",
        price:500,
    }
]

// // selector
const app=document.querySelector("#app")
const addRecord=document.querySelector("#addRecord")
const recordList=document.querySelector("#recordList")
const quantity=document.querySelector("#quantity")
const SelectProduct=document.querySelector('[name="product_id"]')
const costTotal=document.querySelector("#costTotal")
const manageProduct=document.querySelector("#manageProduct")
const manageProductBox=document.querySelector("#manageProductBox")
const closeBtn=document.querySelector("#closeBtn")
const serviceList=document.querySelector("#serviceList")
const addService=document.querySelector("#addService")
const print=document.querySelector("#Print")


// // function 
 const createOption=(content,value)=>{
 const option=document.createElement("option")
 option.innerText=content
 option.value=value
 return option;}
 // 
 
 const createRecordRow=(id,product,price,quantity)=>{
 const recordRow=document.createElement("tr")
 recordRow.classList.add("border-b-neutral-300", "border-b","group")
 recordRow.classList.add("record-row")
 recordRow.setAttribute("product-id",id)
 recordRow.innerHTML=`
 <td class="p-3 "></td>
 <td class="p-3 ">${product}</td>
 <td class="p-3 text-end record-row-price">${price}</td>
 <td class="p-3 text-end"> 
                            <button class="quantity-decrement bg-neutral-500 p-1 leading-3 opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 pointer-events-none">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                                  </svg>
                                  
                            </button>
                            <span   class="record-row-q">${quantity}</span>
                            <button class="quantity-increment bg-neutral-500 p-1 leading-3 opacity-0 group-hover:opacity-100  translate-x-6 group-hover:translate-x-0 duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 pointer-events-none">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                  </svg>
                                  
                            </button>
                        
                        
                        </td>
 <td class="p-3 text-end relative">
 <span class="record-row-cost">${price * quantity}</span>
 <button  class="record-row-del bg-neutral-600 text-white p-2 absolute group-hover:pointer-events-auto pointer-events-none right-0 translate-x-[120%] h-full duration-300 group-hover:opacity-100 opacity-0 top-0 aspect-square group-hover:translate-x-full flex items-center justify-center">
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 pointer-events-none">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

</button>
 </td>`
//  const recordRowDel=recordRow.querySelector(".record-row-del")
//  recordRowDel.addEventListener("click",recordRowDelHandler)
 return recordRow
 }

 

const recordRowQuantityIncrement=(productId,quantity=1)=>{
    const currentRecordRow=app.querySelector(`[product-id ='${productId}']`);
    const currentRecordQuantity=currentRecordRow.querySelector(".record-row-q")
    const currentRecordCost=currentRecordRow.querySelector(".record-row-cost")
    const currentRecordPrice=currentRecordRow.querySelector(".record-row-price")
    currentRecordQuantity.innerText =parseInt(currentRecordQuantity.innerText)+parseInt(quantity)
    currentRecordCost.innerText=currentRecordQuantity.innerText*currentRecordPrice.innerText
    recordTotal()
    
}
const recordRowQuantityDecrement=(event)=>{
    const currentRecordRow=event.target.closest(".record-row")
    const currentRecordQuantity=currentRecordRow.querySelector(".record-row-q")
    const currentRecordCost=currentRecordRow.querySelector(".record-row-cost")
    const currentRecordPrice=currentRecordRow.querySelector(".record-row-price")

    currentRecordQuantity.innerText =parseInt(currentRecordQuantity.innerText)-1
    currentRecordCost.innerText=currentRecordQuantity.innerText*currentRecordPrice.innerText
    recordTotal()

}


 
 const recordTotal=()=>{
 const  reocrdRowCost=document.querySelectorAll(".record-row-cost")
 let total=0;
 reocrdRowCost.forEach(el=>total+=parseFloat(el.innerText))
 costTotal.innerText=total;
    costTotal.innerText=[...app.querySelectorAll(".record-row-cost")].reduce((pv,cv)=>
        pv+parseFloat(cv.innerText),0)
}

const createServiceList=(id,name,price)=>{
    const service=document.createElement("div")
    service.innerHTML=`
    <div class="border-2 flex justify-between p-3 mb-3">
    <p class="text-lg font-bold">${name}</p>
    <p>$${price}</p>
</div>`;
return service;
}
// render
products.forEach(({name,id,price})=>{
    SelectProduct.append(new Option(name,id))
    serviceList.append(createServiceList(id,name,price))
})


// // handler
const printHandler=()=>{
    // ??
const rows =app.querySelectorAll(".record-row")
const data=[...rows].map(row=>{
    return {
        serviceId:parseInt(row.getAttribute("product-id")),
        quantity:parseInt(row.querySelector(".record-row-q").innerText),
        cost:parseFloat(row.querySelector(".record-row-cost").innerText)
    }
})
console.log({
    customer_name:"Kyaw Kyaw",
    timeStam:Date.now(),
    total:parseFloat(costTotal.innerText),
    data})
}
const addRecordHandler=(event)=>{
 event.preventDefault()
const formData=new FormData(addRecord)
const {id,name,price}=products.find((product)=>product.id==formData.get("product_id"))
const isExitedRow=[...app.querySelectorAll(`[product-id]`)].find(el=>{
  return  el.getAttribute("product-id") ==formData.get("product_id")
// console.log(el)
})
if(isExitedRow){
    recordRowQuantityIncrement(formData.get("product_id"),formData.get("quantity"))
}
else{
    // console.log("add new Row")
recordList.append(createRecordRow(id,name,price,formData.get("quantity")))
recordTotal()

}
addRecord.reset()

}

const addServiceHandler=(event)=>{
    event.preventDefault()
    const formData=new FormData(addService)
    const newId=products[products.length-1].id+1
    // console.log(formData.get("Service_name"),formData("Service_price"))
    // console.log(formData.get("Service_name"),formData.get("Service_price"))
    const newService={
        id:newId,
        name:formData.get("Service_name"),
        price:formData.get("Service_price")
    }
    // data Updates
    products.push(newService) 
    serviceList.append(createServiceList(newId,formData.get("Service_name"), formData.get("Service_price")))
    SelectProduct.append(new Option(formData.get("Service_name"),newId))
    addService.reset()
}
const recordRowDelHandler=(event)=>{

    const recordRow=event.target.closest(".record-row")
    if(confirm("are u sure Del")){
        recordRow.remove();
        recordTotal()
    }
     }
     const manageProductHandler=()=>{
        manageProductBox.classList.toggle("translate-x-full")
        manageProductBox.classList.add("duration-300")

     }


// listener
addRecord.addEventListener("submit",addRecordHandler)
recordList.addEventListener("click",(event)=>{
    const currentRecordRow=event.target.closest(".record-row")
if(event.target.classList.contains("record-row-del")){
    recordRowDelHandler(event)
}
else if(event.target.classList.contains("quantity-increment")){
    // console.log("U increment")
    recordRowQuantityIncrement(currentRecordRow.getAttribute("product-id"))

}else if(event.target.classList.contains("quantity-decrement")){
recordRowQuantityDecrement(event)
}
})
manageProduct.addEventListener("click",manageProductHandler)
closeBtn.addEventListener("click",manageProductHandler)

addService.addEventListener("submit",addServiceHandler)
print.addEventListener("click",printHandler)

