'use strict';

console.log('Hello script.js');
const cardinality = 72;
const data = new Array(cardinality);
for (let index = 0; index < cardinality; ++index) {
  data[index] = String(Math.floor(Math.random()*index));
}

function showPage(skip, take) {
  console.log(`Page requested: skip=${skip}, take=${take}`);
  const subset = data.slice(skip, skip+take);
  document.getElementById("rows").replaceChildren(...subset.map((val, index)=>{
    const row = document.createElement('tr');
    const indexCell = document.createElement('td');
    indexCell.textContent = String(skip+index);
    const valueCell = document.createElement('td');
    valueCell.textContent = val;
    row.replaceChildren(indexCell, valueCell);
    return row;
  }));
}

const paginator = document.getElementById('paginator');
paginator.setAttribute('cardinality', cardinality);
paginator.addEventListener('paginate', e=>showPage(e.skip, e.take));
showPage(0, Math.min(cardinality, paginator.DEFAULT_PAGE_SIZE));
