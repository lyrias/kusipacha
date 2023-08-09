       function myFunction() {
            var n, p, hect, ksuma, text;
            var nc, pc, kc;
            n = document.getElementById("n-fert").value;
            p = document.getElementById("p-fert").value;
            k = document.getElementById("k-fert").value;
            hect = document.getElementById("par-hect").value;
            if (isNaN(n) || isNaN(p) || isNaN(k) || isNaN(hect)) {
                text = "Es necesarios introducir dos números válidos";
            } else {
                nc = calculos(n, 46, hect);
                pc = calculos(p, 46, hect);
                kc = calculos(k, 60, hect);
            }
            document.getElementById("n-fert-rest").innerHTML = nc + " kg";
            document.getElementById("p-fert-rest").innerHTML = pc + " kg";
            document.getElementById("k-fert-rest").innerHTML = kc + " kg";
            console.log(nc);
            console.log(pc);
            console.log(kc);
        }
        function calculos(fact, nut, hect) {
            let rest = (parseFloat(100) * parseFloat(fact)) / parseFloat(nut);
            let hest = (parseFloat(rest) * parseFloat(hect)) / parseFloat(10000);
            return Math.ceil(hest);
        }