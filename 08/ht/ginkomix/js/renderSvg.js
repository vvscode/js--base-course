const RenderSvg = (RenderSvg) => class extends RenderSvg {
    renderSvg(arr) {
        let svg = document.querySelector('#svgGame'),
            svgns = "http://www.w3.org/2000/svg";
        for(let i =0;i<this.x;i++) {   
            for(let j =0;j<this.y;j++) {
                let rect  = document.querySelector('.col'+i+'.row'+j);
               if(arr[i][j]===1) {
                   rect.style.fill = 'black'
                    continue;
                }
                if(arr[i][j]===0) {
                    rect.style.fill ='white';
                }
               
            }


        }


    }
	

    drawRect() {

        let svg = document.querySelector('#svgGame'),
            svgns = "http://www.w3.org/2000/svg";
        svg.innerHTML ='';
        svg.style.width = this.width+'px';
        svg.style.height = this.height+'px';
        for(let i =0;i<this.x;i++) {   
            for(let j =0;j<this.y;j++) {
                let rect = document.createElementNS(svgns,'rect');
                rect.classList.add('class','col'+ i); 
                rect.classList.add('class','row'+ j);
                rect.setAttribute('x',j*this.square);
                rect.setAttribute('y',i*this.square);
                rect.setAttribute('width',this.square);
                rect.setAttribute('height',this.square);
                svg.appendChild(rect);
            }


        } 

    }



}