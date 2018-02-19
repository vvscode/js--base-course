const RenderCanvas = (RenderCanvas) => class extends RenderCanvas {

    renderCanvas(arr) {
        let canvas = document.querySelector('#canvasGame'),
             ctx = canvas.getContext('2d');
       
        ctx.clearRect(0,0,this.width,this.height);
        for(var i = 0;i<this.x;i++) {
            for(var j = 0;j<this.y;j++) {
               
                if(arr[i][j]===1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(j*this.square,i*this.square ,this.square,this.square);
                    continue;
                }
                if(arr[i][j]===0) {
                    ctx.strokeStyle = 'black';
                    ctx.strokeRect(j*this.square,i*this.square ,this.square,this.square);
                }


            }
        }
         
    }

    drawCanvas() {
        let canvas = document.querySelector('#canvasGame'),
        ctx = canvas.getContext('2d');
       
        ctx.clearRect(0,0,this.width,this.height);
        canvas.width = this.width;
        canvas.height = this.height;
        
    }

}