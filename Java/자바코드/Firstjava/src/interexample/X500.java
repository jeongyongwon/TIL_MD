package interexample;

public class X500 implements Car, Vehicle {
    //무조건 인터페이스 메소드를 생성해주어야함
    private int total = 500;
    
    @Override
    public  int start() {
        return this.total;
    }
    
    @Override
    public void stop() {
        System.out.println("정지했습니다");
    }
    
    @Override
    public void honk() {
        System.out.println("자동차의 경적");
    }
    
}
