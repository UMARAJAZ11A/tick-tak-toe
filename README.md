#include<bits/stdc++.h>
#include<iostream>
#include<vector>
#include<math.h>
#include<fstream>
using namespace std;

		fstream fin,fin1;                    // GLOBAL FILE STREAM OBJECT IS DEFINES WHICH READS THE DATA BASE FILE AND STORES IT INTO DRR ARRAY
 
		vector<int> drr[765];               //  A GLOBAL VECTOR INTEGER ARRAY IS DEFINES WHICH CONTAINS ALL THE DATA BASE OF THE GAME


//   CHECKWIN CHECK THE STATUS OF THE BOARD IF IT IS A WIN OF PLAYER OR DRAW OR WIN OF COMPUTER
//   PRINTS THE BOARD ON THE SCREEN AND RETURNS 1 IF GAME IS ENDED ELSE RETURN 0


		int checkwin(vector<int> arr)
		{
				cout<<"\n";
				for(int s=0;s<7;s=s+3)                                     // LOOP TO PRINT THE AARAY IN MATRIX FORM ON THE SCREEN (S=> CHANGES THE ROW)
					{
					    for(int k=s;k<=(s+2);k++)                         //  LOOP TO PRINT THE ARRAY COLUMN FOR A PERTICULAR ROW            
						    if(arr[k]==1)
								    {
								    	cout<<"X"<<" |"<<" ";
									}
							else if(arr[k]==2)
									{
										cout<<"O"<<" |"<<" ";
									}
							else
									{
										cout<<" "<<" |"<<" ";
									}
						cout<<"\n";
						cout<<"--"<<"--"<<"--"<<"--"<<"---";
						cout<<"\n";	
					}
 				cout<<"\n";
				if(arr[10]==1)                                      // IF PLAYER-1==>(X) WINS THE MATCH
					{
						cout<<"\nheeee harun-al-rashid\n";
						return 1;
					}
				else if(arr[10]==-1)                                // IF (O)==> WINS THE MATCH
					{
						cout<<"\nheeee jeet gayo bhai\n";
						return 1;
					}
				else if(arr[9]==9)                                  // IF WE ARE LEVEL 9 THEN ==> MATCH IS DRAW 
					{
						cout<<"\ngame draw\n";
						return 1;                                   
					}
				else
					return 0;                                       // IF THERE IS NO OUTCOME OF THE MATCH YET 
		}



//   ROT FUNCTION ROTATES THE ARRAY CLOCKWISE AND RETURNES IT

		vector<int> rot(vector<int> brr)
		{
			int i=0;                              
			vector<int> crr;                                  // VECTOR ARRAY CRR FOR STORING ROTATED VERSION OF BRR
			while(i<3)
				{
					for(int j=i+6;j>=i;j=j-3)                 // LOOP TO ROTATE BRR
						{
							crr.push_back(brr[j]);              
						}
					i++;			
				}
				
			for(int i=9;i<brr.size();i++)                     // LOOP TO COPY REST OF THE CONTENT OF BRR i.e LEVEL OF THE GAME---STATUS--- CHILDS
				crr.push_back(brr[i]);	
				
			return crr;                                       // ROTATED ARRAY IS RETURNED
		}


//   MATCH FUNCTION==> AS THE DATA BASE CONTAINS ONLY DISTINCT AND NON SIMILAR STATES
//    \ X \   \   \                    \    \    \ X  \
//    \   \   \O  \   ==> SIMILAR TO   \    \    \    \   ==> BOTH ARE ROTATED FORM OF EACH OTHER;
//    \   \   \   \                    \    \ 0  \    \

//   TO FIND THE ROTATED FORM WE CALL MATCH FUNCTION 

//   MATCH FUNCTION IS CALLED FOR 2 PURPOSES ==>  DEPENDS UPON THE NEED OF THE GAMEPLAY FUNCTION
//         CASE 1: MATCH FUNCTION IS CALLED TO FINDS THE EXACT MATCH ==> EXACT MATCH IS NEEDED WHEN 
//                 MATCH FUNCTION IS CALLED BY SEARCH FUNCTION WHEN ARR EXACT MATCHES BRR AS USER 
//                 HAS CHANGED THE CURRENT STATE OF THE BOARD AND GAMEPLAY HAS TO FIND THE MATCH IN THE DATA BASE 
//                 WHICH EXACTLY MATCH ARR WITH BRR
//                 EXACT MATCH IN WHICH COUNT==9  ===> ALL INDEX MATCH EACH OTHER
//
//        CASE 2:  MATCH FUNCTION IS CALLED TO FINDS A MATCH WHICH ONLY DIFFERS ONLY AT ONE INDEX
//                 THEREFORE ARR AND BRR DIFFERS ONLY AT ONE INDEX TO EACH OTHER
//                 THIS MATCH IS CALLED AFTER MINMAX FUNCTION HAS FOUND A BEST CHILD FOR THAT MOVE 
//                 AND WE HAVE TO ASSIGN THE BOARD THE BEST CHILD
//                 COUNT==8   ===> ONLY ONE INDEX DIFFERS B/W ARR AND BRR
//           
//   MATCH FUNCTION RETURNS VECTOR INTEGER BRR AFTER A MATCH IS FOUND    
//   RETURNES AN EMPTY VECTOR INTEGER ARRAY IF MATCH IS NOT FOUND

                          
		vector<int> match(vector<int> arr,vector<int> brr,int count)         
		{ 
				int c=0;                                                // C==> COUNTS THE NO OF CONTENT OF INDEX MATCHES B/W ARR AND BRR
 
				for(int i=0;i<4;i++)                                    // LOOP TO CHECK ALL POSSIBLE ROTATION(i.e-4) OF BRR WHICH MATCHS WITH ARR       
					{
						c=0;
						for(int j=0;j<9;j++)                            // LOOP TO COMPARE ARR AND BRR 
							{
								if(arr[j]==brr[j])
									c++;                                // C IS INCREMENTED EVERYTIME ARR MATCH BRR INDEX
							}
						if(c==count)                                    // COMPARE C WITH DESIRED COUNT (i.e==> 9,8)
							{
								return brr;                             // IF FOUND RETURN THAT ARRAY
							}
						else
						brr=rot(brr);	                                // IF NOT FOUND THEN ROTATE AGAIN AND COMPARE 
					}
				int temp;
    		    for(int i=0;i<7;i=i+3)                                  // LOOP TO FIND THE MIRROR IMAGE OF THE ARRAY BRR
     		  	 	{
       				  	temp=brr[i];
        			 	brr[i]=brr[i+2];
         				brr[i+2]=temp;
       				}
				for(int i=0;i<4;i++)                                   // AGAIN CHECK ALL POSSIBLE ROTATION
					{
						c=0;
						for(int j=0;j<9;j++)
							{
								if(arr[j]==brr[j])
								c++;
							}
						if(c==count) 
							return brr;
						else
							brr=rot(brr);	
					}      		      		
				vector<int> crr;                                      // IF NO MATCH FOUND THEN RETURN AN EMPTY ARRAY
				return crr;
		} 


//   CURRENT STATE OF THE BOARD IS CHANGES DUE TO THE INPUT OF THE PLAYER NOW WE HAVE TO FIND ARR IN OUR DATA BASE WHICH MATCHES THE CHANGED 
//   STATE OF THE BOARD
//   ARR==> THIS ARR CONTAIN CHANGED STATE OF THE BOARD BUT CONTAINS ALL THE CHILDERNS OF THE PREVIOUS STATE OF THE BOARD. 
//   THEREFORE CHANGED STATE OF THE BOARD (VECTOR ARR [0..8]) CAN ONLY BE FOUND IN THE CHILDERENS OF THIS ARRAY i.e (ARR[11..ARR.SIZE()]


		vector<int> search(vector<int> arr)
		{

				vector<int> brr;
			    for(int i=11;i<arr.size();i++)
				    {
  					  	brr=match(arr,::drr[arr[i]],9);
  					  	if(brr.size()!=0)
  						  	return brr;
					}
		}


//   FIND-MIN-MAX FUNCTION FINDES THE MAX OR MIN DEPENDINF UPON THE CALL(X) FROM ALL THE CHILDS 
//   ARR==> HERE ARR CONTAINS ALL THE CHILDS OF THE PERTICULAR NODE FOR WHICH FIND-MIN-MAX IS CALLED SCORES 
//   X= DEFINES WEATHER TO FIND MIN OR MAX(X=1)==> MAX   X=-1==> MIN


		int findminmax(vector<int> arr,int x)
		{
				int k=x;                                          // K STORES THE VALUE OF X(i.e)-> WE NEED MIN OR MAX DEPENDINF UPON MINMAX CALL
				{
					a:		vector<int> brr;                     //  a: TO USED FOR JUMP CALL 
   			   			    int pos=0;
					for(int i=0;i<arr.size();i++)                 // LOOP TO TO PUSH ALL THE INDEX OF ARR IN WHICH WE FIND MAX 0R MIN  
						{                                         // WE CAN HAVE ONLY 3 POSSIBLE SCORES i.e(1  -1   0)  
							if(arr[i]==k)
								{
								 	brr.push_back(i);
								} 	
						}
					if(brr.size()==0)                             // IF NO MAX OR MIN FOUND
						{
							if(x==1)                              // IF WE NEED TO FIND MAX(1) AND IT DOESNT EXIST IN ARR THEREFORE WE FIND 
								k=k-1;                            // VALUE JUST NEXT TO MAX i.e-> 0 --> -1
							else                                  // IF WE NEED TO FIND MIN(-1) AND IT DOESNT EXIST IN ARR THEREFORE WE FIND
							k=k+1;                                // VALUE JUST NEXT TO MIN i.e--> 0 --> 1
							goto a;                               // GOTO A TO FIND NEXT MAX OR MIN
						}
		
					if(brr.size()!=1)
						{
							srand((unsigned) time(0));            // RANDOMLY ASSIGN X AN INDEX OF ARR AMONG   
							x=rand()%(brr.size()-1);              // ALL THE MAX OR MIN INDEX STORED IN BRR
						}
					else
						x=0;
					return brr[x];                                // RETURN THE INDEX OF ARR CHOOSEN RANDOMLY
				}
		}

/*   MINMAX MAIN ALGO => FIND THE INDEX OF THE BEST CHILD WHICH LEADS TO OPTIMAL MOVE ON THE BOARD , MINMAX IS RECURSIVE FUNCTION 
     ARR==> CURRENT STATE OF THE BOARD 
     FLAG DEFINES THE PURPOSE OF CALLING MINMAX i.e FUNCTION CALL IS FOR MIN COMPUTATION OR MAX COMPUTATION
     INDEX ==> STORES THE INDEX OF THE BEST CHILD
*/

		int minmax(vector<int> arr,int &indx,int flag)
		{

				if(arr.size()==11)                               // IF THERE EXIST NO CHILD OF ARR i.e WE REACHED TERMINAL NODE
					{
						indx=-1;
						return arr[10];                          // RETURN THE STATUS OF THE THAT LEAVE
					}
				else
					{
						int x;                                   // X STORE !FLAG TO CALL MINMAX (MAX CALLS==> MIN AND MIN==> CALLS MAX)
						if(flag==1)
						x=-1;
						else
						x=1;
						vector<int> brr;                         // BRR TO STORE THE CHILD WHICH LEADS TO LEADS TO BEST SCORE OF EACH NODE(MIN MAX SCORE)
						
						
						for(int i=11;i<arr.size();i++)           // LOOP TO FIND MINMAX OF ALL CHILDS OF A NODE
							{
		
								brr.push_back(minmax(::drr[arr[i]],indx,x));
		
							}
							
						if(x==1)
						x=findminmax(brr,-1);                     // FUNCTION FIND MAX (i.e) MAX OF BRR AS X==1==> FOR MAX   
						else
						x=findminmax(brr,1);                      // FUNCTION TO FIND MIN OF BRR AS X==-1  ===>  FOR MIN
						indx=11+x;                                // INDEX OF THE THE CHILD BRR
	
						return brr[x];                           // MINMAX RETURNS IN INDEX OF THE BEST SCORE CHILD
					}                                            // BRR[X] IS THE BEST INDEX OF ARR
		}

/*    MINMAXCALL FUNCTION CALLS THE MINMAX MAIN ALGORITHIMS BUT BEFORE CALLING MAIN MIN MAX ALGO IT CHECKS THAT IF THERE EXIST 
      A CHILD OF THE CURRENT STATE WHOSE RUNNING STATUS OF THE GAME IS WIN FOR THE COMPUTER THEN IT RETURNS THAT CHILD AND THEREFORE
      SAVE COMPUTATIONAL TIME OF THE MINMAX ALGORITHIM
      FLAG => DEFINES THE PURPOSE OF CALLING MINMAXCALL (IF FLAG=1 MINMAX IS CALLED AS A MAX FUNCTION)
                                                        (IF FLAG=-1 MINMAX IS CALLED AS A MIN FUNCTION) 
      VECTOR ARR IS THE CURRENT STATE OF THE TICK TAK TOE BOARD
      INDX => WE NEEND THE INDEX OF THE CHILD WHICH IS CHOOSEN BY THE MINMAX ALGORITHIM SO THAT WE ASSIGN THE NEXT STATE OF THE BOARD IN THE GAMEPLAY FUNCTION
*/

		int minmaxcall(vector<int> arr,int &indx,int flag)
		{
			    if(arr[9]>=4)                                          // CHECK WIN ONLY WHEN DEPTH OF THE GAME GREATER THAN 4,
					for(int i=11;i<arr.size();i++)                    // WIN IS NOT POSSIBLE BEFORE LEVEL 5TH OF THE GAME
						{
							if(::drr[arr[i]][10]==flag)               // SEARCHS STATUS OF ALL THE CHILD OF THE ARR TO FIND THE WIN IF EXIST
								{
									indx=i;
									return 1;
								}
						}
				else	
				    return minmax(arr,indx,flag);                    // CALL MINMAX 
		}

//   GAMEPLAY FUNCTION => PLAY GAME AS A PLAYER 1 OR PLAYER 2 , DEPENDING ON THE USER CHOICE 

		void gameplay(vector<int> arr,int player)
		{
				int x,vall,mnmx,ind,win;                 // MNMX ==> DEFINES EITHER COMPUTER NEED TO CALL MINIMIZER FUNCTION OR MAXIMIZER
					if(player==1)                        // DEPENDINF UPON PLAYER CHOICE
						{
							mnmx=-1;
							x=1;                         // X=1 STANDS FOR (X) IN TICK TACK TOE IN DATA BASE
							goto a;
						}
					else
						{
							mnmx=1;
							x=2;                         // X=2 STANDS FOR (O) IN TICK TACK TOE IN DATA BASE
							goto b;
						}
	     	    a:  {
								cout<<"enter index\n";                               	
								cin>>vall;                                              
								arr[vall]=x;                               // TAKING INPUT FROM USER;
 						        arr=search(arr);                           // SEARCH CHANGED ARRAY IN ITS CHILD AND ASSIGN ARR EXACT ARRAY CORRESPONDS TO DATA BASE            
 						        win=checkwin(arr);                         // PRINT AND CHECK THE STATUS OF THE GAME        
 						        if(win==1)
 						        return;
 						        goto b;
					} 
				b:  {
					            minmaxcall(arr,ind,mnmx);                  // MINMAX CALL TO FIND THE BEST CHILD
							    arr=match(arr,::drr[arr[ind]],8);          // MATCH THE BEST CHILD IN DATA BASE (DATA BASE MIGHT CONTAIN ROTATED VERSION OF AAR
								win=checkwin(arr);                         // ,THERE FORE WE NEED COMPARISION WITH PREVIOUS STATE OF THE BOARD
								if(win==1)                                 // CHECK STATUS IF GAME ENDED THEN RETURN
								return;			
					}	        goto a;
	        	
		}
		

// MAIN DRIVER CODE TO RUN THE GAME
		
int main()
{
	::fin.open("TREEINDEX111",ios::out|ios::in|ios::app);
	::fin.seekg(0); 
	int val,pos=0;
	while(!::fin.eof())
	{
		do
		{
			if(::fin.eof())
			break;
			::fin>>val;
			if(val==-2)
			break;
			else
			::drr[pos].push_back(val);
		}while(val!=-2);
    	if(::fin.eof())
		break;
		pos++;	
	}
	::fin.close();
	
	char ch='y';
	do
	{
	
			cout<<"Choose player-1 (X) or player-2 (O):=>(1,2)";
			int x;
			cin>>x;
			vector<int> arr; 
	                                    
			for(int i=0;i<14;i++)                                  
			{
				arr.push_back(::drr[0][i]);                                     //INITIAL STATE OF THE GAME;
			}
			checkwin(arr);
			switch(x)
			{
					case 1:    gameplay(arr,1);
					           break;
		
	
					case 2:    gameplay(arr,2);
					           break;

			}
			
			cout<<"\nwant play again(y,n):";
			cin>>ch;
	}while(ch=='y');
	return 0;
}
