let visualSection = document.getElementById('visualSection');
const generateRandomArray = (size = 20, sorted = false) => {
  const arr = [];
  while (size) {
    const randomNumber = Math.ceil(Math.random() * 100);
    arr.push(randomNumber);
    size--;
  }
  if (sorted) {
    arr.sort((a, b) => a - b);
  }
  return arr;
};

let randomArray = generateRandomArray();

const sleep = m => new Promise(r => setTimeout(r, m));

let swappingNodes = async (i, min) => {
  await sleep(1000);
  const visualSectionNodes = visualSection.getElementsByTagName('span');
  visualSectionNodes[i].parentNode.insertBefore(visualSectionNodes[i], visualSectionNodes[min]);
  visualSectionNodes[min].parentNode.insertBefore(visualSectionNodes[min], visualSectionNodes[i]);
  //visualSectionNodes[min].style.background = "#ffef00";
};

// Selection sorting code with visuals
let selectionSorting = async (arr) => {
  console.log('array before sorting--> ', arr);
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    const visualSectionNodes = visualSection.getElementsByTagName('span');
    visualSectionNodes[min].style.background = "#00ff00";
    for (let j = i + 1; j < len; j++) {
      await sleep(250);
      let message = 'Comparing ' + arr[i] + ' with ' + arr[j];
      updateMessage(message + ' Current min value is ' + arr[min]);
      visualSectionNodes[j].style.background = "#00ff00";
      if (arr[min] > arr[j]) {
        min = j;
        updateMessage(message + ' Current min value is ' + arr[min]);
        visualSectionNodes[min].style.background = "#ff0000";
      }
    }
    if (min !== i) {
      let tmp = arr[i];
      arr[i] = arr[min];
      arr[min] = tmp;
      await updateMessage('Swapping ' + arr[min] + ' with ' + arr[i], true);
      swappingNodes(i, min);
    }
    for (let k = 0; k < len; k++) {
      visualSectionNodes[k].style.background = "#add8e6";
    }

  }
  console.log('array after sorting--> ', arr);
  return arr;
};

// Bubble sort logic with some visuals
let bubbleSort = async (inputArr) => {
  const visualSectionNodes = visualSection.getElementsByTagName('span');
  let len = inputArr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < len; i++) {
      if (inputArr[i] > inputArr[i + 1]) {
        let tmp = inputArr[i];
        inputArr[i] = inputArr[i + 1];
        inputArr[i + 1] = tmp;
        visualSectionNodes[i].style.background = "#efff00";
        visualSectionNodes[i +1].style.background = "#efff00";
        await updateMessage('Swapping  ' + inputArr[i] + ' and ' + inputArr[i + 1]);
        await swappingNodes(i, i + 1);
        swapped = true;
        for (let k = 0; k < len; k++) {
          visualSectionNodes[k].style.background = "#add8e6";
        }
      }
    }
  } while (swapped);

  return inputArr;
};

const linearSearch = async (arr, elToFind) => {
  const visualSectionNodes = visualSection.getElementsByTagName('span');
  for (var i=0; i<arr.length; i++) {
    await sleep(300);
    visualSectionNodes[i].style.background = "#e6c200";
    updateMessage('Finding ' + elToFind + ' Comparing with ' + arr[i]);
    if (arr[i] == elToFind) {
      visualSectionNodes[i].style.background = "#ff0000";
      updateMessage('Match found');
      return i;
    }
  }
  updateMessage('No Match found');
  for (let k = 0; k < arr.length; k++) {
    visualSectionNodes[k].style.background = "#add8e6";
  }
  return null;
};

const binarySearch = async (arr, elToFind) => {
  sortedArray = arr.sort((a, b) => { return a-b });
  const visualSectionNodes = visualSection.getElementsByTagName('span');
  updateMessage('Sorting Array');
  await sleep(2000);
  generateNodes(sortedArray);
  var lowIndex = 0;
  var highIndex = sortedArray.length - 1;
  while (lowIndex <= highIndex) {
    updateMessage('Searching ' + elToFind + ' in between ' + sortedArray[lowIndex] + ' and ' + sortedArray[highIndex]);
    visualSectionNodes[lowIndex].style.background = "#e6c200";
    visualSectionNodes[highIndex].style.background = "#e6c200";
    await sleep(150);
    var midIndex = Math.floor((lowIndex + highIndex) / 2);
    if (sortedArray[midIndex] == elToFind) {
      visualSectionNodes[midIndex].style.background = "#ff0000";
      updateMessage('Value found');
      return midIndex;
    } else if (sortedArray[midIndex] < elToFind) {
      visualSectionNodes[lowIndex].style.background = "#add8e6";
      visualSectionNodes[highIndex].style.background = "#add8e6";
      lowIndex = midIndex + 1;
    } else {
      visualSectionNodes[lowIndex].style.background = "#add8e6";
      visualSectionNodes[highIndex].style.background = "#add8e6";
      highIndex = midIndex - 1;
    }

  }
  updateMessage('Value not found');
  return null;
};


window.onload = () => {
  generateNodes(randomArray);
  document.getElementById('dataSet').value = randomArray;
};

const generateNodes = (arr) => {
  visualSection.innerHTML = '';
  for (let i = 0; i < arr.length; i++) {
    let d = document.createElement('span');
    d.setAttribute('class', `dynamic${i}`);
    d.style.height = parseInt(arr[i] + 10) + 'px';
    d.style.width = (1000 / arr.length) - 4 + 'px';
    d.innerText = `${arr[i]}`;
    visualSection.appendChild(d);
  }
};


function selectAlgo() {
  let radios = document.getElementsByName('algoType');
  for (var i=0, len=radios.length; i<len; i++) {
    if ( radios[i].checked ) { // radio checked?
      val = radios[i].value; // if so, hold its value in val
      break; // and break out of for loop
    }
  }
  if (val === 'linear-search') {
    let valueToSearch = document.getElementById('searchValue').value;
    if (!valueToSearch) {
      updateMessage('Please provide value for searching');
      return true;
    }
    linearSearch(randomArray, parseInt(valueToSearch, 10));
  } else if (val === 'binary-search') {
    let valueToSearch = document.getElementById('searchValue').value;
    if (!valueToSearch) {
      updateMessage('Please provide value for searching');
      return true;
    }
    binarySearch(randomArray, valueToSearch);
  } else if (val === 'selection-sort') {
    selectionSorting(randomArray);
  } else if (val === 'bubble-sort') {
    bubbleSort(randomArray);
  }

  console.log(val);
  return false;
}

const updateMessage = async (message, updateColor = false) => {

  let ele = document.getElementById('messageSection');
  if (updateColor) {
    ele.style.background = "#efff00";
    await sleep(1000);
  }

  ele.innerHTML = message;
  ele.style.background = "#7fffd4";
};

function generateRandomDataSet() {
  let arraySize = document.getElementById('dataSetSize').value;
  if (!arraySize) {
    arraySize = 20;
  } else if(!parseInt(arraySize, 10) || parseInt(arraySize, 10) < 1) {
    updateMessage('Generate Method currently support only signed integer');
    return false;
  }
  randomArray = generateRandomArray(parseInt(arraySize, 10));
  document.getElementById('dataSet').value = randomArray;
  generateNodes(randomArray);
}
