function lerp(A,B,t){
    return A+(B-A)*t;
}

function getIntersection(A,B,C,D){
    const tTop = (D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop = (C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom = (D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);

    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;

        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x, B.x, t),
                y:lerp(A.y, B.y, t),
                offset:t
            }
        }
    }

    return null;

}

function polysIntersect(poly1, poly2){
    for(let i=0; i<poly1.length; i++){
        for(let j=0;j<poly2.length; j++){
            const touch = getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch){
                return true;
            }
        }
    }

    return false;
}

function getRGBA(value){
    //const value = weights[i][j];    //we are working with the weights to color the required lines and we are commenting it out because 'value' is being passed as a parameter to the function
    const alpha = Math.abs(value);    //The values are between 1 and -1. So, the transparency at 0 will be full whereas the negative and postive values are defined by different colors
    const R=value<0?0:255;
    const G=R;                        //Since, red + green make yellow
    const B=value>0?0:255;
    //ctx.strokeStyle="orange";
    return "rgba("+R+","+G+","+B+","+alpha+")";       
}