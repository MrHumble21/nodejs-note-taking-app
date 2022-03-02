let deleteBtns =  document.querySelectorAll('.delete')

deleteBtns.forEach(d=>{
    d.addEventListener('click',(e)=>{
        console.log(e.target.dataset.id)
    })
})

