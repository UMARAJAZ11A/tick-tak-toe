# tick-tak-toe
#include<bits/stdc++.h>
#include<iostream>
#include<vector>
#include<math.h>
#include<fstream>
using namespace std;
fstream fin,fin1;
int checkrot(vector<int> arr,vector<int> brr)
{
    int count=0,i=0,ind=0,y;
    for(int i=0;i<9;i++)
    {
       	if(arr[i]!=brr[i])
        break;
        count++;
	}
	if(count==9)
	return 1;
	for(int k=0;k<3;k++)
		{
			vector<int> crr;
			i=0;
			ind=0;
			while(i<3)
			{
				for(int j=i+6;j>=i;j=j-3)
				{
					crr.push_back(brr[j]);
				}
				i++;
				
			}
			for(int j=0;j<9;j++)
			{
				brr[j]=crr[j];
			}
			count=0;
	        for(int i=0;i<9;i++)
       			 {
    		    	if(arr[i]!=brr[i])
    		    	break;
       			 	count++;
				}
			if(count==9)
			return 1;
		}
	return 0;
}
int match(vector<int> arr,vector<int> brr)
{
	int y=checkrot(arr,brr),temp;
	if(y==1)
	return 1;
	for(int i=0;i<7;i=i+3)                       //MIRROR
       	{
       		temp=brr[i];
        	brr[i]=brr[i+2];
         	brr[i+2]=temp;
       	}
    y=checkrot(arr,brr);
	if(y==1)
		return 1;
	else 
		return 0;   		
}
vector<int> rot(vector<int> brr)
{
	int i=0;
	vector<int> crr;
	while(i<3)
		{
			for(int j=i+6;j>=i;j=j-3)
				{
					crr.push_back(brr[j]);
				}
			i++;
				
		}
	return crr;
}
vector<int> returnmatch(vector<int> arr,vector<int> brr)
{ 
	int c=0;
	a: 
	for(int i=0;i<3;i++)
		{
			c=0;
			for(int j=0;j<9;j++)
				{
					if(arr[j]==brr[j])
					c++;
				}
			if(c==8) 
				return brr;
			else
				brr=rot(brr);	
		}
	int temp;
        for(int i=0;i<7;i=i+3)                       //mirror;
       	 	{
       		  	temp=brr[i];
        	 	brr[i]=brr[i+2];
         		brr[i+2]=temp;
       		}
      		      		
goto a;
} 
int checkwin(vector<int> arr)
{
	if(arr[10]==1||arr[10]==-1)
	return 1;
	else 
	return 0;
}
int main()
{
	::fin.open("TREEINDEX111",ios::out|ios::in|ios::app);
   // ::fin1.open("T",ios::out|ios::in|ios::trunc);
	::fin.seekg(0); 
	int val,pos=0,xx=0;
	vector<int> drr[765];
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
			drr[pos].push_back(val);
		}while(val!=-2);
    	if(::fin.eof())
		break;
		pos++;
		
	}
	//cout<<rand()%0;
	vector<int> arr;
	for(int i=0;i<9;i++)
	{
		arr.push_back(0);
	}
	cout<<"\ngame star:\n";
	srand((unsigned) time(0));
	int var=rand()%8;
	arr[var]=1;
	for(int i=1;i<=4;i++)
	{
		cout<<"\n";
		for(int s=0;s<7;s=s+3)
			{
				cout<<arr[s]<<" "<<arr[s+1]<<" "<<arr[s+2];
				cout<<"\n";	
			}
		int ind,abc,k;
		cout<<"enter index\n";
		cin>>ind;
		arr[ind]=2;
		cout<<"\n";
		for(int s=0;s<7;s=s+3)
		    {
				cout<<arr[s]<<" "<<arr[s+1]<<" "<<arr[s+2];
				cout<<"\n";	
			}
		for(k=4;k<765;k++)
		{
			abc=match(drr[k],arr);
			if(abc==1)
			break;
		}
	//	cout<<"\n"<<k<<"\n";
		int r;
		if(k==765)
		break;
		if(drr[k].size()==11)
		break;
		int ds=drr[k].size()-1;
		if(ds!=11)
	  	 r=rand()%(ds-11)+11;
		else
		r=11;
 		cout<<drr[k][r];
 		//cout<<xxx<<"\n";
      //  cout<<k<<"\n"<<r<<"\n";
       // r=24;
       vector<int> brr;
       for(int d=0;d<9;d++)
       {
       	   brr.push_back(drr[drr[k][r]][d]);
	   }
		arr=returnmatch(arr,brr);
		int win=checkwin(drr[drr[k][r]]);
		if(win==1)
		{
			for(int s=0;s<7;s=s+3)
		    {
				cout<<arr[s]<<" "<<arr[s+1]<<" "<<arr[s+2];
				cout<<"\n";	
			}
			cout<<"yo bro:";
			break;
		}
		if(drr[drr[k][r]][9]==9)
		{
			cout<<"\ndraw\n";
			for(int s=0;s<7;s=s+3)
		    {
				cout<<arr[s]<<" "<<arr[s+1]<<" "<<arr[s+2];
				cout<<"\n";	
			}
		}
		
	}
	
	return 0;
}
