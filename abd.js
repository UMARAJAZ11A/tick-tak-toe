var drr;
$.get("data.txt", function(data) {
      drr = data.split("\r\n").map(function(el){ return el.split(" ");});
      var i;
      for(i=0;i<drr[0].length;i++)
      arr[i]=drr[0][i];
  });
  //`${drr[231]} <br>`
  var arr=[];
  var val="X";
  var valpc="O";
  var indx=-1;
  var level=9;
  function printR(krr)
  {
      var i;
      for(i=1;i<10;i++)
      {
          if(krr[i-1]==1)
          {
            document.getElementById(i).innerHTML="X";
          }
          else if(krr[i-1]==2)
          {
            document.getElementById(i).innerHTML="O";
          }
          else
          {
            document.getElementById(i).innerHTML=" ";
          }
      }
  };
function click_call(clicked_id)
{

    
    if(val=="X")
    {
        var indxclk=parseInt(clicked_id,10);
        indxclk--;
        arr[indxclk]=1;
        document.getElementById(clicked_id).innerHTML=val;
        arr=search(arr);
     //   document.getElementById("9").innerHTML=arr.length;
        //check win and print if win// create win function
        var flag=-1;
        minmaxcall(arr,flag);
        //document.getElementById("8").innerHTML=val;
    // console.log(indx);
        arr=match(arr,drr[arr[indx]],8);
       printR(arr);
       
      
       // document.getElementById(indx).innerHTML=valpc;
        //check win and print if win// create win function
        // disable both buttons --> indxclk and indx
        
       
    }
    else
    {
        var indxclk=parseInt(clicked_id,10);
        indxclk--;
        arr[indxclk]=2;
        document.getElementById(clicked_id).innerHTML=val;
        arr=search(arr);
     //   document.getElementById("9").innerHTML=arr.length;
        //check win and print if win// create win function
        var flag=1;
        minmaxcall(arr,flag);
     //   document.getElementById("8").innerHTML=arr.length;
    // console.log(indx);
        arr=match(arr,drr[arr[indx]],8);
        printR(arr);
        indxclk++;
        document.getElementById(indxclk).disabled = true;
      //  arr=search(arr);
       // document.getElementById("5").innerHTML=valpc;
        //check win and print if win// create win function
       // var flag=1;
       // minmaxcall(arr,indx,flag);
       // arr=match(arr,drr[arr[indx]],8);
       // indx++;
      //  document.getElementById(indx).innerHTML=valpc;
         // document.getElementById(clicked_id).innerHTML=val;
         // disable both buttons --> indxclk and indx
         
    }
   
    
   
};

function player(clicked_id)
{
    var i;
    //arr=drr[0];
    for(i=0;i<drr[0].length;i++)
    {
        if(i>0&&i<10)
        {
            document.getElementById(i).innerHTML=" ";
        }
       // arr[i]=`${drr[0][i]}`;
       // if(i>0&&i<10)
      // document.getElementById(i).innerHTML=arr.length;
    }
    if(clicked_id=="O")
    {
        val="O";
        valpc="X";
        var flag=1;
        minmaxcall(arr,flag);
        arr=match(arr,drr[arr[indx]],8);
        //indx++;
        printR(arr);
         //check win and print if win// create win function
       // document.getElementById(indx).innerHTML=valpc;
    }
    else
    {
        val="X"; 
        valpc="O";   
    }
    
};



 function match(krr,brr,count)
 {
    // if(brr[9]!=9)
   // brr.length=brr.length-1;
     var c=0;
     var i;
       for(i=0;i<4;i++)                                        
           {
                 c=0;
                 var j;
                 for(j=0;j<9;j++)                          
                    {
                        if(krr[j]==brr[j])
                        c++;                                
                    }
                if(c==count)                                    
                    {
                        return brr;                            
                    }
                else
                brr=rot(brr);	                                
     }
    var temp;
       for(i=0;i<7;i=i+3)                                 
            {
               temp=brr[i];
               brr[i]=brr[i+2];
               brr[i+2]=temp;
            }   
        for(i=0;i<4;i++)                                 
            {
               c=0;
               var j;
                for(j=0;j<9;j++)
                {
                    if(krr[j]==brr[j])
                    c++;
                }
        if(c==count) 
             return brr;
         else
             brr=rot(brr);	
     }      		      		
 var crr=[]; 
       //  console.log("1");                                     
 return crr;
 };

 function rot(brr)
 {
     var i=0;                              
     var crr=[];                                  
     while(i<3)
         {
             var j;
             for(j=i+6;j>=i;j=j-3)                 
                 {
                     crr.push(brr[j]);              
                 }
             i++;			
         }
      
     for(i=9;i<brr.length;i++)                     
         crr.push(brr[i]);	
         
     return crr;                                      
 };


 function search(krr)
 {
         var brr=[];
         var i;
    // document.getElementById("5").innerHTML=arr.length;

         for(i=11;i<krr.length;i++)
            {
                
                //  document.getElementById("9").innerHTML=val;
                    brr=match(krr,drr[arr[i]],9);
                    if(brr.length!=0)
                    {
                     //   document.getElementById("6").innerHTML=val;
                        return brr;
                    }
            }
           // document.getElementById("5").innerHTML=val;   
 }; 

 function findminmax( krr, x)
 {
     
    //var max;
   // var i;
   // var pos;
  //  for(i=0;i<krr.length)
  //  console.log(krr.length);
         var k=x;
         var found=0;                                          
         {      
             while(found==0)
               {  
                  	var brr=[];                    
                    var pos=0;
                    var i;
                    for(i=0;i<krr.length;i++)                 
                        {                                      
                           if(krr[i]==k)
                                {
                                    brr.push(i);
                                } 	
                        }
                    if(brr.length==0)                             
                        {
                            if(x==1)                              
                                k=k-1;                            
                            else                                  
                              {
                               // console.log(brr.length);
                                    k=k+1; 
                                   // console.log(k);
                              }                                                            
                        }
                    else
                    {
                      //  console.log(k);
                        found=1;
                        break;
                    }    
                }        
                 // console.log(ccc);
                //    if(brr.length!=1)
                        {
                           // console.log(brr.length);
                            x=Math.floor(Math.random() * (+brr.length - +0) + +0);
                           // console.log(brr.length);

                        }
                  //  else
                    //  x=0;
                //    var y=brr[x];
             return brr[x] ;                                
         }
 };

 function minmax(krr,flag)
 {
    // printR(krr);
   //  krr.length=krr.length-1;
   // console.log(krr.length);

         if(krr.length==11||krr[9]>=level)                               
             {
                 if(krr.length>11)
                 indx=11;
                 return krr[10];                          
             }
         else
             {
                 var x;                                  
                 if(flag==1)
                 x=-1;
                 else
                 x=1;
                 var brr=[];                  
                 var i;
                 for(i=11;i<krr.length;i++)           
                     {
                        // console.log(krr[i]);
                         var kd=minmax(drr[krr[i]],x);
                         brr.push(kd);
 
                     }
                if(flag==1)
                { 
                    x=findminmax(brr,1);
                   // if(x==-1)
                  //  x=brr.indexof("0");
                  //  if(x==-1)
                  //  x=brr.indexOf("-1");
                }
                else
                {
                   // console.log(brr.length);
                    x=findminmax(brr,-1);
                //    if(x==-1)
                  //  x=brr.indexOf("0");
                  //  if(x==-1)
                  //  x=brr.indexof("1");
                }
                //x=0;     
                 indx=11+x;                                
                 return brr[x];                           
             }                                            
 };


 function minmaxcall(krr,flag)
 {
    //document.getElementById("8").innerHTML=krr.length;
        var i; 
        if(krr[9]>=4)                                        
             for(i=11;i<krr.length;i++)                   
                 {
                    // console.log("u");
                     if(drr[krr[i]][10]==flag)              
                         {
                             indx=i;
                             return 1;
                         }
                 }

                // document.getElementById("1").innerHTML=krr.length;
           //  krr.length=krr.length+1;
            minmax(krr,flag); 
            return 0;                  
 };


