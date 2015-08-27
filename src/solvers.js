/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {

  var board = new Board({n: n});
  var found = false;
  var solution;

  var solveRooks = function(rowIndex) {    
    for (var i = 0; i < n; i++){

      if (found){
        break;
      }

      board.togglePiece(rowIndex, i);
      // console.log('---- 1 before checking conflict');
      // console.table(board.rows());
      // console.log('---- 2 before checking conflict');
      if (!board.hasColConflictAt(i)) {
        // console.log('---- 3 after checking conflict');
        // console.table(board.rows()); 
        // console.log('---- 4 after checking conflict');   
        if (rowIndex === 0) {
          // console.log('---- 5 rowIndex is 0, about to return');
          // console.table(board.rows());
          // console.log('---- 6 rowIndex is 0, about to return');
          solution = JSON.parse(JSON.stringify(board.rows()));
          found = true;
          break;
        }
        else {
          solveRooks(rowIndex - 1);
        }
      }
      board.togglePiece(rowIndex, i);
    }
  };
  
  solveRooks(n - 1);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  var solutionCount = 0;
  var board = new Board({n: n});
  
  var solveRooks = function(rowIndex) {    
    for (var i = 0; i < n; i++){
      board.togglePiece(rowIndex, i);
      if (!board.hasColConflictAt(i)) {    
        if (rowIndex === 0) {
          solutionCount++;
        }
        else {
          solveRooks(rowIndex - 1);
        }
      }
      board.togglePiece(rowIndex, i);
    }
  };

  solveRooks(n - 1);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution;
  var found = false;

  var solveQueens = function(rowIndex) {    

    for (var i = 0; i < n; i++){

      if (found){
        break;
      }

      board.togglePiece(rowIndex, i);

      if (!(board.hasColConflictAt(i) || board.hasMinorDiagonalConflictAt(i + rowIndex) || board.hasMajorDiagonalConflictAt(i - rowIndex))) {
        if (rowIndex === 0) {
          solution = JSON.parse(JSON.stringify(board.rows()));
          found = true;
          break;
        }
        else {
          solveQueens(rowIndex - 1);
        }
      }
      board.togglePiece(rowIndex, i);
    }
  };
  
  solveQueens(n - 1);

  if (!found){
    solution = new Board({n: n}).rows();
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  
  var solveQueens = function(rowIndex) {    
    for (var i = 0; i < n; i++){
      board.togglePiece(rowIndex, i);
      if (!(board.hasColConflictAt(i) || board.hasMinorDiagonalConflictAt(i + rowIndex) || board.hasMajorDiagonalConflictAt(i - rowIndex))) {    
        if (rowIndex === 0) {
          solutionCount++;
        }
        else {
          solveQueens(rowIndex - 1);
        }
      }
      board.togglePiece(rowIndex, i);
    }
  };

  solveQueens(n - 1);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
