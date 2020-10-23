## List

---

- **ArrayList**: 배열대신에 자주 사용되며 크기를 조절할 수 있는 배열과도 같음.

- 배열의 크기는 한번 정해지면,크기를 변경할 수 없음. 속도측면에서 약간 더 뛰어남.

- 그치만 ArrayList와 배열의 사용방법은 전혀 다름.

- 동일한 데이터타입을 저장할 때 많이들 사용.



#### javatest.java

````java
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class javatest {


	public static void main(String[] args) {
	    ArrayList<String> arrayList = new ArrayList<String>();
	    // type으로는 String, Interger, Boolean, Character, Float
	    
	    arrayList.add("비둘기");
	    arrayList.add("거북이");
	    arrayList.add("개미");
	    arrayList.add("호랑이");
	    
	    //리스트 크기
	    System.out.println(arrayList.size());
	    
	    //값 뽑아내기
	    System.out.println(arrayList);
	    System.out.println(arrayList.get(1));
	    System.out.println(arrayList.get(arrayList.size()-1));
	    
	    //값 변경하기
	    arrayList.set(1,"킹");
	    System.out.println(arrayList.get(1));
	    
	    //ArrayList의 상위클래스
	    //List list = new LinkedList<String>();
	    
	    List list;
	    list = arrayList;
	    System.out.println("리스트타입의"+list.get(1));
	    
	    //정렬
	    //한글정렬(ㄱ부터 시작), 숫자정렬(가장 작은 값부터시작), 알파벳정렬(a부터 시작)
	    Collections.sort(arrayList);
	    for(int i = 0; i< arrayList.size(); i++) {
	        System.out.println("리스트요소"+list.get(i));
	    }
	    
	}
}
````





## HashMap

----



```java
package List;

import java.util.HashMap;

public class javatest {


	public static void main(String[] args) {
	    HashMap<String, Object> hashMap = new HashMap<String, Object>();
        //특정타입의 값만 저장
        hashMap.put("userno",100);
        hashMap.put("userId","ㅋㅋㅋㅋ");
        hashMap.put("username","정용원");
        
        //HashMap으로부터 값 얻기
        String str = hashMap.get("username").toString();
        System.out.println("유저이름은?"+str);
        
        //HashMap크기 얻기
        System.out.println(hashMap.size());
        
        //HashMap에서 키로 해당 값 삭제
        hashMap.remove("username");
        
        for (String i : hashMap.keySet()) {
            System.out.println("저장된 키는?"+i);
        }
        
        for (Object i : hashMap.values()) {
            System.out.println("저장된 값은"+i.toString());
        }
        
	    
	}
}
```





## Stack

---

```java
package List;

import java.util.Stack;

public class javatest {


	public static void main(String[] args) {
        Stack<Integer> stack = new Stack<>();
        
        //값을 넣음
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.push(4);
        stack.push(5);
        
        //값얻기
        System.out.println(stack.pop());
        //값을 넣음
        stack.push(6);
        System.out.println(stack.pop());
        System.out.println(stack.pop());
        System.out.println(stack.pop());
        System.out.println(stack.pop());
        System.out.println(stack.pop());
        
        
        //값을 다시 넣음
        stack.push(1);
        stack.push(2);
        stack.push(3);
        stack.push(4);
        
        //크기 얻기
        System.out.println("크기는"+ stack.size());
        
        //데이터확인
        System.out.println("다음데이터는"+stack.peek());
	    
	}
}
```





## Queue

---

```java
package List;

import java.util.LinkedList;
import java.util.Queue;

public class javatest {


	public static void main(String[] args) {
		Queue<Integer> queue = new LinkedList<Integer>();
        queue.add(1);
        queue.add(2);
        queue.add(3);
        queue.add(4);
        queue.add(5);
       	
        System.out.println("Queue의 값?"+ queue.poll());
        System.out.println("Queue의 값?"+ queue.poll());
        System.out.println("Queue의 값?"+ queue.poll());
        System.out.println("Queue의 값?"+ queue.poll());
        System.out.println("Queue의 값?"+ queue.poll());
	}
}
```

