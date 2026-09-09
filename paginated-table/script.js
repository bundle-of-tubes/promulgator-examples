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

function showPage2(skip, take) {
  console.log(`Page on v2 table requested: skip=${skip}, take=${take}`);
  const data2 = new Array(take);
  for (let index=0; index < take; ++index) {
    data2[index] = skip+index+1;
  }
  document.getElementById("rows2").replaceChildren(...data2.map((rowNum)=>{
    console.log('showing rowNum', rowNum); //TODO: deleteme
    const row = document.createElement('tr');
    const firstCell = document.createElement('td');
    firstCell.textContent = rowNum;
    const secondCell = document.createElement('td');
    secondCell.textContent = Math.pow(rowNum, 2);
    const thirdCell = document.createElement('td');
    thirdCell.textContent = Math.pow(rowNum, 3);
    row.replaceChildren(firstCell, secondCell, thirdCell);
    return row;
  }));
}

const pageinator2 = document.getElementById('paginator2');
paginator2.setCardinality(100);
paginator2.addEventListener('paginate', e=>showPage2(e.skip,e.take));
showPage2(0,paginator2.DEFAULT_PAGE_SIZE);
