const RenderText = (RenderText) =>class extends RenderText {
    renderText(arr) {
        let field = document.querySelector('#pre');
        field.innerHTML = '';
        for(var i = 0;i<this.x;i++) {
            for(var j = 0;j<this.y;j++) {
               if(arr[i][j]===0) {
                   field.innerHTML += 'X';
                   continue;
               }
                
               field.innerHTML += 'O';
            }
             field.innerHTML += '\n';
        }
    }


}