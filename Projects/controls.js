class Controls{
    constructor(type){
        this.forward=false;
        this.right=false;
        this.left=false;
        this.reverse=false;

        switch(type){
            case "KEYS":
                this.#addKeyboardListeners();   //To bind the keys of the keyboard with a desired action
                break;                          //'#' is used to define that this function is private
            case "DUMMY":
                this.forward = true;
                break;
        }
    }

    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
                case "ArrowUp":
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.reverse=true;
                    break;
                }
            }
        

            document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
                }

            }
    } //#addKeyboardListeners
} //class