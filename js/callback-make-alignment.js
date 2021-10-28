import Alignment from "./alignment/alignment.js";

document.getElementById("draw").onclick = drawAlignment;
// 평면선형을 그린다.
function drawAlignment(){
    // 입력을 가져와서 alignment를 구성한다.
    let curves = document.querySelector("textarea#curves")
    let str = curves.innerHTML;
    let strings = str.split('\n');
    let alignment = new Alignment();
    strings.forEach(element => {
        alignment.addCurveByScript(element);
    });
debugger
    console.log(alignment)
}