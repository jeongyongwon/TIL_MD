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