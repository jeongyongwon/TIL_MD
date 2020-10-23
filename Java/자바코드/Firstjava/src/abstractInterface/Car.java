package abstractInterface;

abstract class Car {
    public abstract void start();
    
    public void accelerate() {
        System.out.println("가속합니다");
    }
}