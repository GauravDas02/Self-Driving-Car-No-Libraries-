class Road{
    constructor(x, width, laneCount=3){     //The road will be centered around 'x'
        this.x=x;
        this.width=width;
        this.laneCount=laneCount;

        this.left=x-width/2;
        this.right=x+width/2;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity; 

        const topLeft={x:this.left, y:this.top};
        const topRight={x:this.right, y:this.top};
        const bottomLeft={x:this.left, y:this.bottom};
        const bottomRight={x:this.right, y:this.bottom};
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }

    getLaneCenter(laneIndex) //lane index starts from left to right, numerically starting at zero
    {
        const laneWidth=this.width/this.laneCount; 
        return this.left+laneWidth/2+
        Math.min(laneIndex,this.laneCount-1)*laneWidth;
    } 

    draw(ctx){      //to draw the road
        ctx.lineWidth=5;
        ctx.strokeStyle="white";
    
        for(let i=1;i<=this.laneCount-1; i++){
            const x=lerp(           //lerp -> linear interpolation
                                    //same as: function lerp(A,B,t){return A+(B-A)*t;}
                this.left,
                this.right,
                i/this.laneCount   //By what percent are we dividing the lanes (from left to right)
            );
        
            //if(i>0 && i<this.laneCount){
            ctx.setLineDash([20,20]); //Line will be of length 20 px and a gap of 20 px and so on
            /*} else{
                ctx.setLineDash([]);
            }*/

            ctx.beginPath();
            //ctx.moveTo(this.left,this.top);
            ctx.moveTo(x,this.top);
            //ctx.lineTo(this.left,this.bottom);
            ctx.lineTo(x,this.bottom);
            ctx.stroke(); 
        }

        ctx.setLineDash([]); 
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y); 
            ctx.stroke();
        });

        //ctx.beginPath();
        //ctx.moveTo(this.right,this.top);
        //ctx.lineTo(this.right,this.bottom);
        //ctx.stroke();
        
    }
}

