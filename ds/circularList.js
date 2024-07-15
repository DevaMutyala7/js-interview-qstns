const List = function (val) {
  this.val = val;
  this.next = null;
};

let item1 = new List(10);
let item2 = new List(20);
let item3 = new List(30);
let item4 = new List(40);

item1.next = item2;
item2.next = item3;
item3.next = item4;
item4.next = item1;

/*===========SLow and Fast pointer============*/
// function removeCircleFromList(list) {
//   let slow = list;
//   let fast = list.next;

//   while (slow !== fast) {
//     slow = slow.next;
//     fast = fast.next.next;
//   }

//   slow.next = null;

//   return list;
// }
// console.log(removeCircleFromList(item1));

/* ==============With set================ */
// function iterateObj(obj, set) {
//   for (let key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (typeof obj[key] === "object") {
//         if (set.has(obj[key])) {
//           delete obj[key];
//         } else {
//           set.add(obj[key]);
//           iterateObj(obj[key], set);
//         }
//       }
//     }
//   }
// }

// let set = new Set([item1]);
// iterateObj(item1, set);
// console.log(item1);

/*======================WeakSet======================== */
function getCircularReplacer() {
  let seen = new WeakSet();

  return (key, val) => {
    if (typeof val === "object" && val != null) {
      if (seen.has(val)) {
        return;
      }
      seen.add(val);
    }
    return val;
  };
}

console.log(JSON.stringify(item1, getCircularReplacer()));

// console.log(item1);
// let obj1 = { name: "Deva", age: 27 };
// let obj2 = { name: "Teja", age: 40 };
// let obj3 = { name: "Mutyala", age: 65 };
