class ClothoidDrawer
{
    // canvas에 clothoid를 그린다.
    static draw2D(context, clothoid){
        
        console.log(clothoid);
        let offset = {x:0, y:0};
        let count = clothoid.l / 20;
        context.beginPath();
    
        let l = 0;
        for(let i = 0; i < count; ++i){
            let point = Clothoid.calcPoint(clothoid.a, l);
            l += 20;
            context.lineTo(
                point.x,
                point.y + offset.y,
              );
        }

        // 마지막점
        let point = Clothoid.calcPoint(clothoid.a, clothoid.l);
            context.lineTo(
                point.x + offset.x,
                point.y + offset.y,
              );
        
        
        context.stroke();
    }
}