import Alignment from "./alignment/alignment.js";
import Point from "./alignment/point.js";

document.getElementById("draw").onclick = drawAlignment;
// 평면선형을 그린다.
function drawAlignment(){
    // 입력을 가져와서 alignment를 구성한다.
    // bp
    let bp = document.querySelector("#bp");

    let curves = document.querySelector("textarea#curves")
    let str = curves.innerHTML;
    let strings = str.split('\n');
    let alignment = new Alignment();
    
    alignment.startPoint.fromString(bp.value);
    strings.forEach(element => {
        alignment.addCurveByScript(element);
    });

    console.log(alignment)
}