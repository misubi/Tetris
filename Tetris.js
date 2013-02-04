var gameOver=false;
var resting=false;
var activePiece=null;
var pieceDead=null;
var isThereActivePiece=false;
var stop=false;
var points=0;
var ctx;

var pointsId; //points to html div for representing points

window.addEventListener('keydown', function(event) {
	switch (event.keyCode) {
	case 37: // Left
		activePiece.moveLeft();
		break;
	case 38: // Up
		activePiece.rotate();
		break;
	case 39: // Right
		activePiece.moveRight();
		break;
	case 40: // Down
		activePiece.moveDown();
		break;
	}
}, false);


var board=new Array();
for(var i=0;i<10;i++){
	board[i]=new Array();
}

function boardSquare(filled, r, g, b,active){
	this.filled=filled;
	this.r=r;
	this.g=g;
	this.b=b;
	this.active=active;
}

function Piece(){
	this.p1x=0;
	this.p1y=0;
	this.p2x=0;
	this.p3y=0;
	this.p3x=0;
	this.p3y=0;
	this.p4x=0;
	this.p4y=0;

}
Piece.prototype.moveDown = function (){
	//if piece is near edge or next to filled piece below stop the active piece
	if(this.p1y>=19||this.p2y>=19||this.p3y>=19||this.p4y>=19||(board[this.p1x][this.p1y+1].filled==true&&board[this.p1x][this.p1y+1].active==false)
			||(board[this.p2x][this.p2y+1].filled==true&&board[this.p2x][this.p2y+1].active==false)||(board[this.p3x][this.p3y+1].filled==true&&board[this.p3x][this.p3y+1].active==false)
			||(board[this.p4x][this.p4y+1].filled==true&&board[this.p4x][this.p4y+1].active==false))
	{
		board[this.p1x][this.p1y].filled=true;
		board[this.p2x][this.p2y].filled=true;
		board[this.p3x][this.p3y].filled=true;
		board[this.p4x][this.p4y].filled=true;
		board[this.p1x][this.p1y].active=false;
		board[this.p2x][this.p2y].active=false;
		board[this.p3x][this.p3y].active=false;
		board[this.p4x][this.p4y].active=false;
		//stop the falling of activepiece
		clearInterval(pieceDead);
		isThereActivePiece=false;
		//increment point count
		points+=100;
	}

	//otherwise let the piece fall one y coordinate on board, and update piece's coordinate values
	else{
		for(var y=19;y>=0;y--){
			for(var x=0;x<10;x++){
				if(board[x][y].active==true){
					board[x][y+1]=board[x][y];
					board[x][y]=new boardSquare(false,0,0,0,false);
				}
			}
		}
		this.p1y=this.p1y+1;
		this.p2y=this.p2y+1;
		this.p3y=this.p3y+1;
		this.p4y=this.p4y+1;
	}
};

Piece.prototype.moveLeft = function (){
	//check it is not an edge to the left
	if(this.p1x>0&&this.p2x>0&&this.p3x>0&&this.p4x>0&&this.p1y<19
			&&this.p2y<19&&this.p3y<19&&this.p4y<19){
		//check that space to the left is free: NOT (filled and inactive) 
		if(!(board[this.p1x-1][this.p1y].filled==true&&board[this.p1x-1][this.p1y].active==false)&&
				!(board[this.p2x-1][this.p2y].filled==true&&board[this.p2x-1][this.p2y].active==false)&&
				!(board[this.p3x-1][this.p3y].filled==true&&board[this.p3x-1][this.p3y].active==false)&&
				!(board[this.p4x-1][this.p4y].filled==true&&board[this.p4x-1][this.p4y].active==false)){
			for(var x=1;x<10;x++){
				for(var y=19;y>=0;y--){
					if(board[x][y].active==true){
						board[x-1][y]=board[x][y];
						board[x][y]=new boardSquare(false,0,0,0,false);
					}
				}
			}
			this.p1x=this.p1x-1;
			this.p2x=this.p2x-1;
			this.p3x=this.p3x-1;
			this.p4x=this.p4x-1;
		}
	}
};
Piece.prototype.moveRight = function (){
	if(this.p1x<9&&this.p2x<9&&this.p3x<9&&this.p4x<9&&
			this.p1y<19&&this.p2y<19&&this.p3y<19&&this.p4y<19){
		if(!(board[this.p1x+1][this.p1y].filled==true&&board[this.p1x+1][this.p1y].active==false)&&
				!(board[this.p2x+1][this.p2y].filled==true&&board[this.p2x+1][this.p2y].active==false)&&
				!(board[this.p3x+1][this.p3y].filled==true&&board[this.p3x+1][this.p3y].active==false)&&
				!(board[this.p4x+1][this.p4y].filled==true&&board[this.p4x+1][this.p4y].active==false)){
			for(var x=9;x>=0;x--){
				for(var y=19;y>=0;y--){
					if(board[x][y].active==true){
						board[x+1][y]=board[x][y];
						board[x][y]=new boardSquare(false,0,0,0,false);
					}
				}
			}
			this.p1x=this.p1x+1;
			this.p2x=this.p2x+1;
			this.p3x=this.p3x+1;
			this.p4x=this.p4x+1;
		}
	}
};
function SquarePiece(){
	this.pos=1;
	this.p1x=4;
	this.p1y=0;
	this.p2x=5;
	this.p2y=0;
	this.p3x=4;
	this.p3y=1;
	this.p4x=5;
	this.p4y=1;
	if (board[this.p1x][this.p1y].filled==false&&board[this.p2x][this.p2y].filled==false&&board[this.p3x][this.p3y].filled==false&&board[this.p4x][this.p4y].filled==false)
	{
		board[this.p1x][this.p1y]=new boardSquare(true,0,200,0,true);
		board[this.p2x][this.p2y]=new boardSquare(true,0,200,0,true);
		board[this.p3x][this.p3y]=new boardSquare(true,0,200,0,true);
		board[this.p4x][this.p4y]=new boardSquare(true,0,200,0,true);
	}
	else
		gameOver=true;
	//no need to rotate square piece, so blank
	this.rotate=function (){};

}
function StraightPiece(){
	this.p1x=3;
	this.p1y=0;
	this.p2x=4;
	this.p2y=0;
	this.p3x=5;
	this.p3y=0;
	this.p4x=6;
	this.p4y=0;
	//position of 1 is horizontal, 2 is vertical
	
	if (board[this.p1x][this.p1y].filled==false&&board[this.p2x][this.p2y].filled==false&&board[this.p3x][this.p3y].filled==false&&board[this.p4x][this.p4y].filled==false)
	{
		this.pos=1;
		board[this.p1x][this.p1y]=new boardSquare(true,200,0,0,true);
		board[this.p2x][this.p2y]=new boardSquare(true,200,0,0,true);
		board[this.p3x][this.p3y]=new boardSquare(true,200,0,0,true);
		board[this.p4x][this.p4y]=new boardSquare(true,200,0,0,true);
	}
	else
		gameOver=true;

	//rotate for straightpiece only has two positions 1-horizontal, 2-vertical
	this.rotate=function (){
		//first check if the squares rotated are not filled and not on edge. otherwise do nothing
			if (this.pos==1){
				if((this.p1x+1)>0&&(this.p2x)>0&&(this.p3x-1)>0&&(this.p4x-2)>0
						&&(this.p1x-1)<10&&(this.p2x)<10&&(this.p3x-1)<10&&(this.p4x-2)<10
						&&(this.p1y-1)>0&&(this.p2y)>0&&(this.p3y+1)>0&&(this.p4y+2)>0
						&&(this.p1y-1)<20&&(this.p2y)<20&&(this.p3y+1)<20&&(this.p4y+2)<20){
				if(!(board[this.p1x+1][this.p1y-1].filled==true&&board[this.p1x+1][this.p1y-1].active==false)&&
						!(board[this.p3x-1][this.p3y+1].filled==true&&board[this.p3x-1][this.p3y+1].active==false)&&
						!(board[this.p4x-2][this.p4y+2].filled==true&&board[this.p4x-2][this.p4y+2].active==false)){	
					board[this.p1x+1][this.p1y-1]=board[this.p1x][this.p1y];
					board[this.p1x][this.p1y]=new boardSquare(false,0,0,0,false);
					board[this.p3x-1][this.p3y+1]=board[this.p3x][this.p3y];
					board[this.p3x][this.p3y]=new boardSquare(false,0,0,0,false);
					board[this.p4x-2][this.p4y+2]=board[this.p4x][this.p4y];
					board[this.p4x][this.p4y]=new boardSquare(false,0,0,0,false);
					this.p1x=this.p1x+1;
					this.p1y=this.p1y-1;
					this.p3x=this.p3x-1;
					this.p3y=this.p3y+1;
					this.p4x=this.p4x-2;
					this.p4y=this.p4y+2;
					this.pos=2;
					}
				}
			}
			else if (this.pos==2){
				if((this.p1x-1)>0&&(this.p2x)>0&&(this.p3x+1)>0&&(this.p4x+2)>0
						&&(this.p1x-1)<10&&(this.p2x)<10&&(this.p3x+1)<10&&(this.p4x+2)<10
						&&(this.p1y+1)>0&&(this.p2y)>0&&(this.p3y-1)>0&&(this.p4y-2)>0
						&&(this.p1y+1)<20&&(this.p2y)<20&&(this.p3y-1)<20&&(this.p4y-2)<20){
				if(!(board[this.p1x-1][this.p1y+1].filled==true&&board[this.p1x-1][this.p1y+1].active==false)&&
						!(board[this.p3x+1][this.p3y-1].filled==true&&board[this.p3x+1][this.p3y-1].active==false)&&
						!(board[this.p4x+2][this.p4y-2].filled==true&&board[this.p4x+2][this.p4y-2].active==false)){
					board[this.p1x-1][this.p1y+1]=board[this.p1x][this.p1y];
					board[this.p1x][this.p1y]=new boardSquare(false,0,0,0,false);
					board[this.p3x+1][this.p3y-1]=board[this.p3x][this.p3y];
					board[this.p3x][this.p3y]=new boardSquare(false,0,0,0,false);
					board[this.p4x+2][this.p4y-2]=board[this.p4x][this.p4y];
					board[this.p4x][this.p4y]=new boardSquare(false,0,0,0,false);
					this.p1x=this.p1x-1;
					this.p1y=this.p1y+1;
					this.p3x=this.p3x+1;
					this.p3y=this.p3y-1;
					this.p4x=this.p4x+2;
					this.p4y=this.p4y-2;
					this.pos=1;
				}
			}
		}
	};
}

function StepPiece(){
	this.p1x=5;
	this.p1y=0;
	this.p2x=5;
	this.p2y=1;
	this.p3x=4;
	this.p3y=1;
	this.p4x=4;
	this.p4y=2;
	//position of 1 is vertical, 2 is horizontal

	if (board[this.p1x][this.p1y].filled==false&&board[this.p2x][this.p2y].filled==false&&board[this.p3x][this.p3y].filled==false&&board[this.p4x][this.p4y].filled==false)
	{
		this.pos=1;
		board[this.p1x][this.p1y]=new boardSquare(true,300,300,0,true);
		board[this.p2x][this.p2y]=new boardSquare(true,300,300,0,true);
		board[this.p3x][this.p3y]=new boardSquare(true,300,300,0,true);
		board[this.p4x][this.p4y]=new boardSquare(true,300,300,0,true);
	}
	else
		gameOver=true;

	//rotate for steppiece only has two positions 1-horizontal, 2-vertical
	this.rotate=function (){
		//first check if the squares rotated are not filled and not on edge. otherwise do nothing
		
			
			if (this.pos==1){
					if((this.p1x+1)>0&&(this.p2x)>0&&(this.p3x+1)>0&&(this.p4x)>0
							&&(this.p1x+1)<10&&(this.p2x)<10&&(this.p3x+1)<10&&(this.p4x)<10
							&&(this.p1y+2)>0&&(this.p2y+1)>0&&(this.p3y)>0&&(this.p4y-1)>0
							&&(this.p1y+2)<20&&(this.p2y+1)<20&&(this.p3y)<20&&(this.p4y-1)<20){
						if(!(board[this.p1x+1][this.p1y+2].filled==true&&board[this.p1x+1][this.p1y+2].active==false)&&
								!(board[this.p3x+1][this.p3y].filled==true&&board[this.p3x+1][this.p3y].active==false)&&
								!(board[this.p4x][this.p4y-1].filled==true&&board[this.p4x][this.p4y-1].active==false)){	
						board[this.p1x+1][this.p1y+2]=board[this.p1x][this.p1y];
						board[this.p1x][this.p1y]=new boardSquare(false,0,0,0,false);
						board[this.p2x][this.p2y+1]=board[this.p2x][this.p2y];
						board[this.p3x+1][this.p3y]=board[this.p3x][this.p3y];
						board[this.p4x][this.p4y-1]=board[this.p4x][this.p4y];
						board[this.p4x][this.p4y]=new boardSquare(false,0,0,0,false);
						this.p1x=this.p1x+1;
						this.p1y=this.p1y+2;
						this.p2y=this.p2y+1;
						this.p3x=this.p3x+1;
						this.p4y=this.p4y-1;
						this.pos=2;
					}
				}
			}
			else if (this.pos==2){
				if((this.p1x-1)>0&&(this.p2x)>0&&(this.p3x-1)>0&&(this.p4x)>0
						&&(this.p1x-1)<10&&(this.p2x)<10&&(this.p3x-1)<10&&(this.p4x)<10
						&&(this.p1y-2)>0&&(this.p2y-1)>0&&(this.p3y)>0&&(this.p4y+1)>0
						&&(this.p1y-2)<20&&(this.p2y-1)<20&&(this.p3y)<20&&(this.p4y+1)<20){
					if(!(board[this.p1x-1][this.p1y-2].filled==true&&board[this.p1x-1][this.p1y-2].active==false)&&
							!(board[this.p3x-1][this.p3y].filled==true&&board[this.p3x-1][this.p3y].active==false)&&
							!(board[this.p4x][this.p4y+1].filled==true&&board[this.p4x][this.p4y+1].active==false)){	
				board[this.p1x-1][this.p1y-2]=board[this.p1x][this.p1y];
				board[this.p1x][this.p1y]=new boardSquare(false,0,0,0,false);
				board[this.p2x][this.p2y-1]=board[this.p2x][this.p2y];
				board[this.p2x][this.p2y]=new boardSquare(false,0,0,0,false);
				board[this.p3x-1][this.p3y]=board[this.p3x][this.p3y];
				board[this.p4x][this.p4y+1]=board[this.p4x][this.p4y];
				this.p1x=this.p1x-1;
				this.p1y=this.p1y-2;
				this.p2y=this.p2y-1;
				this.p3x=this.p3x-1;
				//this.p4x=this.p4x+1;
				this.p4y=this.p4y+1;
				
				this.pos=1;
				}
			}
		}	
	};
}

function LPiece(){
	this.pos=1;
	this.p1x=4;
	this.p1y=0;
	this.p2x=5;
	this.p2y=0;
	this.p3x=5;
	this.p3y=1;
	this.p4x=5;
	this.p4y=2;

	if (board[this.p1x][this.p1y].filled==false&&board[this.p2x][this.p2y].filled==false&&board[this.p3x][this.p3y].filled==false&&board[this.p4x][this.p4y].filled==false)
	{
		board[this.p1x][this.p1y]=new boardSquare(true,0,0,200,true);
		board[this.p2x][this.p2y]=new boardSquare(true,0,0,200,true);
		board[this.p3x][this.p3y]=new boardSquare(true,0,0,200,true);
		board[this.p4x][this.p4y]=new boardSquare(true,0,0,200,true);
	}
	else
		gameOver=true;
	//rotate for LPiece 4 positions
	this.rotate=function (){
		//first check if the squares rotated are not filled and not on edge. otherwise do nothing
		if (this.pos==1){
			if(board[this.p1x+2][this.p1y+1].filled==false&&board[this.p2x+1][this.p2y+2].filled==false&&board[this.p4x-1][this.p4y].filled==false)
			{					
				board[this.p1x+2][this.p1y+1]=board[this.p1x][this.p1y];
				board[this.p1x][this.p1y]=new boardSquare(false,0,0,0,false);
				board[this.p2x+1][this.p2y+2]=board[this.p2x][this.p2y];
				board[this.p2x][this.p2y]=new boardSquare(false,0,0,0,false);
				board[this.p4x-1][this.p4y]=board[this.p4x][this.p4y];
				board[this.p4x][this.p4y]=new boardSquare(false,0,0,0,false);
				board[this.p3x][this.p3y+1]=board[this.p3x][this.p3y];
				board[this.p3x][this.p3y]=new boardSquare(false,0,0,0,false);

				this.p1x=this.p1x+2;
				this.p1y=this.p1y+1;
				this.p2x=this.p2x+1;
				this.p2y=this.p2y+2;
				this.p3y=this.p3y+1;
				this.p4x=this.p4x-1;

				this.pos=2;}
		}
		else if (this.pos==2){
			board[this.p1x-1][this.p1y+1]=board[this.p1x][this.p1y];
			board[this.p1x][this.p1y]=new boardSquare(false,0,0,0,false);
			board[this.p2x-2][this.p2y]=board[this.p2x][this.p2y];
			board[this.p2x][this.p2y]=new boardSquare(false,0,0,0,false);
			board[this.p3x-1][this.p3y-1]=board[this.p3x][this.p3y];
			board[this.p4x][this.p4y-2]=board[this.p4x][this.p4y];	
			this.p1x=this.p1x-1;
			this.p1y=this.p1y+1;
			this.p2x=this.p2x-2;
			this.p3x=this.p3x-1;
			this.p3y=this.p3y-1;
			this.p4y=this.p4y-2;

			this.pos=3;
		}
		else if (this.pos==3){
			board[this.p1x-1][this.p1y]=board[this.p1x][this.p1y];
			board[this.p1x][this.p1y]=new boardSquare(false,0,0,0,false);
			board[this.p2x][this.p2y-1]=board[this.p2x][this.p2y];
			board[this.p3x+1][this.p3y]=board[this.p3x][this.p3y];
			board[this.p4x+2][this.p4y+1]=board[this.p4x][this.p4y];
			board[this.p4x][this.p4y]=new boardSquare(false,0,0,0,false);
			this.p1x=this.p1x-1;
			this.p2y=this.p2y-1;
			this.p3x=this.p3x+1;	
			this.p4x=this.p4x+2;
			this.p4y=this.p4y+1;

			this.pos=4;
		}
		else if (this.pos==4){
			board[this.p1x][this.p1y-2]=board[this.p1x][this.p1y];
			board[this.p1x][this.p1y]=new boardSquare(false,0,0,0,false);
			board[this.p2x+1][this.p2y-1]=board[this.p2x][this.p2y];
			board[this.p2x][this.p2y]=new boardSquare(false,0,0,0,false);
			board[this.p4x-1][this.p4y+1]=board[this.p4x][this.p4y];
			board[this.p4x][this.p4y]=new boardSquare(false,0,0,0,false);
			this.p1y=this.p1y-2;
			this.p2x=this.p2x+1;
			this.p2y=this.p2y-1;
			this.p4x=this.p4x-1;
			this.p4y=this.p4y+1;

			this.pos=1;		
		}
	};
}

function CrossPiece(){
	this.pos=1;
	this.p1x=4;
	this.p1y=0;
	this.p2x=5;
	this.p2y=0;
	this.p3x=6;
	this.p3y=0;
	this.p4x=5;
	this.p4y=1;

	if (board[this.p1x][this.p1y].filled==false&&board[this.p2x][this.p2y].filled==false&&board[this.p3x][this.p3y].filled==false&&board[this.p4x][this.p4y].filled==false)
	{
		board[this.p1x][this.p1y]=new boardSquare(true,200,0,400,true);
		board[this.p2x][this.p2y]=new boardSquare(true,200,0,400,true);
		board[this.p3x][this.p3y]=new boardSquare(true,200,0,400,true);
		board[this.p4x][this.p4y]=new boardSquare(true,200,0,400,true);
	}
	else
		gameOver=true;
	//rotate for CrossPiece 4 positions
	this.rotate=function (){
		//first check if the squares rotated are not filled and not on edge. otherwise do nothing
		if (this.pos==1){
			//if(board[this.p1x+1][this.p1y].filled==false&&board[this.p2x][this.p2y-1].filled==false&&board[this.p4x-1][this.p4y].filled==false)
			//	{					
			board[this.p1x+1][this.p1y-1]=board[this.p1x][this.p1y];
			board[this.p3x-1][this.p3y+1]=board[this.p3x][this.p3y];
			board[this.p3x][this.p3y]=new boardSquare(false,0,0,0,false);
			board[this.p4x-1][this.p4y-1]=board[this.p4x][this.p4y];
			this.p1x=this.p1x+1;
			this.p1y=this.p1y-1;
			this.p3x=this.p3x-1;
			this.p3y=this.p3y+1;
			this.p4x=this.p4x-1;
			this.p4y=this.p4y-1;

			this.pos=2;}
		//}
		else if (this.pos==2){
			board[this.p1x+1][this.p1y+1]=board[this.p1x][this.p1y];
			board[this.p3x-1][this.p3y-1]=board[this.p3x][this.p3y];
			board[this.p3x][this.p3y]=new boardSquare(false,0,0,0,false);
			board[this.p4x+1][this.p4y-1]=board[this.p4x][this.p4y];	
			this.p1x=this.p1x+1;
			this.p1y=this.p1y+1;
			this.p3x=this.p3x-1;
			this.p3y=this.p3y-1;
			this.p4x=this.p3x+1;
			this.p4y=this.p4y-1;

			this.pos=3;
		}
		else if (this.pos==3){
			board[this.p1x-1][this.p1y+1]=board[this.p1x][this.p1y];		
			board[this.p3x+1][this.p3y-1]=board[this.p3x][this.p3y];
			board[this.p3x][this.p3y]=new boardSquare(false,0,0,0,false);
			board[this.p4x+1][this.p4y+1]=board[this.p4x][this.p4y];		
			this.p1x=this.p1x-1;
			this.p1y=this.p1y+1;		
			this.p3x=this.p3x+1;	
			this.p3y=this.p3y-1;
			this.p4x=this.p4x+1;
			this.p4y=this.p4y+1;

			this.pos=4;
		}
		else if (this.pos==4){
			board[this.p1x-1][this.p1y-1]=board[this.p1x][this.p1y];
			board[this.p3x+1][this.p3y+1]=board[this.p3x][this.p3y];
			board[this.p3x][this.p3y]=new boardSquare(false,0,0,0,false);
			board[this.p4x-1][this.p4y+1]=board[this.p4x][this.p4y];
			this.p1x=this.p1x-1;
			this.p1y=this.p1y-1;
			this.p3x=this.p3x+1;
			this.p3y=this.p3y+1;
			this.p4x=this.p4x-1;
			this.p4y=this.p4y+1;

			this.pos=1;		
		}
	};
}

//main function to get called first
function playTetris(){
	pointsId=document.getElementById("points");

	var canvas = document.getElementById('canvas');
	if (canvas.getContext) {
		ctx = canvas.getContext("2d");
		drawBoard(ctx);

		for (var i=0;i<10;i++){
			for (var j=0;j<20;j++){
				board[i][j]=new boardSquare(false,0,0,0,false);
			}
		}

		stop=setInterval(function() {play();},100);
		setInterval(function() {drawSquares(ctx);},50);
	}
	//called at regular time intervals to checks when game over condition exists and whether there is need to clear rows
	//or add a new piece
	function play(){
		if(gameOver)
		{
			clearInterval(stop);
			alert("Game Over!");
		}
		else if (!isThereActivePiece){
			clearFilledRows();
			activePiece=newPiece();
			pieceDead=setInterval(function() {activePiece.moveDown();},100);

		}
	}
	function newPiece(){
		var randomNumber=Math.floor((Math.random()*1)+5);

		if(randomNumber==1){
			SquarePiece.prototype=new Piece();
			SquarePiece.prototype.constructor=SquarePiece;
			activePiece=new SquarePiece();
			isThereActivePiece=true;
		}
		else if (randomNumber==2){
			StraightPiece.prototype=new Piece();
			StraightPiece.prototype.constructor=StraightPiece;
			activePiece=new StraightPiece();
			isThereActivePiece=true;
		}
		else if (randomNumber==3){
			LPiece.prototype=new Piece();
			LPiece.prototype.constructor=LPiece;
			activePiece=new LPiece();
			isThereActivePiece=true;
		}
		else if (randomNumber==4){
			CrossPiece.prototype=new Piece();
			CrossPiece.prototype.constructor=CrossPiece;
			activePiece=new CrossPiece();
			isThereActivePiece=true;
		}
		else if (randomNumber==5){
			StepPiece.prototype=new Piece();
			StepPiece.prototype.constructor=StepPiece;
			activePiece=new StepPiece();
			isThereActivePiece=true;
		}

		return activePiece;
	}
	function drawBoard() {
		ctx.strokeRect(0,0,500,1000);
	}

	function drawSquares(ctx){
		for (i=0;i<10;i++){
			for (j=0;j<20;j++)
			{
				ctx.fillStyle = "rgb("+board[i][j].r+","+board[i][j].g+","+board[i][j].b+")";
				ctx.fillRect (50*i, 50*j, 50, 50);
			}
		}
		//update points field in html
		pointsId.innerHTML=points;
	}

	function clearFilledRows(){
		//loop through rows starting from the "bottom" last row and check if there is entire row filled and clear from board
		for (j=0;j<20;j++){
			rowFilled=true;
			for(i=0;i<10;i++){
				if(board[i][j].filled==false)
					rowFilled=false;
			}
			if(rowFilled){
				//shift row by 1 for all rows
				for(var rows=j;rows>=1;rows--){
					for(var columns=0;columns<10;columns++){
						board[columns][rows]=board[columns][rows-1];
					}
				}
				//increment point count
				points+=1000;
			}
		}
	}
}