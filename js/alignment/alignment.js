import Point from "./point.js";
import Line from "./line.js";
import Arc from "./arc.js";

export default class Alignment {
    startPoint = new Point();
    curves = [];  // curve들을 담고 있는다.

    // 선형의 전체 길이 리턴
    getLength() {
        let len = 0;
        this.curves.forEach(curve => {
            len += curve.length;
        });
        return len;
    }

    /**
     * script로 curve를 추가한다.
     * line,l=100
     * arc,l=100,r=200
     * clothoid,l=200,r=200,a=150
     * @param {string} str 
     */
    addCurveByScript(str) {
        debugger
        let obj = this.parseScript(str);
        if (!obj.has("tag"))
            return false;

        let tag = obj.get("tag");
        if (tag == "line") {
            let line = new Line();
            line.length = this.getFloat(obj, "l");
            this.curves.push(line);
        }
        else if (tag == "arc") {
            let arc = new Arc();
            arc.radius = this.getFloat(obj, "r");
            arc.length = this.getFloat(obj, "l");
            this.curves.push(arc);
        }
    }

    /**
     * 
     * @param {Map} map 
     * @param {string} key 
     */
    getFloat(map, key) {
        if (map.has(key))
            return parseFloat(map.get(key));
        return 0;
    }
    /**
     * script , = 을 분석해서 object로 리턴 첫번째는 object 이름이다.
     * @param {string} str 
     */
    parseScript(str) {
        let elements = str.split(',');
        if (elements.length == 0)
            return { tag: "none" };

        let map = new Map();
        map.set('tag', elements[0].toString());
        for (let i = 1; i < elements.length; ++i) {
            let kv = elements[i].split('=');
            if (kv.length != 2)
                continue;

            map.set(kv[0].toString(), kv[1].toString());
        }

        return map;
    }

}