// 0  0000  0000
// 1  0001  1111
// 2  0010  

//poss = 00010010; poss = 000100100


var solveNQueensBitwise = function(n){
  var time1 = Date.now();
  var count = 0;
  var allMask = (1 << n) - 1; 
  var solveQueens = function(leftDiag, cols, rightDiag){
    if (cols === allMask){
      count++;
    }

    var poss = ~(leftDiag | cols | rightDiag) & allMask;
    if (!poss){
    }

    while (poss) {
      var bit = poss & -poss; 
      poss -= bit;
      solveQueens((leftDiag|bit) << 1, (cols | bit), (rightDiag | bit) >> 1);
    }
  };
  solveQueens(0, 0, 0);
  var time2 = Date.now();
  console.log(time2 - time1);
  return count;
};

console.log(solveNQueensBitwise(16));



