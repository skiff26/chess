<template>
	<div class="chess-board" :class="{'transform-rotate rotate-anim': animStatus && !whiteMove, 'rotate-anim': whiteMove}">
	  <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
		 <div class="square" v-for="(square, colIndex) in row" :key="colIndex"
				:class="getClass(rowIndex, colIndex, square)" 
				@click="selectSquare(rowIndex, colIndex, square)">
				<svg xmlns="http://www.w3.org/2000/svg" :class="{'transform-rotate': animStatus && !whiteMove, 'small-piece' : pieceSmall}" @click="handleClick($event, rowIndex, colIndex)" version="1.1" width="45" height="45" v-html="square"></svg>	
		 </div>
	  </div>
	</div>
 </template>
 
 <script>
import { toHandlerKey } from 'vue';
import icons from '../icons'
 const BLACK_PIECES = [icons['pawnBlack'], icons['kingBlack'], icons['queenBlack'], icons['elephantBlack'], icons['karolBlack'], icons['rookBlack']];
 const WHITE_PIECES = [icons['pawnWhite'], icons['kingWhite'], icons['queenWhite'], icons['elephantWhite'], icons['karolWhite'], icons['rookWhite']]

 export default {
	inject: ['animStatus'],
	data() {
	  return {
		 board: [
			[icons['rookBlack'], icons['karolBlack'], icons['elephantBlack'], icons['queenBlack'], icons['kingBlack'], icons['elephantBlack'], icons['karolBlack'], icons['rookBlack']],
			[icons['pawnBlack'], icons['pawnBlack'], icons['pawnBlack'], icons['pawnBlack'], icons['pawnBlack'], icons['pawnBlack'], icons['pawnBlack'], icons['pawnBlack']],
			[' ', '.', ' ', '.', ' ', '.', ' ', '.'],
			['.', ' ', '.', ' ', '.', ' ', '.', ' '],
			[' ', '.', ' ', '.', ' ', '.', ' ', '.'],
			['.', ' ', '.', ' ', '.', ' ', '.', ' '],
			[icons['pawnWhite'], icons['pawnWhite'], icons['pawnWhite'], icons['pawnWhite'], icons['pawnWhite'], icons['pawnWhite'], icons['pawnWhite'], icons['pawnWhite']],
			[icons['rookWhite'], icons['karolWhite'], icons['elephantWhite'], icons['queenWhite'], icons['kingWhite'], icons['elephantWhite'], icons['karolWhite'], icons['rookWhite']],
		 ],
		 basicX: 0,
		 basicY: 0,
		 selectedSquare: null,
		 optionsOn: false,
		 whiteMove: true,
		 isChecked: false,
		 pieceSmall: false,
		 check: [],
		 beats: [],
		 options: [],
		 saveBoard: [],
		 enemyPieces: [],
		 checkByPawns: [],
		 checkByRooks: [],
		 checkByQueen: [],
		 checkByKarols: [],
		 checkByElephants: [],
	  };
	},
	methods: {
 		handleClick(event, rowIndex, colIndex) {
 			this.$nextTick(() => {
 				const clickedElement = event.target;
 				const parentElement = clickedElement.parentNode;
 				if (parentElement.classList.contains('option')) {
					this.checkSquareForKing(rowIndex, colIndex, this.whiteMove ? icons['kingWhite'] : icons['kingBlack'])
					this.checkLogic(rowIndex, colIndex)	
 					console.log('Click Y - ' + this.basicY + ' X - ' + this.basicX) // debug
 				} else if (parentElement.parentNode.classList.contains('beat') || parentElement.parentNode.parentNode.classList.contains('beat') || parentElement.parentNode.parentNode.parentNode.classList.contains('beat') || parentElement.classList.contains('beat')){
					this.beatLogic(rowIndex, colIndex)
					console.log('Click Y - ' + this.basicY + ' X - ' + this.basicX + ' beat') // debug
				} else {
 					console.log('The click was on another element');
 				}
 			})
 		},
 		getClass(rowIndex, colIndex, square) {
 			let className = "square";
 			if ((rowIndex + colIndex) % 2 === 0) {
 				className += " white";
 			} else {
 				className += " black";
 			}
 			if (this.selectedSquare && this.optionsOn && rowIndex === this.selectedSquare[0] && colIndex === this.selectedSquare[1]) {
 				this.basicY = colIndex
 				this.basicX = rowIndex
 				className += " selected";
 			}
 			if (this.options && this.optionsOn) {
 				for (let i = 0; i < this.options.length; i += 2) {
 					if ((rowIndex === this.options[i] && colIndex === this.options[i + 1]) && (square === '.' || square === ' ')) {
 						className += " option";
 					}
 				}
 			}
			if (this.optionsOn && this.beats){
				for (let i = 0; i < this.beats.length; i += 2) {
 					if ((rowIndex === this.beats[i] && colIndex === this.beats[i + 1]) && (square !== '.' || square !== ' ')) {
 						className += " beat";
 					}
 				}
			}
 			return className;
 		},
	  	selectSquare(rowIndex, colIndex, square) {
		this.selectedSquare = [rowIndex, colIndex]
		this.beats = []
		this.optionsOn = true

		this.checkMove(square)

		 if(square === icons['pawnBlack'] || square === icons['pawnWhite']){
			this.options = []
			this.beats = []
			this.generatePawnMoves(rowIndex, colIndex, this.board)
		 } else if(square === icons['karolBlack'] || square === icons['karolWhite']){		
			this.options = []
			this.beats = []
			this.generateKarolMoves(rowIndex, colIndex, this.board, this.options)
		 } else if (square === icons['kingBlack'] || square === icons['kingWhite']) {
				this.beats = []
				this.options = []

				const thisPiece = square

				// Check upper row
				if (this.board[rowIndex - 1]) {
					const upperRow = rowIndex - 1
					const upperCol = colIndex
					this.checkSquareForKing(upperRow, upperCol, thisPiece)
					this.checkSquareForKing(upperRow, upperCol + 1, thisPiece)
					this.checkSquareForKing(upperRow, upperCol - 1, thisPiece)
				}
			
				// Check lower row
				if (this.board[rowIndex + 1]) {
					const lowerRow = rowIndex + 1
					const lowerCol = colIndex
					this.checkSquareForKing(lowerRow, lowerCol, thisPiece)
					this.checkSquareForKing(lowerRow, lowerCol + 1, thisPiece)
					this.checkSquareForKing(lowerRow, lowerCol - 1, thisPiece)
				}
			
				// Check same row
				this.checkSquareForKing(rowIndex, colIndex + 1, thisPiece)
				this.checkSquareForKing(rowIndex, colIndex - 1, thisPiece)
		 } else if(square === icons['elephantBlack'] || square === icons['elephantWhite'] || square === icons['queenBlack'] || square === icons['queenWhite']){			
			this.options = []
			this.beats = []
		 } else if (square === icons['rookBlack'] || square === icons['rookWhite']) {
			this.options = []
			this.beats = []
		} else { 
			this.selectedSquare = null
			this.optionsOn = false
		}
			if (square === icons["rookBlack"] || square === icons["rookWhite"] || square === icons["queenBlack"] || square === icons["queenWhite"]) {
				this.generateRookAndQueenMoves(rowIndex, colIndex, this.board, this.options);
			}
			if (square === icons["elephantBlack"] || square === icons["elephantWhite"] || square === icons["queenBlack"] || square === icons["queenWhite"]) {
				this.generateElephantAndQueenMoves(rowIndex, colIndex, this.board, this.options);
			}
	 	},
 		checkMove(square) {
 			if ((this.whiteMove && BLACK_PIECES.includes(square)) || (!this.whiteMove && WHITE_PIECES.includes(square))) {
 				this.selectedSquare = null
 				this.beats = []
 				this.optionsOn = false
 				return 0
 			}
 		},
		checkSquareForKing(row, col, thisPiece) {
			const square = this.board[row][col]
			if (square === ' ' || square === '.') {
			this.check = []
			this.enemyPieces = []
			this.checkByPawns = []
			this.checkByQueen = []
			this.checkByRooks = []
			this.checkByKarols = []
			this.checkByElephants = []
			for (let row = 0; row < 8; row++) {
				for (let col = 0; col < 8; col++) {

					if (thisPiece === icons['kingBlack'] && WHITE_PIECES.includes(this.board[row][col])) {
						if (this.enemyPieces.length > 0){
							this.enemyPieces.push(row, col)
						} else {
							this.enemyPieces = [row, col]; // сохраняем позицию фигуры
						}
					}
					if (thisPiece === icons['kingWhite'] && BLACK_PIECES.includes(this.board[row][col])) {
						if (this.enemyPieces.length > 0){
							this.enemyPieces.push(row, col)
						} else {
							this.enemyPieces = [row, col]; // сохраняем позицию фигуры
						}
					}
				}
			}

			for (let i = 0; i < this.enemyPieces.length; i+=2) {
				let enemyRow = this.enemyPieces[i]
				let enemyCol = this.enemyPieces[i+1]

				if (thisPiece === icons['kingBlack'] || thisPiece === icons['kingWhite']) {
					if (this.board[enemyRow][enemyCol] === icons['karolWhite'] && thisPiece === icons['kingBlack'] ||
							this.board[enemyRow][enemyCol] === icons['karolBlack'] && thisPiece === icons['kingWhite']) {
							this.checkByKarols.unshift(enemyRow, enemyCol) 
					} else if (this.board[enemyRow][enemyCol] === icons['elephantWhite'] && thisPiece === icons['kingBlack'] ||
									this.board[enemyRow][enemyCol] === icons['elephantBlack'] && thisPiece === icons['kingWhite']) {
							this.checkByElephants.unshift(enemyRow, enemyCol)
					} else if (this.board[enemyRow][enemyCol] === icons['queenWhite'] && thisPiece === icons['kingBlack'] ||
									this.board[enemyRow][enemyCol] === icons['queenBlack'] && thisPiece === icons['kingWhite']) {
							this.checkByQueen.unshift(enemyRow, enemyCol)
					} else if (this.board[enemyRow][enemyCol] === icons['rookWhite'] && thisPiece === icons['kingBlack'] ||
									this.board[enemyRow][enemyCol] === icons['rookBlack'] && thisPiece === icons['kingWhite']) {
							this.checkByRooks.unshift(enemyRow, enemyCol)
					} else if (this.board[enemyRow][enemyCol] === icons['pawnWhite'] && thisPiece === icons['kingBlack'] ||
									this.board[enemyRow][enemyCol] === icons['pawnBlack'] && thisPiece === icons['kingWhite']) {
								this.checkByPawns.unshift(enemyRow, enemyCol)
					} else {
							this.options.push(row, col)
					}
				} else {
					this.options.push(row, col)
				}
			}
			} else if (thisPiece === icons["kingWhite"] && BLACK_PIECES.includes(square)){
				this.beats.push(row, col)
			} 
			else if (thisPiece === icons["kingBlack"] && WHITE_PIECES.includes(square)){
				this.beats.push(row, col)
			} 
		},
		generatePawnMoves(row, col, board){
			this.isChecked = false
			const square = board[row][col] 
			if(square === icons['pawnBlack']){				
				if (row === 1  && (board[row+1][col] === ' ' || this.board[row+1][col] === '.')){
					this.options = [ row + 1, col, row + 2, col ]
				} else {
					this.options = [ row + 1, col ]
				}
	
				if (col >= 0 && square === icons['pawnBlack'] && WHITE_PIECES.includes(board[row+1][col-1])) {

					if(board[row+1][col-1] === icons['kingWhite']){
							console.log('Check by Pawn')
							this.isChecked = true
							this.check = [row, col]
							this.checkSquareForKing(row, col, board[row+1][col-1])
						} else {
							console.log('DEBUG')
							// можно бить фигуру слева
							this.beats.push(row + 1, col - 1);
						}
				}
				if (col < 7 && square === icons['pawnBlack'] && WHITE_PIECES.includes(board[row+1][col+1])) {
					if(board[row+1][col+1] === icons['kingWhite']){
							console.log('Check by Pawn')
							this.isChecked = true
							this.check = [row, col]
							this.checkSquareForKing(row, col, board[row+1][col+1])
						} else {
							console.log('DEBUG')
							// можно бить фигуру справа
							this.beats.push(row + 1, col + 1);
						}
				}
			} else {
				if (row === 6 && (board[row-1][col] === ' ' || board[row-1][col] === '.')){
					this.options = [ row - 1, col, row - 2, col ]
				} else {
					this.options = [ row - 1, col ]
				}

				if (col >= 0 && square === icons['pawnWhite'] && BLACK_PIECES.includes(board[row-1][col+1])) {
					if(board[row-1][col+1] === icons['kingBlack']){
						console.log('Check by Pawn')
						this.isChecked = true
						this.check = [row, col]
						this.checkSquareForKing(row, col, board[row-1][col+1])
					} else {
						console.log('DEBUG')
						// можно бить фигуру слева
						this.beats.push(row - 1, col + 1);
					}
				}
				if (col < 7 && square === icons['pawnWhite'] && BLACK_PIECES.includes(board[row-1][col-1])) {
					if(board[row-1][col-1] === icons['kingBlack']){
						console.log('Check by Pawn')
						this.isChecked = true
						this.check = [row, col]
						this.checkSquareForKing(row, col, board[row-1][col-1])
					} else {
						console.log('DEBUG')
						// можно бить фигуру справа
						this.beats.push(row - 1, col - 1);
					}
				}
			}
		},
		generateKarolMoves(row, col, board, options){
			const tempOptions = [
				row + 1, col + 2, row - 1, col + 2,
				row + 1, col - 2, row - 1, col - 2,
				row + 2, col + 1, row + 2, col - 1,
				row - 2, col + 1, row - 2, col - 1,
			]
			const thisPiece = board[row][col]
			for (let i = 0; i < tempOptions.length; i += 2) {
				let tempRowIndex = tempOptions[i]
				let tempColIndex = tempOptions[i+1]
				if (tempRowIndex < 8 && tempRowIndex >= 0 && tempColIndex < 8 && tempColIndex >= 0) {
				const square = board[tempRowIndex][tempColIndex]
					if(board[tempRowIndex][tempColIndex] === ' ' || board[tempRowIndex][tempColIndex] === '.'){
						options.push(tempRowIndex, tempColIndex)
					} else {
						if(thisPiece === icons['karolWhite'] && BLACK_PIECES.includes(board[tempRowIndex][tempColIndex])){
							if(square === icons['kingBlack']){
								console.log('Check by Karol')
								this.isChecked = true
								this.check = [row, col]
								this.checkSquareForKing(row, col, square)
							} else {
								console.log("DEBUG // generateKarol")
								this.beats.push(tempRowIndex, tempColIndex)
							}
						}
						if(thisPiece === icons['karolBlack'] && WHITE_PIECES.includes(board[tempRowIndex][tempColIndex])){
							if(square === icons['kingWhite']){
								console.log('Check by Karol')
								this.isChecked = true
								this.check = [row, col]
								this.checkSquareForKing(row, col, square)
							} else {
								this.beats.push(tempRowIndex, tempColIndex)
								console.log("DEBUG // generateKarol")
							}
						}
					}
				}
			}
		},
		generateRookAndQueenMoves(row, col, board, options) {
 			const directions = [
 				[1, 0], // down
 				[-1, 0], // up
 				[0, 1], // right
 				[0, -1], // left
 			];
			const thisPiece = board[row][col]
 			for (const [deltaRow, deltaCol] of directions) {
 				let currentRow = row + deltaRow;
 				let currentCol = col + deltaCol;
 				while (board[currentRow]?.[currentCol] !== undefined) {
 					const square = board[currentRow][currentCol];
 					if (square === "." || square === " ") {
 						options.push(currentRow, currentCol);
					} else if (thisPiece === icons["rookBlack"] && WHITE_PIECES.includes(square)){
						if(square === icons['kingWhite']){
							console.log('Check by Rook')
							this.isChecked = true
							this.check = [row, col]
							this.checkSquareForKing(row, col, square)
						} else {
							console.log("DEBUG // generateRookAndQueenMoves")
							this.beats.push(currentRow, currentCol)
						}
							break
					} else if (thisPiece === icons["queenBlack"] && WHITE_PIECES.includes(square)){
						if(square === icons['kingWhite']){
							console.log('Check by Queen')
							this.isChecked = true
							this.check = [row, col]
							this.checkSquareForKing(row, col, square)
						} else {
							console.log("DEBUG // generateRookAndQueenMoves")
							this.beats.push(currentRow, currentCol)
						}
							break
					} else if (thisPiece === icons["rookWhite"] && BLACK_PIECES.includes(square)){
						if(square === icons['kingBlack']){
							console.log('Check by Rook')
							this.isChecked = true
							this.check = [row, col]
							this.checkSquareForKing(row, col, square)
						} else {
							console.log("DEBUG // generateRookAndQueenMoves")
							this.beats.push(currentRow, currentCol)
						}
							break
					} else if (thisPiece === icons["queenWhite"] && BLACK_PIECES.includes(square)){
						if(square === icons['kingBlack']){
							console.log('Check by Queen')
							this.isChecked = true
							this.check = [row, col]
							this.checkSquareForKing(row, col, square)
						} else {
							console.log("DEBUG // generateRookAndQueenMoves")
							this.beats.push(currentRow, currentCol)
						}
							break
					} else {
 						break;
 					}
 					currentRow += deltaRow;
 					currentCol += deltaCol;
 				}
 			}
 		},
		generateElephantAndQueenMoves(row, col, board, options) {
			const directions = [
				[1, 1],
				[1, -1],
				[-1, 1],
				[-1, -1],
			];
			const thisPiece = board[row][col]
			for (const [deltaRow, deltaCol] of directions) {
				let currentRow = row + deltaRow;
				let currentCol = col + deltaCol;
				while (board[currentRow]?.[currentCol] !== undefined) {
					const square = board[currentRow][currentCol];
					if (square === "." || square === " ") {
						options.push(currentRow, currentCol);
					} else if (thisPiece === icons["elephantBlack"] && WHITE_PIECES.includes(square)) {
						if(square === icons['kingWhite']){
							console.log('Check by Elephant')
							this.isChecked = true
							this.check = [row, col]
							this.checkSquareForKing(row, col, square)
						} else {
							console.log("DEBUG // generateElephantAndQueenMoves")
							this.beats.push(currentRow, currentCol)
						}
						break
					} else if (thisPiece === icons["queenBlack"] && WHITE_PIECES.includes(square)) {
						if(square === icons['kingWhite']){
							console.log('Check by Queen')
							this.isChecked = true
							this.check = [row, col]
							this.checkSquareForKing(row, col, square)
						} else {
							console.log("DEBUG // generateElephantAndQueenMoves")
							this.beats.push(currentRow, currentCol)
						}
						break
					} else if (thisPiece === icons["elephantWhite"] && BLACK_PIECES.includes(square)) {
						if(square === icons['kingBlack']){
							console.log('Check by Elephant')
							this.isChecked = true
							this.check = [row, col]
							this.checkSquareForKing(row, col, square)
						} else {
							console.log("DEBUG // generateElephantAndQueenMoves")
							this.beats.push(currentRow, currentCol)
						}
						break
					} else if (thisPiece === icons["queenWhite"] && BLACK_PIECES.includes(square)) {
						if(square === icons['kingBlack']){
							console.log('Check by Queen')
							this.isChecked = true
							this.check = [row, col]
							this.checkSquareForKing(row, col, square)
						} else {
							console.log("DEBUG // generateElephantAndQueenMoves")
							this.beats.push(currentRow, currentCol)
						}
						break
					} else {
						break;
					}
					currentRow += deltaRow;
					currentCol += deltaCol;
				}
			}
		},
		checkLogic(rowIndex, colIndex){
			let board = this.board.slice(); // copy array
			const saveBoard = this.board.slice(); // copy array
			const item = board[this.basicX][this.basicY]; // save el
			board[this.basicX].splice(this.basicY, 1, ' '); // del el from first position
			board[rowIndex].splice(colIndex, 1, item); // insert el at new position
			this.saveBoard = saveBoard
			this.isChecked = false
			this.willCheck(rowIndex, colIndex, board, item)
			if (this.isChecked) {
				this.board[this.basicX].splice(this.basicY, 1, item);
				this.board[rowIndex].splice(colIndex, 1, ' ');
				console.log('BACK // check')
			}
		},
		beatLogic(rowIndex, colIndex){
			let board = this.board.slice(); // copy array
			const saveBoard = this.board.slice(); // copy array
			const bitem =  board[rowIndex][colIndex]
			const item = board[this.basicX][this.basicY]; // save el
			this.board[this.basicX].splice(this.basicY, 1, ' '); // del el from first position
			this.board[rowIndex].splice(colIndex, 1, item); // insert el at new position	
			this.saveBoard = saveBoard
			this.isChecked = false
			if(this.isChecked){
				this.board[this.basicX].splice(this.basicY, 1, item);
				this.board[rowIndex].splice(colIndex, 1, bitem);
			} else {
				this.board[this.basicX].splice(this.basicY, 1, ' ');
				this.board[rowIndex].splice(colIndex, 1, item);
				this.willCheck(rowIndex, colIndex, board, item)
				if (this.isChecked){
					this.board[this.basicX].splice(this.basicY, 1, item);
					this.board[rowIndex].splice(colIndex, 1, bitem);
					console.log('BACK // check beat')
				}
			}
		},
		willCheck(rowIndex, colIndex, board, item){
			// REFACTOR NEXT
			if(this.check.length > 1){
				this.generateElephantAndQueenMoves(this.check[0], this.check[1], this.board, this.options);
			}
			if (this.isChecked) {
				this.board[this.basicX].splice(this.basicY, 1, item);
				this.board[rowIndex].splice(colIndex, 1, ' ');
				alert("Невозможный ход #1");
			} else {
				if(this.check.length > 1) {
					this.generateRookAndQueenMoves(this.check[0], this.check[1], this.board, this.options);
				}
				if (this.isChecked) {
					this.board[this.basicX].splice(this.basicY, 1, item);
					this.board[rowIndex].splice(colIndex, 1, ' ');
					alert("Невозможный ход #2");
				} else {
					if(this.check.length > 1){
						this.generateKarolMoves(this.check[0], this.check[1], this.board, this.options);
					}
					if (this.isChecked) {
						this.board[this.basicX].splice(this.basicY, 1, item);
						this.board[rowIndex].splice(colIndex, 1, ' ');
						alert("Невозможный ход #3");
					} else {
						if(this.check.length > 1){
							this.generatePawnMoves(this.check[0], this.check[1], this.board);
						}
						if (this.isChecked) {
							this.board[this.basicX].splice(this.basicY, 1, item);
							this.board[rowIndex].splice(colIndex, 1, ' ');
							alert("Невозможный ход #4");
						} else {
							if (this.checkByKarols.length > 2) {
								this.generateKarolMoves(this.checkByKarols[0], this.checkByKarols[1], this.board, this.options);
							}
							if (this.isChecked) {
								this.board[this.basicX].splice(this.basicY, 1, item);
								this.board[rowIndex].splice(colIndex, 1, ' ');
								alert("Невозможный ход #5");
							} else {
								if (this.checkByKarols.length > 2) {
									this.generateKarolMoves(this.checkByKarols[2], this.checkByKarols[3], this.board, this.options);
								}
								if (this.isChecked) {
									this.board[this.basicX].splice(this.basicY, 1, item);
									this.board[rowIndex].splice(colIndex, 1, ' ');
									alert("Невозможный ход #5");
								}
								else {	
									if (this.checkByElephants.length > 2) {
										this.generateElephantAndQueenMoves(this.checkByElephants[0], this.checkByElephants[1], this.board, this.options);
									}
									if (this.isChecked) {
										this.board[this.basicX].splice(this.basicY, 1, item);
										this.board[rowIndex].splice(colIndex, 1, ' ');
										alert("Невозможный ход #6");
									}
									else {
										if (this.checkByElephants.length > 2) {
											this.generateElephantAndQueenMoves(this.checkByElephants[2], this.checkByElephants[3], this.board, this.options);
										}
										if (this.isChecked) {
											this.board[this.basicX].splice(this.basicY, 1, item);
											this.board[rowIndex].splice(colIndex, 1, ' ');
											alert("Невозможный ход #7");
										}
										else {
											if (this.checkByQueen.length > 1) {
											this.generateElephantAndQueenMoves(this.checkByQueen[0], this.checkByQueen[1], this.board, this.options);
											}
											if (this.isChecked) {
												this.board[this.basicX].splice(this.basicY, 1, item);
												this.board[rowIndex].splice(colIndex, 1, ' ');
												alert("Невозможный ход #8");
											} else {
												if(this.checkByRooks.length > 2){
													this.generateRookAndQueenMoves(this.checkByRooks[0], this.checkByRooks[1], this.board, this.options)
												}
												if (this.isChecked) {
													this.board[this.basicX].splice(this.basicY, 1, item);
													this.board[rowIndex].splice(colIndex, 1, ' ');
													alert("Невозможный ход #9");
												}
												else {
													if(this.checkByRooks.length > 2){
														this.generateRookAndQueenMoves(this.checkByRooks[2], this.checkByRooks[3], this.board, this.options)
													}
													if (this.isChecked) {
														this.board[this.basicX].splice(this.basicY, 1, item);
														this.board[rowIndex].splice(colIndex, 1, ' ');
														alert("Невозможный ход #10");
													}		
													else {
														if (this.checkByQueen.length > 1) {
															this.generateRookAndQueenMoves(this.checkByQueen[0], this.checkByQueen[1], this.board, this.options);
														}
														if (this.isChecked) {
															this.board[this.basicX].splice(this.basicY, 1, item);
															this.board[rowIndex].splice(colIndex, 1, ' ');
															alert("Невозможный ход #11");
														}
														else {
															if (this.checkByPawns.length > 1){
																this.generatePawnMoves(this.checkByPawns[0], this.checkByPawns[1], this.board)
															}
															if (this.isChecked) {
																this.board[this.basicX].splice(this.basicY, 1, item);
																this.board[rowIndex].splice(colIndex, 1, ' ');
																alert("Невозможный ход #12");
															}
															else {
																if (this.checkByPawns.length > 2){
																	this.generatePawnMoves(this.checkByPawns[2], this.checkByPawns[3], this.board)
																}
																if (this.isChecked) {
																	this.board[this.basicX].splice(this.basicY, 1, item);
																	this.board[rowIndex].splice(colIndex, 1, ' ');
																	alert("Невозможный ход #13");
																}
																else {
																	if (this.checkByPawns.length > 4){
																		this.generatePawnMoves(this.checkByPawns[4], this.checkByPawns[5], this.board)
																	}
																	if (this.isChecked) {
																		this.board[this.basicX].splice(this.basicY, 1, item);
																		this.board[rowIndex].splice(colIndex, 1, ' ');
																		alert("Невозможный ход #13");
																	}
																	else {
																		if (this.checkByPawns.length > 6){
																		this.generatePawnMoves(this.checkByPawns[6], this.checkByPawns[7], this.board)
																		}
																		if (this.isChecked) {
																			this.board[this.basicX].splice(this.basicY, 1, item);
																			this.board[rowIndex].splice(colIndex, 1, ' ');
																			alert("Невозможный ход #13");
																		}
																		else {
																			if (this.checkByPawns.length > 8){
																				this.generatePawnMoves(this.checkByPawns[8], this.checkByPawns[9], this.board)
																			}
																			if (this.isChecked) {
																				this.board[this.basicX].splice(this.basicY, 1, item);
																				this.board[rowIndex].splice(colIndex, 1, ' ');
																				alert("Невозможный ход #14");
																			} else {
																				if (this.checkByPawns.length > 10){
																				this.generatePawnMoves(this.checkByPawns[10], this.checkByPawns[11], this.board)
																				}
																				if (this.isChecked) {
																					this.board[this.basicX].splice(this.basicY, 1, item);
																					this.board[rowIndex].splice(colIndex, 1, ' ');
																					alert("Невозможный ход #15");
																				}
																				else {
																					if (this.checkByPawns.length > 12){
																						this.generatePawnMoves(this.checkByPawns[12], this.checkByPawns[13], this.board)
																					}
																					if (this.isChecked) {
																						this.board[this.basicX].splice(this.basicY, 1, item);
																						this.board[rowIndex].splice(colIndex, 1, ' ');
																						alert("Невозможный ход #16");
																					}
																					else {
																						if (this.checkByPawns.length > 14){
																							this.generatePawnMoves(this.checkByPawns[14], this.checkByPawns[15], this.board)
																						}
																						if (this.isChecked) {
																							this.board[this.basicX].splice(this.basicY, 1, item);
																							this.board[rowIndex].splice(colIndex, 1, ' ');
																							alert("Невозможный ход #17");
																						}
																						else {
																							this.board = board;
																							this.whiteMove = !this.whiteMove;
																							this.$emit('whiteMove', this.whiteMove)
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}	
								}
							}
						}
					}
				}
			}
		},
		onResize(){
			if(window.innerWidth < 435){
				this.pieceSmall = true
			} else {
				this.pieceSmall = false
			}
		}			
	},
	mounted(){
		window.addEventListener('click', event => {
			if(!this.$el.contains(event.target)){
				this.optionsOn = false
				this.options = []
				this.beats = []
				this.selectedSquare = null
				this.enemyPieces = []
			}
		})
		this.onResize()
		window.addEventListener('resize', this.onResize)
		window.addEventListener('click', event => {
			if(!this.$el.contains(event.target) && window.innerWidth < 1500){
				this.onResize()
			}
		})
	}
 };
 </script>