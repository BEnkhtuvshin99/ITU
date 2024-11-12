let num=prompt("Ta uuriin toogoo oruulan uu");
          let sum=0;
          while(num!=0){
            counter=0;
            sum=sum+num%10;
            num=parseInt(num/10);
          }
          var reverse_num=0;
          var reverse_sum=sum;
          while(sum!=0){
            reverse_num=reverse_num*10+sum%10;
            sum=parseInt(sum/10);
            
          }
          console.log(reverse_num);
          console.log(reverse_sum);
          alert(reverse_sum==reverse_num)