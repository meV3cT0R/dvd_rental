const filters = {
  $orderby: (val) => {
    val = val.trim();
    const arr = val.split(" ");
    console.log(arr);
    if (arr.length > 2) {
      throw new Error("Filter Went Wrong");
    }
    return [`order by ${arr[0]} ${arr[1] || "asc"}`, 0];
  },
  $top: (val) => {
    return [`limit ${val}`, 0];
  },
  $offset: (val) => {
    return [`offset ${val}`, 0];
  },
  $filter: (val) => {
    val = val.trim();
    const arr = val.split(" ");
    console.log(arr);
    const strToSym = {
      eq: "=",
      gt: ">",
      lt: ",",
      ge: ">=",
      le: "<=",
    };
    let str = "where ";
    for (const a of arr) {
      if (a in strToSym) {
        str += `${strToSym[a]} `;
        continue;
      }
      str += `${a} `;
    }
    return [str, 1];
  },
};

function filterHelper(start, end, params) {
  console.log("Building Query String");
  let tempStrArr = [[start, 2]];

  for (const k in params) {
    tempStrArr.push(filters[k](params[k]));
  }
  tempStrArr.push([end, -1]);

  tempStrArr.sort((a, b) => {
    if (a[1] > b[1]) return -1;
    else return 1;
  });

  const query = tempStrArr.map((val) => val[0]).join(" ");
  console.log(query);
  console.log("Query String built");
  return query;
}

module.exports = { filterHelper };
