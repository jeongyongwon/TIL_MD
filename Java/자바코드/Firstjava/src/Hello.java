
public class Hello {

        
    public static void main(String[] args) {
    	Car car = new Car();
    	
    	//부모에게 상속받을 멤버변수, 함수
    	System.out.println("접근가능" + car.company);
    	car.start();
    	
    	//자식이 생성한 멤버함수, 함수
    	car.setModelName("Z500");
    	System.out.println("모델명" + car.getModelName());
    	car.accelerate();
    }        
	

}