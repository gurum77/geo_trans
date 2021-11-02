import Alignment from "./alignment/alignment.js";
import Point from "./alignment/point.js";
import Convert from "./convert.js";

document.getElementById("draw").onclick = drawAlignment;

// 평면선형을 그린다.
function drawAlignment(){
    // 입력을 가져와서 alignment를 구성한다.
    // bp
    let bp = document.querySelector("#bp");
    let dir = document.querySelector("#dir");
    
    let curves = document.querySelector("textarea#curves")
    let str = curves.value;
    let strings = str.split('\n');
    for(let i = 0; i < strings.length; ++i){
        if(strings[i] == ""){
            strings.splice(i, 1);
            i--;
        }
    }
    let alignment = new Alignment();
    
    alignment.startPoint.fromString(bp.value);
    let degree = parseFloat(dir.value);
    let radian = Convert.degreeToRadian(degree);
    alignment.dir.fromRadian(radian);
    
    let curDir = alignment.dir;
    strings.forEach(element => {
        
        curDir = alignment.addCurveByScript(element, curDir);
    });

    
    // 선형을 그린다.
    alignment.draw();
}