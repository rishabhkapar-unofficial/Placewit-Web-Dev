let box = document.getElementById("div");
let btn = document.getElementById("btn");
let index = 0;

// btn.addEventListener('click', function() {
//     let colors = ['blue', 'red', 'green', 'orange', 'cyan'];
//     box.style.backgroundColor = colors[index];
//     index = (index+1)%colors.length;
// });

// btn.onclick = function() {
//     let colors = ['blue', 'red', 'green', 'orange', 'cyan'];
//     box.style.backgroundColor = colors[index];
//     index = (index+1)%colors.length;
// };


window.onkeypress = function() {
    let colors = ['blue', 'red', 'green', 'orange', 'cyan'];
    box.style.backgroundColor = colors[index];
    index = (index+1)%colors.length;
};