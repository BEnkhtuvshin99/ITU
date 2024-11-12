let number=prompt("Ta ailiin tootiig oruulna uu:");
          let floor;
          let door;
          let entrance
          if(number%36!=0){
            entrance=parseInt(number/36)+1;
          }
          else {
            entrance=parseInt(number/36);
          }
 
          if(number%4 ==0){
            door=4;
          }
          else if(number%4 == 1){
            door=1;
          }
          else if(number%4 == 2){
            door=2;
          }
          else{
            door=3;
          }
          let counter=number%36;
          if(counter%4!=0){
            floor=parseInt(counter/4)+1;
          }
          else{
            floor=parseInt(counter/4);
          }
          alert('Орц: ' + entrance + '\nДавхар: ' + floor + '\nХаалга: ' + door + ' дахь хаалга');
