
public class Vehicle {
    //protected: 함수, 멤버변수, 생성자는 동일패키지
    //또는 다른 패키지의 하위 클래스에서만 접근 가능
    protected String company = "HONG";
    
    public void start() {
        System.out.println("시동을 걸었습니다");
    }
}