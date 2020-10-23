package abstractInterface;

public class X500Car extends Car {
	//꼭 abstract class를 상속받을 때 abstract methods는 재정의해야함
    public void start() {
        System.out.println("X500모델의 시작");
    }
}

