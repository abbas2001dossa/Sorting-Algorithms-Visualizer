let generate_array = document.getElementById('generate_array_btn');
let shuffle_array = document.getElementById('shuffle_array_btn');
let sort_btn = document.getElementById('sort_btn');
let bars_container = document.getElementById('bars_container');
let unsorted_array = [];
let select_algo = document.getElementById("algo");
let algo = "";
let speed = document.getElementById('speed');
let speedfactor = 900;
let upload = document.getElementById("upload");
let hf = 20;
let n = 0;
let a = document.getElementById('ans');
let s = "This algorithm took ";
var myarr;


// event listener for upload 
upload.addEventListener('change', ()=>{
  //initialize file reader
  let fr = new FileReader();
  fr.readAsText(upload.files[0]);
  fr.onload=function(){
    //outputbox.innerHTML = fr.result;
    myarr = fr.result.split(",");
    console.log(myarr);
    for(let i=0;i<myarr.length;i++){
      console.log(myarr[i]);
      unsorted_array.push(parseFloat(myarr[i]));
      n++;
      // bars_container.innerHTML += unsorted_array[i];
      // bars_container.innerHTML += ','; 
    }
  };
})


speed.addEventListener("change",(e) =>{
    speedfactor = parseInt(e.target.value);
    console.log(speedfactor);
});



select_algo.addEventListener("change", function () {
  algo = select_algo.value;
});

function random_num(min,max){

    return Math.floor(Math.random() * (max - min + 1) + min);
}


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  let bars = document.getElementsByClassName('bar');
  // While there remain elements to shuffle.
  let c = 0;
  while (currentIndex != 0) {
      
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
    bars[c].style.height = array[randomIndex] * hf + "px";
    c++;
  }

  return array;
}



function renderBars(array){
    for(let i=0; i < array.length;i++){
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i]*hf + "px";
    bars_container.appendChild(bar);
    }
}

generate_array.addEventListener("click",function(){
    //createArray();
    renderBars(unsorted_array);
});


shuffle_array.addEventListener("click",function(){
    let new_a = shuffle(unsorted_array);
    console.log(new_a);
});

function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve,ms));
}

async function bubbleSort(array) {

    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          for (let k = 0; k < bars.length; k++) {
            if (k !== j && k !== j + 1) {
              bars[k].style.backgroundColor = "aqua";
            }
          }
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          bars[j].style.height = array[j] * hf + "px";
          bars[j].style.backgroundColor = "lightgreen";
          //bars[j].innerText = array[j];
          bars[j + 1].style.height = array[j + 1] * hf + "px";
          bars[j + 1].style.backgroundColor = "lightgreen";
          //bars[j + 1].innerText = array[j + 1];
          await sleep(speedfactor);
        }
          document.getElementsByClassName("body").innerText = "Iteration " + i + "complete!" ;
          //let text = document.getElementsByClassName('ans');

      }

      await sleep(speedfactor);
    }
    a.innerHTML = "Time Complexity:- ";
    a.innerHTML += array.length * array.length + " iterations present  !!!  " ;
    a.innerHTML += "Space Complexity :- O(1) " ;
   
    return array;
  }
  

async function CountSort(a){
  console.log("count Sort Playing!");
  let bars = document.getElementsByClassName('bar');
 // let bars1 = document.getElementsByClassName('bar1');
  var max = Math.max.apply(Math, a);
  var min = Math.min.apply(Math, a);
  
  var range = max - min + 1;
  var count = Array.from({length: range}, (_, i) => 0);
  var output = Array.from({length: a.length}, (_, i) => 0);
  let height = Array.from({length: a.length}, (_, i) => 0);
  //let count1 = [];
  
  for (let i = 0; i < a.length; i++) {
    bars[i].style.backgroundColor = "blue";
    await sleep(speedfactor);
    count[a[i] - min]++;
    bars[i].style.backgroundColor = "cyan";

  }
  
  for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
      console.log('count value: '+ count[i], count[i-1]);
      console.log("count array iterations!");
  }
  
  for (let i = a.length - 1; i >= 0; i--) {
      output[count[a[i] - min] - 1] = a[i];
      height[count[a[i] - min] - 1] = bars[i].style.height;
      count[a[i] - min]--;
  }
  
  
  for (let i = 0; i < a.length; i++) {
      a[i] = output[i];
      bars[i].style.backgroundColor = "#60e368";
      bars[i].style.height = a[i] * hf + "px";
      await sleep(speedfactor);
      console.log(count[i]);
      //console.log("Last loop iterations!");
  }
  a.innerHTML = "Time Complexity: ";
  a.innerHTML += a.length + range + " iterations";

  }
//Radix Sort
async function RadixSort(arr)
{
    var arr;
    let bars = document.getElementsByClassName("bar");
    var res;
    var max = Math.max.apply(Math, arr);
    for(var exp=1; Math.floor(max/exp) > 0; exp*=10)
    {
        res = await radixcount(arr, exp);
    }

    for(var i=0;i<arr.length;i++){
        bars[i].style.backgroundColor = "#60e368";
        bars[i].style.height = arr[i] * hf + "px";
      }
    a.innerHTML = arr;
    a.innerHTML += "<BR>" ;
    a.innerHTML += "Time Complexity: ";
    let d = getlength(arr[9]);
    
    a.innerHTML += n*d + " iterations ";
    a.innerHTML += "<BR>" ;
    a.innerHTML += "Space Complexity =  O(n+2^d)";
}

async function radixcount(arr,exp)
{
    let bars = document.getElementsByClassName("bar");
    var i, length = arr.length;
    let output = new Array(length);
    let height = new Array(length);
   // let label = new Array(length);
    let count = new Array(10);
    for(i=0;i<10;i++)
    {
        count[i]=0;
    }

    for (i = 0; i < length; i++)
    {
        bars[i].style.backgroundColor = "red";
        await sleep(speedfactor);
        count[Math.floor(arr[i] / exp) % 10]++;
        bars[i].style.backgroundColor = "cyan";
        bars[i].style.height = count[i] * hf + "px";
    }

    for (i = 1; i < 10; i++)
    {
        count[i] += count[i - 1];
        bars[i].style.height = count[i] * hf + "px";
    }

    for (i = length - 1; i >= 0; i--)
    {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
        height[count[Math.floor(arr[i] / exp) % 10] - 1] = bars[i].style.height;
        //label[count[Math.floor(arr[i] / exp) % 10] - 1] = bars[i].childNodes[0].innerText;
        count[Math.floor(arr[i] / exp) % 10]--;
    }

    for (i = 0; i < length; i++)
    {
        
        //bars[i].childNodes[0].innerText = label[i];
        arr[i] = output[i];
    }
    await sleep(speedfactor);
}

function getlength(number) {
  return number.toString().length;
}


//write insertion sort function
async function InsertionSort(array) {
    console.log("Insertion sort playing");
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        bars[j + 1].style.height = array[j + 1] * hf + "px";
        bars[j + 1].style.backgroundColor = "red";
        //bars[j + 1].innerText = array[j + 1];
        await sleep(speedfactor);
  
        for (let k = 0; k < bars.length; k++) {
          if (k != j + 1) {
            bars[k].style.backgroundColor = "aqua";
          }
        }
        j = j - 1;
      }
      array[j + 1] = key;
      bars[j + 1].style.height = array[j + 1] * hf + "px";
      bars[j + 1].style.backgroundColor = "lightgreen";
      //bars[j + 1].innerText = array[j + 1];
      await sleep(speedfactor);
    }
  
    // for (let k = 0; k < bars.length; k++) {
    //   bars[k].style.backgroundColor = "aqua";
    // }
    
    return array;
  }



  async function swap(items, leftIndex, rightIndex, bars) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    bars[leftIndex].style.height = items[leftIndex] * hf + "px";
    bars[leftIndex].style.backgroundColor = "lightgreen";
    //bars[leftIndex].innerText = items[leftIndex];
    bars[rightIndex].style.height = items[rightIndex] * hf + "px";
    bars[rightIndex].style.backgroundColor = "lightgreen";
    //bars[rightIndex].innerText = items[rightIndex];
    await sleep(speedfactor);
  }
  async function partition(items, left, right) {
    let bars = document.getElementsByClassName("bar");
    let pivotIndex = Math.floor((right + left) / 2);
    var pivot = items[pivotIndex]; //middle element
    bars[pivotIndex].style.backgroundColor = "red";
  
    for (let i = 0; i < bars.length; i++) {
      if (i != pivotIndex) {
        bars[i].style.backgroundColor = "aqua";
      }
    }
  
    (i = left), //left pointer
      (j = right); //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        await swap(items, i, j, bars); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }
  

  async function quickSort(items, left, right) {
    var index;
    let bars = document.getElementsByClassName("bar");
    if (items.length > 1) {
      index = await partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        await quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        await quickSort(items, index, right);
      }
    }
  
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "aqua";
    }
    return items;
  }

  async function HeapSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
      await heapify(array, array.length, i);
    }
    for (let i = array.length - 1; i >= 0; i--) {
      await swap(array, 0, i, bars);
      await heapify(array, i, 0);
    }
    for (let k = 0; k < bars.length; k++) {
      bars[k].style.backgroundColor = "aqua";
      await sleep(hf);
    }
    a.innerHTML = "Time Complexity: ";
    a.innerHTML += (parseFloat(array.length * Math.log2(array.length)).toFixed(4)) + " iterations present ";
    a.innerHTML += "Space Complexity :- O(1) " ;

    return array;
  }
  
  async function heapify(array, n, i) {
    let bars = document.getElementsByClassName("bar");
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
    if (largest != i) {
      await swap(array, i, largest, bars);
      await heapify(array, n, largest);
    }
  }
  
  async function mergeSort(arr) {
    let bars = document.getElementsByClassName("bar");
    if (arr.length < 2) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    let actualHalf = await mergeSort(left);
    await mergeSort(right);
  
    let i = 0;
    let j = 0;
    let k = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        arr[k] = left[i];
        i++;
     
      } else {
        arr[k] = right[j];
        j++;
       
      }
    
      //visualize it for right and left side
      bars[k].style.height = arr[k] * hf + "px";
      bars[k].style.backgroundColor = "lightgreen";
      if (k + arr.length < bars.length) {
        bars[k + arr.length].style.height = arr[k] * hf + "px";
        console.log(arr[k] * hf);
        bars[k + arr.length].style.backgroundColor = "yellow";
      }
      await sleep(speedfactor);
      //bars[k].innerText = arr[k];
  
      k++;
    }
  
    while (i < left.length) {
      arr[k] = left[i];
      bars[k].style.height = arr[k] * hf + "px";
      bars[k].style.backgroundColor = "lightgreen";
      await sleep(speedfactor);
      i++;
      k++;
    }
  
    while (j < right.length) {
      arr[k] = right[j];
      bars[k].style.height = arr[k] * hf + "px";
      bars[k].style.backgroundColor = "lightgreen";
      await sleep(speedfactor);
      j++;
      k++;
    }
  
  
  
    for (let k = 0; k < bars.length; k++) {
      bars[k].style.backgroundColor = "aqua";
    }
    
    a.innerHTML = "Time Complexity:- ";
    a.innerHTML += parseFloat(  (arr.length * Math.log2(arr.length)).toFixed(4))  + " iterations" ;
    a.innerHTML += "Space Complexity :- O(n) " ;

    return arr;
  }
  
  function mergeSortD(arr, start, end) {
    if (arr.length < 2) {
      return arr;
    }
  
    let middle = Math.floor((start + end) / 2);
    let left = arr.slice(start, middle);
    let right = arr.slice(middle, end);
  
    //mergeSort(left);
    mergeSort(right);
  }

  
async function BucketSort(a) {
  let bars = document.getElementsByClassName('bar');
  //Create a bucket array
  let n = a.length;
  let bucket = new Array(n);
  //Add bucket group
  for(let i = 0; i < n; i++){
    bucket[i] = [];
  }

  for(let i = 0; i < n; i++){
    let bucketIndex = Math.floor(a[i]) * n;
    let element = a[i];
    bucket[bucketIndex].push(element);
  }
  //Sort each bucket separately
  for(let i = 0; i < n; i++){
    console.log(bucket[i]);
    InsertionSort(bucket[i]);
  }
  // Get the sorted array
  console.log('Sorted Array!');
  let index = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0, size = bucket[i].length; j < size; j++) {
        a[index++] = bucket[i][j];
        bars[j].style.height = a[index] * hf + "px";
        bars[j].style.backgroundColor = "green"; 
        await sleep(speedfactor);
    }
  }
  await sleep(speedfactor);
}



// //7.4.5 Advanced Quick Sort O(nk + n lg(n/k))
function quicksort1(array)
{
    //document.getElementById("advquickbtn").style.display = 'none';
    var arr = array;
    var length = arr.length;

    advquicksort(arr, 0, length-1);

    console.log(arr);
}
async function advquicksort(arr,low,high)
{
    while(low<high)
    {
        if(high-low+1 < parseInt(arr.length/2))
        {
            await advquickinsertion(arr,low,high);
            break;
        }
        else
        {
            var pi = await advquickpartition(arr,low,high);
            if(pi-low < high-pi)
            {
                await advquicksort(arr,low,pi-1);
                low = pi+1;
            }
            else
            {
                await advquicksort(arr,pi+1,high);
                high = pi-1;
            }
        }
    }
}


async function advquickinsertion(arr,low,high)
{
    let bars = document.getElementsByClassName("bar");
    var val, j, height;
    if(low-1>=0)
        bars[low-1].style.backgroundColor = "red";
    bars[low].style.backgroundColor = "#60e368";
    for(var i=low+1;i<=high;i++)
    {
        height = bars[i].style.height;
        bars[i].style.backgroundColor = "yellow";
        val = arr[i];
        j = i-1;

        await sleep(speedfactor);

        while(j>=low && arr[j]>val)
        {
            bars[j].style.backgroundColor = "yellow";
            bars[j+1].style.height = bars[j].style.height;
           // bars[j+1].childNodes[0].innerText = bars[j].childNodes[0].innerText;
            
            arr[j+1] = arr[j];
            j--;

            await sleep(speedfactor);

            for(var k=i;k>=low;k--)
                bars[k].style.backgroundColor = "#60e368";
        }
        arr[j+1] = val;
        bars[j+1].style.height = height;
        //bars[j+1].childNodes[0].innerHTML =val;
        await sleep(speedfactor);
        bars[i].style.backgroundColor = "#60e368";
    }
    if(low-1>=0)
        bars[low-1].style.backgroundColor = "#60e368";
}



async function advquickpartition(arr,low,high)
{
    let bars = document.getElementsByClassName("bar");
    var val, pivot = arr[high];
    bars[high].style.backgroundColor = "red";
    var i=low-1, height, label;

    for(j=low;j<=high-1;j++)
    {
        bars[j].style.backgroundColor = "blueviolet";

        await sleep(speedfactor);

        if(arr[j]<pivot)
        {
            i++;

            height = bars[i].style.height;
            bars[i].style.height = bars[j].style.height;
            bars[j].style.height = height;

          

            val = arr[i];
            arr[i] = arr[j];
            arr[j] = val;

            bars[i].style.backgroundColor = "chartreuse";
            if(i!=j)
                bars[j].style.backgroundColor = "orange";

            await sleep(speedfactor);
        }
        else
            bars[j].style.backgroundColor = "orange";
    }
    i++;

    val = arr[i];
    arr[i] = arr[high];
    arr[high] = val;

    height = bars[i].style.height;
    bars[i].style.height = bars[high].style.height;
    bars[high].style.height = height;


    bars[i].style.backgroundColor = "red";
    bars[high].style.backgroundColor = "orange";

    for(var k=0;k<=high;k++)
        bars[k].style.backgroundColor = "blue";

    bars[i].style.backgroundColor = "red";
    
    await sleep(speedfactor);

    return i;
}


function CountSort1(array)
{
  console.log("New 2 algorithm working");

    let a = prompt("Enter Starting Range");
    let b = prompt("Enter Ending Range");
    console.log(typeof a);

    var i, arr = array;
    var length = arr.length;

    var max = Math.max.apply(Math, arr);
    var min = Math.min.apply(Math, arr);

    var range = max - min + 1;

    if(a && b)
    {
        if((a < min && b <min) || (a >max && b > max))
        {
            a.style.color = "red";
            a.innerHTML = "Enter correct range";
        }
        else
        {
            var counter = Array.from({length: max}, (_, i) => 0);

            for(i=0;i<max;i++)
                counter[i] = 0;

            for(i=0;i<length;i++)
                counter[arr[i]]++;

            for(i=1;i<max;i++)
                counter[i] += counter[i-1];

            {
                var count = Array.from({length: range}, (_, i) => 0);
                var output = Array.from({length: arr.length}, (_, i) => 0);
                for (i = 0; i < length; i++)
                    count[arr[i] - min]++;
            
                for (i = 1; i < count.length; i++)
                    count[i] += count[i - 1];
            
                for (i = length - 1; i >= 0; i--)
                {
                    output[count[arr[i] - min] - 1] = arr[i];
                    count[arr[i] - min]--;
                }
            
                for (i = 0; i < length; i++)
                    arr[i] = output[i];
            }
            
            var val;
            if(a ==0)
                val = counter[b];
            else
                val = counter[b] - counter[a-1];

            document.getElementById("ans").innerHTML = arr;

            a.style.color = "white";
            a.innerHTML = "Number of elements in this range: " + val;
            
            console.log(val);
            console.log(counter[b]);
            console.log(counter[a]);
            console.log(counter[a]);
            console.log(counter);
            console.log(arr);
        }
    }
    else
    {
        a.style.color = "white";
        a.innerHTML = "Input Empty. Pleas Enter Range!";
    }

    
}


  sort_btn.addEventListener("click", function () {
    switch (algo) {
      case "bubble":
        bubbleSort(unsorted_array);
        break;
      case "merge":
        mergeSort(unsorted_array);
        console.log(mergeSort(unsorted_array));
        break;
      case "heap":
        HeapSort(unsorted_array);
        break;
      case "insertion":
        InsertionSort(unsorted_array);
        a.innerHTML = "Time Complexity: "
        a.innerHTML +=  unsorted_array.length * unsorted_array.length  + " iterations present here";
        a.innerHTML += " Space Complexity :-  O(1)"
        break;
      case "quick":
        quickSort(unsorted_array, 0, unsorted_array.length - 1);
        a.innerHTML = "Time Complexity: ";
        a.innerHTML += parseFloat((unsorted_array.length * Math.log2(unsorted_array.length)).toFixed(8)) + " iterations !!";
        a.innerHTML += "Space Complexity :- O(n*logn) " ;

        break;
      case "count":
        CountSort(unsorted_array);
        break;
      case "bucket":
        BucketSort(unsorted_array);
        a.innerHTML = "Time Complexity: ";
        a.innerHTML += 20 + " iterations  present in algo!";
        a.innerHTML += " Space Complexity:- O( (number of elements) + (number of buckets) )";
        break; 
      case "radix":
        RadixSort(unsorted_array);
        break;
      case "new1":
        // //7.4.5 Advanced Quick Sort O(nk + n lg(n/k))
        var max = Math.max.apply(Math, unsorted_array);
        var min = Math.min.apply(Math, unsorted_array);
    
        var range = max - min + 1;
        a = document.getElementById("ans");
        a.innerHTML = "Time Complexity: ";
        a.innerHTML += unsorted_array.length * range + unsorted_array.length * Math.log2(unsorted_array.length/range) + " iterations";
        quicksort1(unsorted_array,0,unsorted_array.length-1);
        console.log("range: " + range);
        break;
      case "new2":
        CountSort1(unsorted_array);
        break;
      default:
        bubbleSort(unsorted_array);
        break;
    }
  });