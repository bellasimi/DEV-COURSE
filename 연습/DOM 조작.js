(() => {

    document.querySelectorAll(".toolbar button").forEach(element =>
        element.addEventListener("click",(e)=>{
            document.execCommand( e.target.getAttribute("data-command"));
    
        })

    )

})();